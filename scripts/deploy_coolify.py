import urllib.request
import json
import sys
import os

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"

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

def get_servers():
    return make_request("/servers")

def create_project(name="ZeroPage"):
    print(f"Checking for project '{name}'...")
    projects = make_request("/projects")
    if projects:
        for p in projects:
            if p.get('name') == name:
                print(f"Project '{name}' already exists.")
                return p
    
    print(f"Creating project '{name}'...")
    return make_request("/projects", "POST", {"name": name, "description": "Deployed via Agent"})

if __name__ == "__main__":
    servers = get_servers()
    if not servers:
        print("No servers found.")
        sys.exit(1)
    
    server = servers[0] # Default to first server
    print(f"Using Server: {server.get('name')} ({server.get('uuid')})")
    
    project = create_project()
    if project:
        print(f"Using Project: {project.get('name')} ({project.get('uuid')})")
    else:
        print("Failed to create/find project.")
        sys.exit(1)
