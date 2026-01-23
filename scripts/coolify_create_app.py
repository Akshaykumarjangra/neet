import urllib.request
import json
import sys

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
PROJECT_UUID = "ssk4cs00c400s4kk4s4s00og"
SERVER_UUID = "ug8g00wc48wc0oowskwgwk88"

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
        print(f"HTTP Error: {e.code} - {e.reason}")
        print(e.read().decode())
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def inspect_project():
    print(f"Inspecting Project {PROJECT_UUID}...")
    data = make_request(f"/projects/{PROJECT_UUID}")
    if data:
        # print(json.dumps(data, indent=2))
        return data
    return None

def create_application(environment_uuid):
    print(f"Creating Application in Env: {environment_uuid}")
    # Endpoint based on common Coolify usage: /applications/public or similar? 
    # v4 API typically uses POST /applications
    payload = {
        "project_uuid": PROJECT_UUID,
        "environment_name": "production",
        "server_uuid": SERVER_UUID,
        "name": "ZeroPage-App",
        "git_repository": "https://github.com/coollabsio/coolify-examples",
        "git_branch": "main",
        "build_pack": "nixpacks",
        "ports_exposes": "5001"
    }
    
    # Try different payloads if needed
    # Some APIs require environment_uuid in payload
    payload['environment_uuid'] = environment_uuid
    
    return make_request("/applications/public", "POST", payload) 
    # /applications/public is for public repos. 
    # If that fails, try /applications with appropriate type.

if __name__ == "__main__":
    project = inspect_project()
    if not project:
        print("Could not fetch project.")
        sys.exit(1)
        
    # Find default environment
    envs = project.get('environments', [])
    if not envs:
        print("No environments in project.")
        sys.exit(1)
        
    default_env = envs[0]
    print(f"Target Environment: {default_env.get('name')} ({default_env.get('uuid')})")
    
    # Try to create app
    app = create_application(default_env.get('uuid'))
    if app:
        print("Application Created Successfully!")
        print(json.dumps(app, indent=2))
    else:
        print("Failed to create application.")
