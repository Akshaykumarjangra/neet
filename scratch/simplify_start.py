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

def make_request(endpoint, method="PATCH", data=None):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    with urllib.request.urlopen(req) as response:
        return json.load(response)

if __name__ == "__main__":
    # Simplify start command to avoid potential length limits or parsing issues
    new_start_command = (
        "DATABASE_SSL=true "
        "OWNER_EMAIL=akg45272@gmail.com "
        "node dist/index.js"
    )
    
    payload = {
        "start_command": new_start_command
    }
    
    print("Updating start_command...")
    try:
        make_request(f"/applications/{APP_UUID}", "PATCH", payload)
        print("Success!")
    except Exception as e:
        print(f"Error: {e}")
