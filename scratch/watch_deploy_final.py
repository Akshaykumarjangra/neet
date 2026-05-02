import urllib.request
import json
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

DEPLOY_UUID = "cksgcwwkww408sswk0gc4c0c"

headers = {
    "Authorization": "Bearer 3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588",
    "Accept": "application/json"
}

print(f"Watching deployment {DEPLOY_UUID}...")
last_log_idx = 0

while True:
    try:
        req = urllib.request.Request(
            f"http://82.25.104.62:8000/api/v1/deployments/{DEPLOY_UUID}",
            headers=headers
        )
        res = json.load(urllib.request.urlopen(req))
        status = res['status']
        
        logs_data = res.get('logs')
        if logs_data:
            logs = json.loads(logs_data)
            if len(logs) > last_log_idx:
                for entry in logs[last_log_idx:]:
                    if not entry.get('hidden', False):
                        print(f"[{entry.get('type','')}] {entry.get('output','')}")
                last_log_idx = len(logs)
            
        if status in ('finished', 'failed'):
            print(f"\nFinal status: {status}")
            break
            
    except Exception as e:
        print(f"Error fetching logs: {e}")
        
    time.sleep(10)
