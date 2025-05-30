import sqlite3
from config import USE_SQLITE, SQLITE_PATH

def init_db():
    conn = sqlite3.connect(SQLITE_PATH)
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS views (id INTEGER PRIMARY KEY, count INTEGER)")
    c.execute("INSERT OR IGNORE INTO views (id, count) VALUES (1, 0)")
    conn.commit()
    conn.close()

def get_view_count():
    conn = sqlite3.connect(SQLITE_PATH)
    c = conn.cursor()
    c.execute("SELECT count FROM views WHERE id = 1")
    count = c.fetchone()[0]
    conn.close()
    return count

def increment_view():
    conn = sqlite3.connect(SQLITE_PATH)
    c = conn.cursor()
    c.execute("UPDATE views SET count = count + 1 WHERE id = 1")
    conn.commit()
    c.execute("SELECT count FROM views WHERE id = 1")
    count = c.fetchone()[0]
    conn.close()
    return count