import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

def make_request(endpoint):
    url = f"{BASE_URL}{endpoint}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            return json.load(response)
    except Exception as e:
        print(f"Error for {endpoint}: {e}")
        return None

if __name__ == "__main__":
    projects = make_request("/projects")
    all_dbs = []
    if projects:
        for p in projects:
            p_uuid = p['uuid']
            print(f"Checking project: {p['name']} ({p_uuid})")
            # In Coolify v4, resources are often linked to environments within projects
            p_details = make_request(f"/projects/{p_uuid}")
            if p_details and 'environments' in p_details:
                for env in p_details['environments']:
                    env_uuid = env['uuid']
                    print(f"  Checking environment: {env['name']} ({env_uuid})")
                    # No direct "databases" endpoint for environment usually, but we can check databases globally and filter
    
    # Let's just list all databases globally again to be sure
    databases = make_request("/databases")
    if databases:
        for db in databases:
            print(f"Found DB: {db['name']} (Type: {db['database_type']}, UUID: {db['uuid']})")
            print(f"  External URL: {db.get('external_db_url')}")
            print(f"  Internal URL: {db.get('internal_db_url')}")
            print("-" * 20)
