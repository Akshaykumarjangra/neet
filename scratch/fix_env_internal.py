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
    # Get current envs
    envs = make_request(f"/applications/{APP_UUID}/envs")
    
    # Find DATABASE_URL
    db_url_env = next((e for e in envs if e['key'] == 'DATABASE_URL'), None)
    
    if db_url_env:
        print(f"Found DATABASE_URL with UUID: {db_url_env['uuid']}")
        # Update it to use the INTERNAL HOST
        # (Assuming the host networking or shared network works)
        internal_url = "postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@postgresql-database-tso4o88swgcckkg4scososog:5432/postgres"
        
        # In Coolify, you usually PATCH the specific env resource
        # Or you can update the whole application? No.
        # Let's try to PATCH the env uuid
        try:
            payload = {
                "value": internal_url
            }
            make_request(f"/applications/{APP_UUID}/envs/{db_url_env['uuid']}", "PATCH", payload)
            print("Successfully updated DATABASE_URL to internal host.")
        except Exception as e:
            print(f"Failed to update env: {e}")
    else:
        print("DATABASE_URL not found in envs.")
