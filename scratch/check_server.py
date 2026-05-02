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
    servers = make_request("/servers")
    for s in servers:
        print(f"Server: {s['name']}, UUID: {s['uuid']}, Status: {s['status']}")
        # Get stats
        # (This is a guess at the endpoint)
        try:
            stats = make_request(f"/servers/{s['uuid']}/resources")
            print(f"Resource count: {len(stats)}")
        except:
            pass
