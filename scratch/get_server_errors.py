import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

DEPLOY_UUID = "og80okokk4sk0s48swwokkwo"

headers = {
    "Authorization": "Bearer 3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588",
    "Accept": "application/json"
}
req = urllib.request.Request(
    f"http://82.25.104.62:8000/api/v1/deployments/{DEPLOY_UUID}",
    headers=headers
)
res = json.load(urllib.request.urlopen(req))

logs = json.loads(res.get('logs', '[]'))

# Find the build error - look for build:server and errors
for entry in logs:
    output = entry.get('output', '')
    if 'build:server' in output or 'error' in output.lower() or 'ERROR' in output or 'unresolved' in output.lower() or 'external' in output.lower():
        if not entry.get('hidden', False):
            print(f"[{entry.get('type','')}] {output}")
