import urllib.request
import json
import sys

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def api(endpoint, method="GET", data=None):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    try:
        with urllib.request.urlopen(req) as response:
            return json.load(response)
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f"  HTTP {e.code} for {method} {endpoint}: {body[:200]}", file=sys.stderr)
        raise

# The Coolify API for updating envs may require creating new + deleting old
# Let's try the bulk update approach: delete old, create new

# Get all current envs
envs = api(f"/applications/{APP_UUID}/envs")

# Separate preview vs non-preview
prod_envs = [e for e in envs if not e.get("is_preview", False)]

print(f"Found {len(prod_envs)} production env vars")
print(f"Current DATABASE_URL: {[e['value'] for e in prod_envs if e['key'] == 'DATABASE_URL'][0]}")

# The correct internal Docker hostname for the PostgreSQL service
INTERNAL_DB_HOST = "postgresql-database-tso4o88swgcckkg4scososog"
CORRECT_DB_URL = f"postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@{INTERNAL_DB_HOST}:5432/postgres"

# What we need to fix
corrections = {
    "NODE_ENV": "production",
    "DATABASE_URL": CORRECT_DB_URL,
    "DATABASE_SSL": "true",
    "APP_BASE_URL": "https://neet.zeroai.org.in",
    "CLIENT_BASE_URL": "https://neet.zeroai.org.in",
    "CORS_ORIGIN": "https://neet.zeroai.org.in,https://neet.zeropage.in",
    "BILLING_SUCCESS_URL": "https://neet.zeroai.org.in/billing-status?status=success",
    "BILLING_CANCEL_URL": "https://neet.zeroai.org.in/billing-status?status=cancelled",
    "OWNER_EMAIL": "akg45272@gmail.com",
    "OWNER_PASSWORD": "akg45272@gmail.com",
}

print("\n=== Strategy: Delete old envs and recreate with correct values ===")

# For each correction, delete the existing env (if any) and create new
for key, value in corrections.items():
    existing = [e for e in prod_envs if e["key"] == key]
    
    # Try to delete existing first
    for e in existing:
        uuid = e["uuid"]
        try:
            api(f"/applications/{APP_UUID}/envs/{uuid}", "DELETE")
            print(f"  Deleted old {key}")
        except Exception as ex:
            print(f"  Could not delete {key} ({uuid}): {ex}")
    
    # Create new
    try:
        api(f"/applications/{APP_UUID}/envs", "POST", {
            "key": key,
            "value": value,
            "is_preview": False,
            "is_build_time": False,
        })
        print(f"  Created {key} = {value[:50]}{'...' if len(value)>50 else ''}")
    except Exception as ex:
        print(f"  FAILED to create {key}: {ex}")

print("\n=== Done updating envs ===")
