import urllib.request
import json
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

DEPLOY_UUID = "h0cw4o0kck8sgo88k0wg8sko"

headers = {
    "Authorization": "Bearer 3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588",
    "Accept": "application/json"
}

while True:
    req = urllib.request.Request(
        f"http://82.25.104.62:8000/api/v1/deployments/{DEPLOY_UUID}",
        headers=headers
    )
    res = json.load(urllib.request.urlopen(req))
    status = res['status']
    print(f"Status: {status} (updated: {res['updated_at']})")
    
    if status in ('finished', 'failed'):
        if status == 'failed':
            logs = json.loads(res.get('logs', '[]'))
            for entry in logs[-10:]:
                if not entry.get('hidden', False):
                    print(f"  [{entry.get('type','')}] {entry.get('output','')}")
        break
    
    time.sleep(30)

print(f"\nFinal status: {status}")
