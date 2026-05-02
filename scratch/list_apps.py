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
    apps = make_request("/applications")
    for app in apps:
        print(f"UUID: {app['uuid']}")
        print(f"Name: {app['name']}")
        print(f"Status: {app['status']}")
        print(f"FQDN: {app.get('fqdn')}")
        print("-" * 20)
