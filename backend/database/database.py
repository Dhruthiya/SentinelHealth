import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Use DATABASE_URL from environment or fallback to SQLite database file
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sentinelhealth.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL, 
    connect_args=connect_args,
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency for obtaining a database session in FastAPI routes."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
