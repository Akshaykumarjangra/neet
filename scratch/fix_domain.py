import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"
DB_HOST = "tso4o88swgcckkg4scososog"

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
    # Update to use neet.zeropage.in
    db_url = f"postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@82.25.104.62:8001/postgres"
    
    new_start_command = f"NODE_ENV=production DATABASE_SSL=true APP_BASE_URL=https://neet.zeropage.in CLIENT_BASE_URL=https://neet.zeropage.in CORS_ORIGIN=https://neet.zeropage.in node dist/index.js"
    
    payload = {
        "start_command": new_start_command
    }
    
    print("Updating start_command to use neet.zeropage.in...")
    try:
        make_request(f"/applications/{APP_UUID}", "PATCH", payload)
        print("Success!")
    except Exception as e:
        print(f"Error: {e}")
