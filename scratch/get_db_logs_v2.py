import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
DB_UUID = "tso4o88swgcckkg4scososog"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

def make_request(endpoint):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        return json.load(response).decode('utf-8')

if __name__ == "__main__":
    # Correct endpoint for DB logs is usually /databases/{uuid}/logs
    try:
        url = f"{BASE_URL}/databases/{DB_UUID}/logs"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            print(response.read().decode('utf-8'))
    except Exception as e:
        print(f"Error: {e}")
