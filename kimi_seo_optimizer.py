import requests
import json

invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"

headers = {
  "Authorization": "Bearer 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",
  "Accept": "application/json"
}

# Load index.html for context
try:
    with open('client/index.html', 'r', encoding='utf-8') as f:
        index_html = f.read()
except:
    index_html = "index.html not found"

prompt = f"""
You are the world's leading SEO and UI/UX expert for EdTech platforms. 
Review the following NEET (Medical Entrance) preparation platform context and provide a SUPERCHARGED optimization plan.

PROJECT CONTEXT:
- Name: ZERO AI NEET
- Stack: React, Express, PostreSQL, Drizzle ORM.
- Target: 2-3 Million students preparing for NEET UG 2026.
- Current Status: Production hardening complete.
- Key Features: AI Doubt Solver, Adaptive Practice, Mock Tests, SYLLABUS HUB, CUTOFF HUB, PYQ HUB.

CURRENT INDEX.HTML HEAD:
{index_html[:2000]}... (truncated)

TASK:
1. SEO AUDIT: Find 3 critical SEO or Social Graph gaps.
2. DESIGN UPGRADE: Suggest 3 "Premium/Wow" design elements for the Dashboard (e.g., Glassmorphism, specific animations, or 3D elements).
3. GROWTH LOOPS: Suggest 2 viral organic growth loops to acquire users without ad spend.

Format your response as a structured markdown report.
"""

payload = {
  "model": "moonshotai/kimi-k2.6",
  "messages": [{"role":"user","content": prompt}],
  "max_tokens": 4096,
  "temperature": 0.7,
  "top_p": 1.0,
  "stream": False
}

print("Connecting to Kimi 2.6 via NVIDIA API...")
response = requests.post(invoke_url, headers=headers, json=payload)
if response.status_code == 200:
    result = response.json()
    print("--- KIMI 2.6 STRATEGY REPORT ---")
    print(result['choices'][0]['message']['content'])
else:
    print(f"Error: {response.status_code}")
    print(response.text)
