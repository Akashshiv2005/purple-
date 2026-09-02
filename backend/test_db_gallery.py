import os
from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://postgres:1234@localhost:5432/bizdial"
engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT count(*) FROM bizdial1.gallery_images"))
        print(f"Table exists. Count: {result.scalar()}")
except Exception as e:
    print(f"Error querying table: {e}")
