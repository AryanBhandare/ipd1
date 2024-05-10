# Importing necessary libraries

import uvicorn

import pickle

from pydantic import BaseModel

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

# Initializing the fast API server

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = pickle.load(open("Model/foot.pkl", "rb"))
# Defining the model input types


class Player(BaseModel):
    Ball_control: int
    d_r: int
    total_power: int
    shoo_hand: int
    age: int
    total_mentality: int
    finishing: int
    pass_kick: int
    shot_pow: int
    int_rep: int


@app.get("/")
def read_root():

    return {"data": "Welcome to football player price prediction model"}


# Setting up the prediction route


@app.post("/prediction")
async def get_predict(data: Player):
    print("DATA GOT")
    sample = [
        [
            data.Ball_control,
            data.d_r,
            data.total_power,
            data.shoo_hand,
            data.age,
            data.total_mentality,
            data.finishing,
            data.pass_kick,
            data.shot_pow,
            data.int_rep,
        ]
    ]

    hired = model.predict(sample).tolist()[0]

    return {
        "data": {
            "prediction": hired,
        }
    }


if __name__ == "__main__":
    uvicorn.run(app, port=8080, host="0.0.0.0")
