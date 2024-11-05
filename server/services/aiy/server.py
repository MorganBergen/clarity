from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

@app.route('/hello', methods=['GET'])

def hello():
    return {"message": "Hello from python flask server"}

if __name__ == '__main__':
    port = int(os.getenv('PYTHON_SERVICE_PORT', 5002))
    app.run(port=port)