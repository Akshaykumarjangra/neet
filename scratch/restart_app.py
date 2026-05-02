import urllib.request
import json

BASE_URL = "http://82.25.104.62:8000/api/v1"
TOKEN = "3|Zrv2NbvsSPNlmoIsXMdP9J5sAHwVzsgaLprJNMqY3ef99588"
APP_UUID = "zo8c8sgcckg84cw8480888gw"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

def make_request(endpoint, method="GET"):
    url = f"{BASE_URL}{endpoint}"
    print(f"Requesting {method} {url}...")
    try:
        req = urllib.request.Request(url, headers=headers, method=method)
        with urllib.request.urlopen(req) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    # Restart the application
    res = make_request(f"/applications/{APP_UUID}/restart", "POST")
    if res:
        print("Restart triggered successfully!")
        print(res)
    else:
        # Some Coolify versions use /restart, others use /stop then /start
        print("Trying stop/start sequence...")
        make_request(f"/applications/{APP_UUID}/stop", "POST")
        import time
        time.sleep(2)
        make_request(f"/applications/{APP_UUID}/start", "POST")
        print("Stop/Start sequence triggered.")
