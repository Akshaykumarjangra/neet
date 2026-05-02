import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

def make_request(endpoint):
    url = f"{BASE_URL}{endpoint}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    logs_json = make_request(f"/applications/{APP_UUID}/logs")
    if logs_json:
        data = json.loads(logs_json)
        logs = data.get("logs", "")
        print("--- FULL LOGS ---")
        # Split logs by newline and look for errors
        for line in logs.split('\n'):
            if "ERROR" in line or "Failed" in line or "Exception" in line:
                print(line)
    else:
        print("Failed to fetch logs.")
