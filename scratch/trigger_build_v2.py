import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

def make_request(endpoint, method="POST"):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers=headers, method=method)
    with urllib.request.urlopen(req) as response:
        return json.load(response)

if __name__ == "__main__":
    # Common Coolify deploy endpoints
    endpoints = [
        f"/applications/{APP_UUID}/deploy",
        f"/deploy?uuid={APP_UUID}",
        f"/applications/{APP_UUID}/redeploy"
    ]
    for ep in endpoints:
        print(f"Testing {ep}...")
        try:
            res = make_request(ep, "POST")
            print(f"Success on {ep}!")
            print(json.dumps(res, indent=2))
            break
        except Exception as e:
            print(f"Failed {ep}: {e}")
