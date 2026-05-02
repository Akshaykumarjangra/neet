import psycopg2
import sys

# Test connection to the public DB port
DB_PASS = "iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc"
DB_URL = f"postgresql://postgres:{DB_PASS}@82.25.104.62:8001/postgres?sslmode=require"

print(f"Attempting to connect to 82.25.104.62:8001...")
try:
    conn = psycopg2.connect(DB_URL, connect_timeout=10)
    cur = conn.cursor()
    cur.execute("SELECT NOW();")
    print(f"✓ Success! Server time: {cur.fetchone()[0]}")
    cur.close()
    conn.close()
except Exception as e:
    print(f"✗ Connection failed: {e}")
    sys.exit(1)
