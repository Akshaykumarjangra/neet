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
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            return json.load(response)
    except Exception as e:
        print(f"Error for {endpoint}: {e}")
        return None

if __name__ == "__main__":
    envs = make_request(f"/applications/{APP_UUID}/envs")
    if envs:
        keys_to_check = ['DATABASE_URL', 'SESSION_SECRET', 'FIREBASE_SERVICE_ACCOUNT', 'MSG91_AUTH_KEY', 'GEMINI_API_KEY']
        for env in envs:
            if env['key'] in keys_to_check:
                print(f"{env['key']}: {'[SET]' if env['value'] else '[MISSING]'}")
                if env['key'] == 'DATABASE_URL':
                    print(f"  Value: {env['value']}")
    else:
        print("Could not fetch envs.")
