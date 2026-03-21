import requests

res = requests.post(
    "http://192.168.0.126:11434/api/generate",
    json={
        "model": "llama3.2:3b",
        "prompt": "say hi like a cute discord girl",
        "stream": False
    }
)

print(res.json()["response"])