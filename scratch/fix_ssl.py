import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def make_request(endpoint, method="GET", data=None):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    with urllib.request.urlopen(req) as response:
        return json.load(response)

if __name__ == "__main__":
    # 1. Find DATABASE_SSL uuid
    envs = make_request(f"/applications/{APP_UUID}/envs")
    ssl_env = next((e for e in envs if e['key'] == "DATABASE_SSL"), None)
    
    if ssl_env:
        print("Updating DATABASE_SSL to true...")
        payload = {
            "key": "DATABASE_SSL",
            "value": "true",
            "is_preview": False,
            "is_build_time": False,
            "is_literal": True
        }
        # Try PATCH
        try:
            make_request(f"/applications/{APP_UUID}/envs/{ssl_env['uuid']}", "PATCH", payload)
            print("Updated via PATCH.")
        except Exception as e:
            print(f"PATCH failed: {e}. Trying POST...")
            make_request(f"/applications/{APP_UUID}/envs", "POST", payload)
            print("Updated via POST.")
        
        # 2. Restart app
        print("Restarting app...")
        make_request(f"/applications/{APP_UUID}/restart", "POST")
        print("Restart triggered.")
    else:
        print("DATABASE_SSL env var not found. Creating it...")
        payload = {
            "key": "DATABASE_SSL",
            "value": "true",
            "is_preview": False,
            "is_build_time": False,
            "is_literal": True
        }
        make_request(f"/applications/{APP_UUID}/envs", "POST", payload)
        print("Created!")
        make_request(f"/applications/{APP_UUID}/restart", "POST")
