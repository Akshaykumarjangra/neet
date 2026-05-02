import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

def make_request(endpoint):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        return json.load(response)

if __name__ == "__main__":
    deployments = make_request(f"/applications/{APP_UUID}/deployments")
    if deployments:
        last_deployment = deployments[0]
        print(f"Deployment UUID: {last_deployment['uuid']}, Status: {last_deployment['status']}")
        # Fetch logs for this deployment
        logs = make_request(f"/deployments/{last_deployment['uuid']}")
        print("Deployment Details:")
        print(json.dumps(logs, indent=2))
