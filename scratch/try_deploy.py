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

def api(endpoint, method="GET", data=None):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    try:
        with urllib.request.urlopen(req) as response:
            body = response.read().decode()
            print(f"  {method} {endpoint}: {response.getcode()}")
            print(f"  Response: {body[:500]}")
            try:
                return json.loads(body)
            except:
                return body
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f"  {method} {endpoint}: HTTP {e.code}")
        print(f"  Error body: {body[:300]}")
        return None

# Try various deploy endpoints
endpoints_to_try = [
    (f"/deploy", "POST", {"uuid": APP_UUID}),
    (f"/applications/{APP_UUID}/deploy", "GET", None),
    (f"/applications/{APP_UUID}/action/deploy", "POST", None),
]

for endpoint, method, data in endpoints_to_try:
    print(f"\n=== Trying {method} {endpoint} ===")
    api(endpoint, method, data)
