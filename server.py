import shutil
import math

import logging
from websocket_server import WebsocketServer
GB = 1073741824
def update(server):
    #used = math.floor((shutil.disk_usage('/').used / GB * 100.0))/100.0
    #total = math.floor((shutil.disk_usage('/').total / GB * 100.0))/100.0
    #free = math.floor(shutil.disk_usage('/').free / GB * 100.0) / 100.0
    print('updated')
    return (str(shutil.disk_usage('/').used) + " " + str(shutil.disk_usage('/').free) + " " + str(shutil.disk_usage('/').total))
def onconnect(client, server):
    print("connected")
    server.send_message(client, update(server))
    print(client)
def onmsg(client, server, msg):
    if msg == "update":
        server.send_message(client, update(server))
    elif msg == "":
        print()

server = WebsocketServer(host='127.0.0.1', port=6960, loglevel=logging.DEBUG)
server.set_fn_message_received(onmsg)
server.set_fn_new_client(onconnect)
server.run_forever()