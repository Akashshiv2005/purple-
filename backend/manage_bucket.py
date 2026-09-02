import os
import sys
import json
from minio import Minio
from minio.error import S3Error
from minio.commonconfig import CopySource

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import app.models.user
import app.models.business
import app.models.review
import app.models.business_extras
import app.models.category
import app.models.subcategory
import app.models.business_category_mapping
import app.models.testimonial
import app.models.brand
import app.models.seo_models
import app.models.verification_models
import app.models.location
import app.models.search_config
import app.models.master_service
import app.models.category_keyword
import app.models.business_service_mapping

from app.database import SessionLocal
from app.models.business import Business
from app.models.verification_models import BusinessDocument
from app.models.business_extras import GalleryImage

# 1. Load MinIO Settings
MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", "localhost:9000")
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY", "minioadmin")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY", "minioadmin")
MINIO_SECURE = os.getenv("MINIO_SECURE", "False").lower() in ("true", "1", "yes")
NEW_BUCKET = os.getenv("MINIO_BUCKET_NAME", "bizdial")

print("=" * 60)
print("             UNIFIED BUCKET MANAGER & MIGRATOR")
print("=" * 60)
print(f"Target Bucket (from .env): '{NEW_BUCKET}'")
print(f"MinIO Endpoint: {MINIO_ENDPOINT}")

# 2. Connect to MinIO
client = Minio(
    MINIO_ENDPOINT,
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=MINIO_SECURE,
)

# 3. Ensure Target Bucket Exists and is Public
try:
    if not client.bucket_exists(NEW_BUCKET):
        print(f"[*] Creating new bucket: {NEW_BUCKET}")
        client.make_bucket(NEW_BUCKET)
    
    # Set public policy
    policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {"AWS": "*"},
                "Action": ["s3:GetObject"],
                "Resource": [f"arn:aws:s3:::{NEW_BUCKET}/*"],
            }
        ],
    }
    client.set_bucket_policy(NEW_BUCKET, json.dumps(policy))
    print(f"[OK] Bucket '{NEW_BUCKET}' is configured and PUBLIC READ-ONLY.")
except S3Error as e:
    print(f"[!] MinIO Bucket Error: {e}")
    sys.exit(1)

# 4. Scan Database for any old buckets
db = SessionLocal()
old_buckets = set()

def extract_bucket(url: str):
    if not url:
        return
    # URL format: http(s)://ENDPOINT/BUCKET_NAME/filename
    # We split by endpoint if present, then get the first path segment
    if "://" in url:
        try:
            path_part = url.split("://")[-1].split("/", 1)[-1]
            bucket_name = path_part.split("/")[0]
            if bucket_name and bucket_name != NEW_BUCKET:
                old_buckets.add(bucket_name)
        except Exception:
            pass

try:
    print("\n[*] Scanning database for old bucket references...")
    businesses = db.query(Business).all()
    for b in businesses:
        extract_bucket(b.logo_url)
        extract_bucket(b.cover_image_url)
        
    docs = db.query(BusinessDocument).all()
    for d in docs:
        extract_bucket(d.document_url)
        
    gallery = db.query(GalleryImage).all()
    for g in gallery:
        extract_bucket(g.image_url)

    if not old_buckets:
        print("[OK] No old bucket references found in the database. Everything is up to date!")
        sys.exit(0)

    print(f"[!] Found references to old bucket(s): {list(old_buckets)}")

    # 5. Copy objects from old buckets to the new bucket
    for old_bucket in old_buckets:
        if client.bucket_exists(old_bucket):
            print(f"\n[*] Copying objects from '{old_bucket}' to '{NEW_BUCKET}' in MinIO...")
            objects = client.list_objects(old_bucket, recursive=True)
            count = 0
            for obj in objects:
                print(f"    - Copying: {obj.object_name}")
                client.copy_object(
                    NEW_BUCKET,
                    obj.object_name,
                    CopySource(old_bucket, obj.object_name)
                )
                count += 1
            print(f"[OK] Copied {count} objects from '{old_bucket}' to '{NEW_BUCKET}'.")
        else:
            print(f"[!] Old bucket '{old_bucket}' does not exist on MinIO. Skipping file copying.")

    # 6. Migrate Database URLs
    def migrate_url(url: str) -> str:
        if not url:
            return url
        for old in old_buckets:
            if f"/{old}/" in url:
                new_url = url.replace(f"/{old}/", f"/{NEW_BUCKET}/")
                print(f"    Migrating DB Record: {url} -> {new_url}")
                return new_url
        return url

    print("\n[*] Updating database records to use the new bucket...")
    for b in businesses:
        b.logo_url = migrate_url(b.logo_url)
        b.cover_image_url = migrate_url(b.cover_image_url)
        
    for d in docs:
        d.document_url = migrate_url(d.document_url)
        
    for g in gallery:
        g.image_url = migrate_url(g.image_url)
        
    db.commit()
    print("[OK] Database records updated successfully!")
    
except Exception as e:
    db.rollback()
    print(f"[!] Error during run: {e}")
finally:
    db.close()
    print("\n" + "=" * 60)
    print("                      PROCESS COMPLETED")
    print("=" * 60)
