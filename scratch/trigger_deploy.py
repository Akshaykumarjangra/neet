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
    # Try POST /deployments with application_uuid
    print("Trying POST /deployments...")
    payload = {
        "application_uuid": APP_UUID,
        "force": True
    }
    deploy = make_request("/deployments", "POST", payload)
    if deploy:
        print("Deployment triggered successfully via /deployments")
        print(json.dumps(deploy, indent=2))
    else:
        # Try GET /deploy?uuid={uuid}&force=true
        print("Trying GET /deploy...")
        deploy = make_request(f"/deploy?uuid={APP_UUID}&force=true")
        if deploy:
            print("Deployment triggered successfully via /deploy")
            print(json.dumps(deploy, indent=2))
