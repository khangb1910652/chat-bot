from fastapi import FastAPI, WebSocket
from system.model import *

app = FastAPI()

tokenizer, model = load_tokenizer_and_model()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    chat_history_ids = None
    chat_round = 0

    while True:
        data = await websocket.receive_text()
        response = generate_response(data, tokenizer, model, chat_history_ids, chat_round)

        chat_round += 1
        if chat_round == 2:
            chat_round = 0
            print('Dup')

        chat_history_ids = response.get('id')
        text = response.get('text', '')

        await websocket.send_text(text)
