import asyncio
import websockets
from websockets.asyncio.server import serve


PORT = 9876
UPDATE_INTERVAL = 1


async def periodic_update(websocket):
    while True:
        await asyncio.sleep(UPDATE_INTERVAL)
        try:
            await websocket.send('Enter update text')
        except websockets.ConnectionClosed:
            print('Connection closed.')
            break

async def echo(websocket):
    asyncio.create_task(periodic_update(websocket))

    async for message in websocket:
        print(f'New message: {message}')
        await websocket.send(f'Echo: {message}')

async def main():
    async with serve(echo, 'localhost', PORT):
        await asyncio.Future()

if __name__ == '__main__':
    asyncio.run(main())
