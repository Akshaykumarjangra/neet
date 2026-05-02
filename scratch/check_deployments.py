import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

# List all deployments (global)
req = urllib.request.Request(f"{BASE_URL}/deployments", headers=headers)
res = json.load(urllib.request.urlopen(req))

for d in res[:5]:
    print(f"ID: {d.get('id')}")
    print(f"  Application: {d.get('application_id', 'N/A')}")
    print(f"  Status: {d.get('status')}")
    print(f"  Only this server: {d.get('only_this_server')}")
    print(f"  Restart only: {d.get('restart_only')}")
    print(f"  Created: {d.get('created_at')}")
    print(f"  Updated: {d.get('updated_at')}")
    print()
