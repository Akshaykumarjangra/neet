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
        print(f"HTTP Error: {e.code} - {e.reason} for {endpoint}")
        print(e.read().decode())
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    print(f"Triggering deployment for {APP_UUID}...")
    
    # Method 1: /deploy with uuid in query or body
    print("Attempt 1: POST /deploy")
    payload = {"uuid": APP_UUID, "force": True}
    res = make_request("/deploy", "POST", payload)
    
    if res:
        print("Deployment triggered successfully (Method 1).")
        print(json.dumps(res, indent=2))
        sys.exit(0)
        
    # Method 2: /applications/{uuid}/deploy ? found in some docs
    print("Attempt 2: POST /applications/.../deploy")
    res = make_request(f"/applications/{APP_UUID}/deploy", "POST", {"force": True})
    if res:
        print("Deployment triggered successfully (Method 2).")
        print(json.dumps(res, indent=2))
        sys.exit(0)

    print("All trigger attempts failed.")
