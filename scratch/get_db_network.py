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
    # Get resources and find the DB
    resources = make_request("/resources")
    db = next((r for r in resources if r['uuid'] == DB_UUID), None)
    if db:
        print(json.dumps(db, indent=2))
    else:
        print("DB not found.")
