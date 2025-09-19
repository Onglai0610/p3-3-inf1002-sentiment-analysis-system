# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from app.api import sentiment, gemini

# Create FastAPI app
app = FastAPI(
    title="Sentiment Analysis API",
    description="API backend for sentiment analysis project",
    version="1.0.0",
)

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production: restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(sentiment.router, prefix="/sentiment", tags=["Sentiment"])
app.include_router(gemini.router, prefix="/gemini", tags=["Gemini"])

# Health check endpoint
@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "message": "Sentiment Analysis API running 🚀"}
