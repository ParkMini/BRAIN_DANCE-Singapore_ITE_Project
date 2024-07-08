import asyncio
import websockets

async def handle_client(websocket, path, server_name):
    print(f"{server_name}: Connection from {websocket.remote_address} has been established.")
    try:
        async for message in websocket:
            print(f"{server_name}: Received data: {message}")
    except websockets.ConnectionClosed:
        print(f"{server_name}: Connection from {websocket.remote_address} has been closed.")

async def start_server(server_name, host, port):
    print(f"{server_name}: Server starting on {host}:{port}")
    async with websockets.serve(lambda ws, path: handle_client(ws, path, server_name), host, port):
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.create_task(start_server("Server A", "0.0.0.0", 12345))
    loop.create_task(start_server("Server B", "0.0.0.0", 12346))
    loop.run_forever()
