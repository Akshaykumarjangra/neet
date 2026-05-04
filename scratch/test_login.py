import urllib.request, json, sys
sys.stdout.reconfigure(encoding='utf-8')

data = json.dumps({"email": "akg45272@gmail.com", "password": "akg45272@gmail.com"}).encode()
req = urllib.request.Request(
    "https://neet.zeroai.org.in/api/auth/login",
    data=data,
    headers={"Content-Type": "application/json"}
)

try:
    res = urllib.request.urlopen(req)
    body = json.loads(res.read())
    print(f"Status: {res.getcode()}")
    print(json.dumps(body, indent=2))
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"ERROR {e.code}: {body}")
