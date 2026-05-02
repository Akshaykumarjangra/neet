import requests
import json

invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"

headers = {
  "Authorization": "Bearer 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",
  "Accept": "application/json"
}

payload = {
  "model": "moonshotai/kimi-k2.6",
  "messages": [{"role":"user","content": "Hi, are you working? Give me one SEO tip for a NEET exam platform."}],
  "max_tokens": 512,
  "temperature": 1.0,
  "top_p": 1.0,
  "stream": False
}

try:
    response = requests.post(invoke_url, headers=headers, json=payload, timeout=30)
    print(f"Status: {response.status_code}")
    print(response.json())
except Exception as e:
    print(f"Error: {e}")
