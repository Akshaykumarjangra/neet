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
    # Update start command to support both domains and use the external IP for DB
    # (Since internal host failed earlier, I'll stick to external IP but with SSL)
    db_url = "postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@82.25.104.62:8001/postgres"
    
    new_start_command = (
        "NODE_ENV=production DATABASE_SSL=true "
        "OWNER_EMAIL=akg45272@gmail.com OWNER_PASSWORD=akg45272@gmail.com "
        f"DATABASE_URL={db_url} "
        "APP_BASE_URL=https://neet.zeroai.org.in CLIENT_BASE_URL=https://neet.zeroai.org.in CORS_ORIGIN=https://neet.zeroai.org.in,https://neet.zeropage.in "
        "node dist/index.js"
    )
    
    payload = {
        "start_command": new_start_command
    }
    
    print("Updating start_command with correct domains and DB URL...")
    make_request(f"/applications/{APP_UUID}", "PATCH", payload)
    
    print("Restarting app...")
    make_request(f"/applications/{APP_UUID}/restart", "POST")
    print("Restart triggered.")
