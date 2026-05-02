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
    with urllib.request.urlopen(req) as response:
        return json.load(response)

# 1. Reset critical envs with NO SSL
DB_PASS = "iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc"
# Use internal host again as it's best practice in Coolify
INTERNAL_DB_HOST = "postgresql-database-tso4o88swgcckkg4scososog"
NEW_URL = f"postgresql://postgres:{DB_PASS}@{INTERNAL_DB_HOST}:5432/postgres"

# Get current envs to delete duplicates
envs = api(f"/applications/{APP_UUID}/envs")
for key in ['DATABASE_URL', 'DATABASE_SSL']:
    matches = [e for e in envs if e['key'] == key]
    for e in matches:
        try: api(f"/applications/{APP_UUID}/envs/{e['uuid']}", "DELETE")
        except: pass

# Create fresh
api(f"/applications/{APP_UUID}/envs", "POST", {
    "key": "DATABASE_URL",
    "value": NEW_URL,
    "is_preview": False,
    "is_build_time": False
})
api(f"/applications/{APP_UUID}/envs", "POST", {
    "key": "DATABASE_SSL",
    "value": "false",
    "is_preview": False,
    "is_build_time": False
})

print("Envs updated: Internal DB URL with SSL=false")

# 2. Force Restart
api(f"/applications/{APP_UUID}/restart", "POST")
print("Restart requested.")
