import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

req = urllib.request.Request(
    f"{BASE_URL}/applications/{APP_UUID}",
    headers={
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/json"
    }
)

try:
    resp = urllib.request.urlopen(req, timeout=15)
    data = json.load(resp)
    print(json.dumps(data, indent=2))
except Exception as ex:
    print(f"Error: {ex}")
