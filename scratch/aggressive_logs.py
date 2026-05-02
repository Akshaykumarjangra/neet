import urllib.request
import json
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

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

# Start the app
start_req = urllib.request.Request(f"{BASE_URL}/applications/{APP_UUID}/start", headers=headers, method="POST")
try:
    urllib.request.urlopen(start_req)
    print("Start request sent.")
except Exception as e:
    print(f"Start failed: {e}")

print("Capturing logs...")
for i in range(100):
    data = get_logs()
    if data and data.get("logs"):
        print(f"\n--- LOGS (Attempt {i}) ---")
        print(data["logs"])
        break
    print(".", end="", flush=True)
    time.sleep(1)
else:
    print("\nNo logs captured.")
