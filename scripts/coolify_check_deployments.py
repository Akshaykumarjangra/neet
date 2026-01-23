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
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    print(f"Checking deployments for {APP_UUID}...")
    # Typically /applications/{uuid}/deployments or similar
    # Trying generic project resource fetch if unsure, but let's guess standard plural first
    deployments = make_request(f"/applications/{APP_UUID}/deployments")
    
    if deployments:
        # Assuming list of deployments
        print(f"Found {len(deployments)} deployments.")
        for d in deployments[:3]: # Show top 3
            print(f"ID: {d.get('id') or d.get('deployment_uuid')}")
            print(f"Status: {d.get('status')}")
            print(f"Created: {d.get('created_at')}")
            print("---")
    else:
        print("Failed to fetch deployments.")
