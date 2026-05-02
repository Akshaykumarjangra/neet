import psycopg2
import sys

# Check audit logs
DB_PASS = "iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc"
DB_URL = f"postgresql://postgres:{DB_PASS}@82.25.104.62:8001/postgres?sslmode=disable"

try:
    conn = psycopg2.connect(DB_URL, connect_timeout=10)
    cur = conn.cursor()
    cur.execute("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10;")
    rows = cur.fetchall()
    for row in rows:
        print(row)
    cur.close()
    conn.close()
except Exception as e:
    print(f"Failed to check logs: {e}")
