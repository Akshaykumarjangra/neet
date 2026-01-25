
import urllib.request
import json
import sys

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
        print(f"HTTP Error {e.code}: {e.read().decode()}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def main():
    print("Finding Server...")
    servers = make_request("/servers")
    if not servers:
        print("No servers found.")
        return
    server = servers[0]
    server_uuid = server.get('uuid')
    print(f"Found Server: {server.get('name')} ({server_uuid})")

    print("Finding Project...")
    projects = make_request("/projects")
    project = next((p for p in projects if p.get('name') == "ZeroPage"), None)
    
    if not project:
        print("Creating Project ZeroPage...")
        project = make_request("/projects", "POST", {"name": "ZeroPage"})
    
    if not project:
        print("Failed to get/create project")
        return

    project_uuid = project.get('uuid')
    print(f"Found Project: {project.get('name')} ({project_uuid})")

    # Get Environment (usually 'production' or default)
    # The API structure for creating a service usually requires an environment
    # We'll assume the default environment for the project
    
    # Try to find existing MinIO service
    print("Checking for existing MinIO service...")
    services = make_request("/services")
    minio = next((s for s in services if s.get('name') == "minio-storage" or "minio" in s.get('name', '').lower()), None)

    if minio:
        print(f"Found existing MinIO service: {minio.get('name')}")
        # In a real scenario we would try to get credentials here
        # POST /services/{uuid}/start if needed?
    else:
        print("No MinIO service found. Attempting to create one...")
        # Note: This payload is a best-guess for Coolify API v4 "one-click" service creation
        # If this fails, user must do it manually.
        payload = {
            "type": "minio",
            "name": "minio-storage",
            "project_uuid": project_uuid,
            "server_uuid": server_uuid,
            "environment_name": "production", 
            "destination_uuid": server_uuid # Sometimes required
        }
        
        # Try different endpoints or payloads if documented? 
        # For now, let's try the standard /services create
        res = make_request("/services", "POST", payload)
        if res:
             print("Created MinIO service!")
             print(json.dumps(res, indent=2))
        else:
             print("Failed to create MinIO service automatically. Please create one manually in Coolify.")

if __name__ == "__main__":
    main()
