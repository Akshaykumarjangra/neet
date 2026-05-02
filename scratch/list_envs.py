import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

req = urllib.request.Request(f"{BASE_URL}/applications/{APP_UUID}/envs", headers=headers)
res = json.load(urllib.request.urlopen(req))

print("=== ALL ENV VARS ===")
for e in res:
    key = e.get("key", "")
    value = e.get("value", "")
    is_build = e.get("is_build_time", False)
    preview = e.get("is_preview", False)
    print(f"  {key} = {value[:80]}{'...' if len(value)>80 else ''} (build={is_build}, preview={preview})")
