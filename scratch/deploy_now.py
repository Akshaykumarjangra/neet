import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

req = urllib.request.Request(
    f"{BASE_URL}/deploy",
    headers=headers,
    method="POST",
    data=json.dumps({"uuid": APP_UUID}).encode('utf-8')
)
res = json.load(urllib.request.urlopen(req))
print(json.dumps(res, indent=2))
