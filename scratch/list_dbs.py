import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"

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
    resources = make_request("/resources")
    for r in resources:
        if 'postgres' in r.get('name', '').lower() or 'db' in r.get('name', '').lower():
            print(f"UUID: {r['uuid']}")
            print(f"Name: {r['name']}")
            print(f"Status: {r.get('status')}")
            print("-" * 20)
