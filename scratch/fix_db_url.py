import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"
DB_RESOURCE_NAME = "postgresql-database-tso4o88swgcckkg4scososog"

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
    # 1. Get all envs to find the DATABASE_URL uuid
    envs = make_request(f"/applications/{APP_UUID}/envs")
    db_url_env = next((e for e in envs if e['key'] == "DATABASE_URL"), None)
    
    if db_url_env:
        # Use internal service name and default port 5432
        new_url = f"postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@{DB_RESOURCE_NAME}:5432/postgres"
        print(f"Updating DATABASE_URL to {new_url}...")
        
        payload = {
            "key": "DATABASE_URL",
            "value": new_url,
            "is_preview": False,
            "is_build_time": False,
            "is_literal": True
        }
        
        make_request(f"/applications/{APP_UUID}/envs/{db_url_env['uuid']}", "PATCH", payload)
        print("Updated!")
        
        # 2. Restart the app
        print("Restarting app...")
        make_request(f"/applications/{APP_UUID}/restart", "POST")
        print("Restart triggered.")
    else:
        print("DATABASE_URL env var not found.")
