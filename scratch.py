import os
from google import genai

client = genai.Client(api_key="AIzaSyCzLqjTOmuHcKLWR589Hg1d9lgopfstJtc")
try:
    for model in client.models.list():
        print(model.name)
except Exception as e:
    print("Error:", e)
