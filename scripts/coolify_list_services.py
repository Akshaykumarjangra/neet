
import urllib.request
import json
import os

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"

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
    except Exception as e:
        print(f"Error accessing {endpoint}: {e}")
        return None

if __name__ == "__main__":
    print("Checking for existing services/databases...")
    services = make_request("/services")
    if services:
        print(json.dumps(services, indent=2))
        
    databases = make_request("/databases") # Sometimes MinIO is under databases in older APIs?
    if databases:
         print(json.dumps(databases, indent=2))
         
    # Check for MinIO specifically?
    # Not sure of endpoint, just exploration.
