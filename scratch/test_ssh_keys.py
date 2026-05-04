import os
import subprocess

keys = [f for f in os.listdir('scratch') if f.startswith('vps_key') and f.endswith('.pem')]

for key in keys:
    key_path = os.path.join('scratch', key)
    print(f"Testing {key}...")
    try:
        # Use -o BatchMode=yes to avoid hang
        result = subprocess.run(
            ['ssh', '-o', 'StrictHostKeyChecking=no', '-o', 'ConnectTimeout=5', '-o', 'BatchMode=yes', '-i', key_path, 'root@82.25.104.62', 'id'],
            capture_output=True, text=True, timeout=10
        )
        if result.returncode == 0:
            print(f"SUCCESS with {key}: {result.stdout.strip()}")
        else:
            print(f"FAILED with {key}: {result.stderr.strip()}")
    except Exception as e:
        print(f"ERROR with {key}: {e}")
