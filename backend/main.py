import json
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    json_data = json.load(open("data.json","r"))
    return json_data