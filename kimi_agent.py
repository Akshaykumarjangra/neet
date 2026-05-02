import requests
import json
import sys

def consult_kimi(prompt):
    invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
    headers = {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "moonshotai/kimi-k2.6",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 16384,
        "temperature": 0.7,
        "stream": True
    }
    try:
        response = requests.post(invoke_url, headers=headers, json=payload, stream=True)
        response.raise_for_status()
        full_response = ""
        for line in response.iter_lines():
            if line:
                line_str = line.decode("utf-8")
                if line_str.startswith("data: "):
                    data_str = line_str[6:]
                    if data_str == "[DONE]":
                        break
                    try:
                        data = json.loads(data_str)
                        content = data["choices"][0]["delta"].get("content", "")
                        print(content, end="", flush=True)
                        full_response += content
                    except:
                        pass
        print()
        return {"choices": [{"message": {"content": full_response}}]}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        prompt = sys.argv[1]
        result = consult_kimi(prompt)
        print(json.dumps(result, indent=2))
    else:
        print("Usage: python kimi_agent.py <prompt>")
