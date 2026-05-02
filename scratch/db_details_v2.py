import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
DB_UUID = "tso4o88swgcckkg4scososog"

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
    # Try different endpoints for DB details
    endpoints = [
        f"/databases/{DB_UUID}",
        f"/resources"
    ]
    for ep in endpoints:
        print(f"Testing {ep}...")
        res = make_request(ep)
        if res:
            if ep == "/resources":
                # Find the DB in the list
                db = next((r for r in res if r['uuid'] == DB_UUID), None)
                if db:
                    print(json.dumps(db, indent=2))
            else:
                print(json.dumps(res, indent=2))
            break
