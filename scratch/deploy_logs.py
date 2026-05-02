import urllib.request
import json
import sys

# Force UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

headers = {
    "Authorization": "Bearer 3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588",
    "Accept": "application/json"
}
req = urllib.request.Request(
    "http://82.25.104.62:8000/api/v1/deployments/ak4cogoogo4804wkwoosgc0o",
    headers=headers
)
res = json.load(urllib.request.urlopen(req))
logs = json.loads(res.get("logs", "[]"))

# Show last 30 log entries
for entry in logs[-30:]:
    output = entry.get("output", "")
    etype = entry.get("type", "")
    hidden = entry.get("hidden", False)
    if not hidden:
        print(f"[{etype}] {output}")
