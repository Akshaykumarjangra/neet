import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def make_request(endpoint, method="GET", data=None):
    url = f"{BASE_URL}{endpoint}"
    print(f"Requesting {method} {url}...")
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    with urllib.request.urlopen(req) as response:
        return json.load(response)

if __name__ == "__main__":
    # Get all envs
    envs = make_request(f"/applications/{APP_UUID}/envs")
    
    # Identify duplicates or targets
    to_delete = []
    to_update = None
    
    for env in envs:
        if env['key'] == "DATABASE_SSL":
            if not to_update:
                to_update = env['uuid']
            else:
                to_delete.append(env['uuid'])
        
        # Also check for other duplicates just in case
        # (This is a common issue in some Coolify versions)

    for uuid in to_delete:
        print(f"Deleting duplicate {uuid}...")
        make_request(f"/applications/{APP_UUID}/envs/{uuid}", "DELETE")
        
    if to_update:
        print(f"Updating {to_update} to true...")
        payload = {
            "key": "DATABASE_SSL",
            "value": "true",
            "is_preview": False,
            "is_build_time": False,
            "is_literal": True
        }
        make_request(f"/applications/{APP_UUID}/envs/{to_update}", "PATCH", payload)
        
    print("Done. Restarting app...")
    make_request(f"/applications/{APP_UUID}/restart", "POST")
    print("Restart triggered.")
