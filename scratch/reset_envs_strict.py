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

# 1. Get all envs
envs = api(f"/applications/{APP_UUID}/envs")

# 2. Delete ALL duplicates for critical keys
for key in ['DATABASE_URL', 'DATABASE_SSL', 'NODE_ENV']:
    matches = [e for e in envs if e['key'] == key]
    for e in matches:
        try:
            api(f"/applications/{APP_UUID}/envs/{e['uuid']}", "DELETE")
            print(f"Deleted {key} ({e['uuid']})")
        except:
            pass

# 3. Create fresh ones (ONLY is_preview=False)
DB_PASS = "iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc"
# Try internal host first again but with proper name
# If internal fails, we will see it in logs if we can capture them
# But let's stick to PUBLIC IP for now to be 100% sure it connects
NEW_URL = f"postgresql://postgres:{DB_PASS}@82.25.104.62:8001/postgres?sslmode=require"

api(f"/applications/{APP_UUID}/envs", "POST", {
    "key": "DATABASE_URL",
    "value": NEW_URL,
    "is_preview": False,
    "is_build_time": False
})
api(f"/applications/{APP_UUID}/envs", "POST", {
    "key": "DATABASE_SSL",
    "value": "true",
    "is_preview": False,
    "is_build_time": False
})
api(f"/applications/{APP_UUID}/envs", "POST", {
    "key": "NODE_ENV",
    "value": "production",
    "is_preview": False,
    "is_build_time": False
})

print("Envs reset successfully.")
