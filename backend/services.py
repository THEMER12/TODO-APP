from typing import List, Union
from DbConnection import get_db_connection


def get_all_tasks():
    conn = get_db_connection()
    if not conn:
       print("Error connecting to the database")
       return None
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute("SELECT * FROM tasks")
        tasks = cursor.fetchall()
    conn.close()
    return tasks

def create_task(title:str, description:str):
    conn= get_db_connection()
    if not conn:
        print("Error connecting to the database")
        return None
    try:
        with conn.cursor() as cursor:
            sql = "INSERT INTO tasks (title, description) VALUES (%s, %s)"
            cursor.execute(sql, (title, description))
            conn.commit()

            new_task_id = cursor.lastrowid
            return {
                "id": new_task_id,
                "title": title,
                "description": description
            }
        
    except Exception as e:
            print(f"Error creating task: {e}")
            return None
    finally:
        conn.close()

def delete_tasks(ids: Union[int, List[int]]):
    conn = get_db_connection()
    if not conn:
        print("Error connecting to the database")
        return None
    
    if isinstance(ids, int):
        ids = [ids]
    elif not isinstance(ids, list):
        print("El parámetro debe ser int o lista de ints")
        return None

    try:
        with conn.cursor(dictionary=True) as cursor:
            placeholders = ','.join(['%s'] * len(ids))
            sql = f"DELETE FROM tasks WHERE id IN ({placeholders})"
            
            cursor.execute(sql, ids)
            conn.commit()

            return {"deleted_count": cursor.rowcount}
        
    except Exception as e:
        print(f"Error deleting tasks: {e}")
        return None
    finally:
        conn.close()