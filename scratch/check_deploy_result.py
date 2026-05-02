import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

headers = {
    "Authorization": "Bearer 3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588",
    "Accept": "application/json"
}
req = urllib.request.Request(
    "http://82.25.104.62:8000/api/v1/deployments/i44scw444s4w0oggcwgkcsso",
    headers=headers
)
res = json.load(urllib.request.urlopen(req))
print(f"Status: {res['status']}")
print(f"Updated: {res['updated_at']}")

if res['status'] == 'failed':
    logs = json.loads(res.get('logs', '[]'))
    for entry in logs[-15:]:
        if not entry.get('hidden', False):
            print(f"[{entry.get('type','')}] {entry.get('output','')}")
