import urllib.request
import json
import sys

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
    try:
        req = urllib.request.Request(url, headers=headers, method=method)
        if data:
            req.data = json.dumps(data).encode('utf-8')
        
        with urllib.request.urlopen(req) as response:
            return json.load(response)
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason}")
        print(e.read().decode())
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    print(f"Updating repo for {APP_UUID}...")
    payload = {
        "git_repository": "https://github.com/Akshaykumarjangra/neet",
        "git_branch": "main"
    }
    
    response = make_request(f"/applications/{APP_UUID}", "PATCH", payload)
    
    if response:
        print("Repo updated successfully.")
        print(json.dumps(response, indent=2))
        
        # Trigger deployment
        print("Triggering deployment...")
        deploy = make_request(f"/applications/{APP_UUID}/deploy", "POST", {"force": True})
        if deploy:
            print("Deployment triggered.")
            print(json.dumps(deploy, indent=2))
    else:
        print("Failed to update repo.")
