from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, distinct
from app.database import get_db
from app.models.business import Business
from app.models.category import Category
from app.models.testimonial import Testimonial
from app.models.brand import Brand
from app.models.user import User
from app.models.review import Review
from app.models.review import Review
from app.models.user import User
from app.schemas import (
    BusinessOut, CategoryOut, TestimonialOut, BrandOut,
    StatsOut, HomepageDataResponse
)
import time

router = APIRouter()

homepage_cache = {
    "data": None,
    "timestamp": 0
}
CACHE_TTL = 300  # 5 minutes


@router.get("/api/homepage", response_model=HomepageDataResponse)
def get_homepage_data(db: Session = Depends(get_db)):
    current_time = time.time()
    if homepage_cache["data"] and (current_time - homepage_cache["timestamp"] < CACHE_TTL):
        return homepage_cache["data"]

    # Categories
    categories = db.query(Category).filter(Category.is_active == True).order_by(Category.display_order).all()

    # Featured businesses (approved, sorted by rating)
    featured = (
        db.query(Business)
        .filter(Business.approval_status == "Approved")
        .order_by(Business.is_verified.desc(), Business.average_rating.desc())
        .limit(5)
        .all()
    )

    # Top picks - group businesses by category, count listings
    category_counts = (
        db.query(
            Business.category,
            func.count(Business.id).label("count")
        )
        .filter(Business.approval_status == "Approved")
        .group_by(Business.category)
        .order_by(func.count(Business.id).desc())
        .limit(5)
        .all()
    )

    top_picks = []
    default_images = [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    ]
    for i, (cat_name, count) in enumerate(category_counts):
        top_picks.append({
            "title": f"Best {cat_name}",
            "img": default_images[i % len(default_images)],
            "listings": f"{count}+ Listings",
        })

    # Platform Reviews (Testimonials)
    platform_testimonials = (
        db.query(Testimonial)
        .filter(Testimonial.status == "approved", Testimonial.is_active == True)
        .order_by(Testimonial.id.desc())
        .limit(6)
        .all()
    )
    
    testimonials_data = []
    for t in platform_testimonials:
        testimonials_data.append(TestimonialOut(
            id=t.id,
            name=t.name or "Verified User",
            role=t.role or "Verified Customer",
            text=t.text or "Great service!",
            avatar_url=t.avatar_url or 'https://i.pravatar.cc/150?img=12',
            rating=t.rating or 5.0
        ))

    # Brands
    brands = db.query(Brand).filter(Brand.is_active == True).order_by(Brand.display_order).all()

    # Stats
    total_businesses = db.query(func.count(Business.id)).scalar() or 0
    total_reviews = db.query(func.count(Review.id)).scalar() or 0
    total_cities = db.query(func.count(distinct(Business.city))).scalar() or 0
    total_users = db.query(func.count(User.id)).scalar() or 0

    stats = StatsOut(
        businesses=total_businesses,
        reviews=total_reviews,
        cities=total_cities,
        users=total_users,
    )

    response_data = HomepageDataResponse(
        categories=[CategoryOut.model_validate(c) for c in categories],
        featured_businesses=[BusinessOut.model_validate(b) for b in featured],
        top_picks=top_picks,
        testimonials=testimonials_data,
        brands=[BrandOut.model_validate(b) for b in brands],
        stats=stats,
    )
    
    homepage_cache["data"] = response_data
    homepage_cache["timestamp"] = current_time

    return response_data


@router.get("/api/categories", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).filter(Category.is_active == True).order_by(Category.display_order).all()
