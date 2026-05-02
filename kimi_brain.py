import requests
import json

invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
stream = True

# Content for Kimi to analyze
try:
    with open('client/index.html', 'r', encoding='utf-8') as f:
        index_html = f.read()
except:
    index_html = "index.html not found"

prompt = f"""
You are the AI Chief Technology & Marketing Officer for ZERO AI NEET.
The platform is built with React, Node.js, and Drizzle. It targets 2M+ NEET aspirants.

Current Status:
- SEO Hubs created: Syllabus, Cutoff, PYQ.
- Infrastructure: Push notifications integrated, DB optimized.
- Design: Modern, but needs to be 'PREMIUM' and 'WOW'.

TASK:
Provide a "Production Hardening & Growth Hub Strategy 2.0".
1. SEO: Suggest advanced Schema.org types we missed (e.g. Speakable, FAQ for all hubs).
2. DESIGN: Provide CSS/Tailwind ideas for a "Cyber-Medical" aesthetic (glows, glassmorphism, floating elements).
3. GROWTH: How to use 'Programmatic SEO' to create 1,000+ localized cutoff pages?

Project index.html context:
{index_html[:1500]}

BE VERY SPECIFIC AND AGGRESSIVE WITH GROWTH HACKS.
"""

headers = {
  "Authorization": "Bearer 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",
  "Accept": "text/event-stream" if stream else "application/json"
}

payload = {
  "model": "moonshotai/kimi-k2.6",
  "messages": [{"role":"user","content": prompt}],
  "max_tokens": 16384,
  "temperature": 1.00,
  "top_p": 1.00,
  "stream": stream,
  "chat_template_kwargs": {"thinking":True},
}

print("Invoking Kimi 2.6 Brain (with Thinking Enabled)...")
response = requests.post(invoke_url, headers=headers, json=payload, stream=stream)

if stream:
    for line in response.iter_lines():
        if line:
            decoded_line = line.decode("utf-8")
            if decoded_line.startswith("data:"):
                try:
                    data = json.loads(decoded_line[5:])
                    content = data['choices'][0]['delta'].get('content', '')
                    if content:
                        print(content, end='', flush=True)
                except:
                    pass
    print("\n--- Stream Complete ---")
else:
    print(response.json())
