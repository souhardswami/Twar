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

    
    
    


