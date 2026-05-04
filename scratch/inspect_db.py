import psycopg2
import json

try:
    conn = psycopg2.connect('postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@82.25.104.62:8001/postgres')
    cur = conn.cursor()
    
    # Get all tables
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
    tables = [row[0] for row in cur.fetchall()]
    
    db_info = {}
    for table in tables:
        # Get schema for each table
        cur.execute(f"SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = '{table}'")
        columns = [{"name": row[0], "type": row[1], "nullable": row[2]} for row in cur.fetchall()]
        db_info[table] = columns
        
    print(json.dumps(db_info, indent=2))
    
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
