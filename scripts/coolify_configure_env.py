import urllib.request
import json
import sys
import os

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
    try:
        req = urllib.request.Request(url, headers=headers, method=method)
        if data:
            req.data = json.dumps(data).encode('utf-8')
        
        with urllib.request.urlopen(req) as response:
            return json.load(response)
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason} for {endpoint}")
        print(e.read().decode())
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def read_env_file(filepath):
    envs = {}
    if not os.path.exists(filepath):
        return envs
    
    with open(filepath, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if '=' in line:
                key, value = line.split('=', 1)
                envs[key.strip()] = value.strip()
    return envs

def set_env_var(key, value):
    print(f"Setting {key}...")
    # Payload usually: { "key": "...", "value": "...", "is_preview": false, "is_build_time": false, "is_literal": true }
    payload = {
        "key": key,
        "value": value,
        "is_preview": False,
        "is_build_time": False,
        "is_literal": True
    }
    
    # Try POST first
    res = make_request(f"/applications/{APP_UUID}/envs", "POST", payload)
    
    # If 409 Conflict, it already exists, so try to find its ID and use PATCH
    # Coolify API usually returns the existing envs in another endpoint
    # For now, let's try a simple PATCH to the same endpoint if supported,
    # but the error message suggested PATCH. 
    # Usually PATCH /applications/{uuid}/envs requires the UUID of the environment variable itself.
    # Let's try to get all envs first.
    return res

def sync_envs():
    env_file = ".env"
    envs = read_env_file(env_file)
    
    if not envs:
        print("No env vars found.")
        return
        
    print(f"Fetching existing variables for {APP_UUID}...")
    existing_envs = make_request(f"/applications/{APP_UUID}/envs")
    existing_map = {e['key']: e['uuid'] for e in existing_envs} if existing_envs else {}

    print(f"Found {len(envs)} variables to sync. Uploading...")
    
    for key, value in envs.items():
        if key in ["PORT", "CLIENT_DEV_SERVER_PORT"]:
            continue
            
        payload = {
            "key": key,
            "value": value,
            "is_preview": False,
            "is_build_time": False,
            "is_literal": True
        }
        
        if key in existing_map:
            print(f"Updating {key} (PATCH)...")
            make_request(f"/applications/{APP_UUID}/envs/{existing_map[key]}", "PATCH", payload)
        else:
            print(f"Creating {key} (POST)...")
            make_request(f"/applications/{APP_UUID}/envs", "POST", payload)

if __name__ == "__main__":
    sync_envs()
    print("Environment variables upload complete.")
