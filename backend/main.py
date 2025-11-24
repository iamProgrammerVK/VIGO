from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions"

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    headers = {
        "Authorization": f"Bearer {MISTRAL_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mistral-small-latest",
        "messages": [
            {"role": "user", "content": req.message}
        ]
    }

    response = requests.post(MISTRAL_URL, json=payload, headers=headers)
    data = response.json()
    
    bot_reply = data["choices"][0]["message"]["content"]

    return {"reply": bot_reply}