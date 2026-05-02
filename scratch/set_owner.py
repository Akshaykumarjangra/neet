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

def make_request(endpoint, method="GET", data=None):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    with urllib.request.urlopen(req) as response:
        return json.load(response)

if __name__ == "__main__":
    # 1. Update OWNER_EMAIL and OWNER_PASSWORD in the start command to ensure they are picked up
    # (Since I already have a start command override)
    
    new_start_command = (
        "NODE_ENV=production DATABASE_SSL=true "
        "OWNER_EMAIL=akg45272@gmail.com OWNER_PASSWORD=akg45272@gmail.com "
        "APP_BASE_URL=https://neet.zeropage.in CLIENT_BASE_URL=https://neet.zeropage.in CORS_ORIGIN=https://neet.zeropage.in "
        "node dist/index.js"
    )
    
    payload = {
        "start_command": new_start_command
    }
    
    print("Updating start_command with owner credentials...")
    make_request(f"/applications/{APP_UUID}", "PATCH", payload)
    
    print("Triggering deployment to apply owner setup...")
    # Using the /deploy?uuid= endpoint which worked earlier
    make_request(f"/deploy?uuid={APP_UUID}", "POST")
    print("Deployment triggered.")
