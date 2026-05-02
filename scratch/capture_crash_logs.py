import urllib.request
import json
import time
import sys

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

def get_logs():
    url = f"{BASE_URL}/applications/{APP_UUID}/logs"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode('utf-8'))
    except:
        return None

print("Waiting for logs...")
for _ in range(20):
    data = get_logs()
    if data and data.get("logs"):
        print("--- LOGS FOUND ---")
        logs = data.get("logs", "")
        # Print last 50 lines
        lines = logs.split('\n')
        for line in lines[-50:]:
            print(line)
        break
    else:
        print(".", end="", flush=True)
        time.sleep(2)
else:
    print("\nCould not capture logs. The app might be crashing too fast.")
