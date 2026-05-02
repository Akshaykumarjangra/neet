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
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        return json.load(response)

if __name__ == "__main__":
    app = make_request(f"/applications/{APP_UUID}")
    print("Health Check Config:")
    print(f"Path: {app.get('health_check_path')}")
    print(f"Interval: {app.get('health_check_interval')}")
    print(f"Timeout: {app.get('health_check_timeout')}")
    print(f"Retries: {app.get('health_check_retries')}")
