import pymysql

db = pymysql.connect(
    host="0.0.0.0", 
    port=3307,
    user="root", 
    password="mysql", 
    database="Twar"
)

def execute(sql):
    with db.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()
    
def get_auth_details():
    sql = 'select * from Auth'
    result = execute(sql)
    print (result)
    


def update_kpi_deatils(account_id, daily, weekly):
    try:
        sql = f'update kpi set daily={daily}, weekly={weekly} where id = (select kpi_id from bot where id={account_id})'
        res = execute(sql)
        db.commit()
        return True
    except Exception as ex:
        print (f"Error : {ex} While Updating KPI for {account_id}")
        return False
    

def get_status(account_id):
    sql = f'select status from bot where id = {account_id}'
    res = execute(sql)
    return res[0][0]
    
def switch_account_status(account_id):
    try:
        current_status = get_status(account_id)
        new_status = '0'
        if current_status == '0':
            new_status = '1'
        sql = f'update bot set status = {new_status} where id={account_id}'
        execute(sql)
        db.commit()
        return True
    
    except Exception as ex:
        print (f"Error : {ex} While Switching Status for {account_id}")
        return False
    
def delete_account(account_id):
    try:
        sql = f'delete from bot where id={account_id}'
        res = execute(sql)
        db.commit()
        return True
    except Exception as ex:
        print (f"Error : {ex} While deleting account for {account_id}")
        return False
        
    

def get_bot_auth_details():
    sql = 'select * from BotAuth'
    result = execute(sql)
    print (result)
    
    
    ans = []
    
    keys = ['id', 'screen_name', 'status', 'sss' ]
    
    print (result)
    for res in result:
        print (list(res))
        
        mp = {}
        mp[keys[0]]=res[0]
        mp[keys[1]]=res[1]
        mp[keys[2]]=res[2]
        mp[keys[3]]=res[3]
        ans.append(mp)
    return ans

    
    
    


