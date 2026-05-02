import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

# 1. Get all envs
req = urllib.request.Request(f"{BASE_URL}/applications/{APP_UUID}/envs", headers=headers)
res = json.load(urllib.request.urlopen(req))

# 2. Delete all DATABASE_URL keys
for env in res:
    if env['key'] == 'DATABASE_URL':
        print(f"Deleting env {env['uuid']} ({env['value']})")
        del_req = urllib.request.Request(f"{BASE_URL}/applications/{APP_UUID}/envs/{env['uuid']}", headers=headers, method="DELETE")
        urllib.request.urlopen(del_req)

# 3. Create fresh DATABASE_URL
correct_url = "postgres://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@tso4o88swgcckkg4scososog:5432/postgres"
post_data = {
    "key": "DATABASE_URL",
    "value": correct_url,
    "is_preview": False,
    "is_build_time": False
}
post_req = urllib.request.Request(f"{BASE_URL}/applications/{APP_UUID}/envs", headers=headers, method="POST", data=json.dumps(post_data).encode())
json.load(urllib.request.urlopen(post_req))
print(f"Created fresh DATABASE_URL: {correct_url}")
