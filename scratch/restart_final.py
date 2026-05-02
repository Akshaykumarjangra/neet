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

def api(endpoint, method="GET", data=None):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    with urllib.request.urlopen(req) as response:
        return json.load(response)

# Step 1: Simplify start command (env vars now handle everything)
print("1. Updating start command...")
api(f"/applications/{APP_UUID}", "PATCH", {
    "start_command": "node dist/index.js"
})
print("   Done: start_command = 'node dist/index.js'")

# Step 2: Restart
print("2. Restarting application...")
api(f"/applications/{APP_UUID}/restart", "POST")
print("   Restart triggered!")

# Step 3: Verify env vars
print("\n3. Verifying env vars...")
envs = api(f"/applications/{APP_UUID}/envs")
prod_envs = {e["key"]: e["value"] for e in envs if not e.get("is_preview", False)}

critical_keys = ["NODE_ENV", "DATABASE_URL", "DATABASE_SSL", "APP_BASE_URL", "CORS_ORIGIN", "OWNER_EMAIL"]
for key in critical_keys:
    val = prod_envs.get(key, "MISSING!")
    display = val[:60] + "..." if len(val) > 60 else val
    print(f"   {key} = {display}")

print("\nAll done! Wait 2-3 minutes for the restart to complete.")
