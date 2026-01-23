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
    print(f"Checking status for {APP_UUID}...")
    app = make_request(f"/applications/{APP_UUID}")
    
    if app:
        print(f"Name: {app.get('name')}")
        print(f"Status: {app.get('status')}")
        print(f"Domain: {app.get('fqdn') or app.get('custom_domain') or app.get('domains')}")
        print(f"Description: {app.get('description')}")
        
        # Try to find latest deployment info if available in response
        # (Structure varies, but printing relevant keys help)
        # print(json.dumps(app, indent=2)) 
    else:
        print("Failed to fetch app status.")
