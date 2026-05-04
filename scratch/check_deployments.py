import urllib.request, json, sys
sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
headers = {"Authorization": f"Bearer {TOKEN}", "Accept": "application/json"}

req = urllib.request.Request(f"{BASE_URL}/deployments", headers=headers)
res = json.load(urllib.request.urlopen(req))

for d in res[:5]:
    print(json.dumps({
        "uuid": d["deployment_uuid"],
        "status": d["status"],
        "created": d["created_at"],
    }))
