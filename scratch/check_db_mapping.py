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
        for env in envs:
            if env['key'] == 'DATABASE_URL':
                print(f"DATABASE_URL: {env['value']}")
                print(f"Real Value: {env.get('real_value', 'N/A')}")
            if env['key'] == 'NODE_ENV':
                print(f"NODE_ENV: {env['value']}")
    else:
        print("Could not fetch envs.")
