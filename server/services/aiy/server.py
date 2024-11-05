from flask_cors import CORS
from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/hello', methods=['GET'])
def hello():
    return {"message": "Hello from python flask server"}

if __name__ == '__main__':
    port = int(os.getenv('PYTHON_SERVICE_PORT', 5002))
    app.run(host='0.0.0.0', port=port, debug=True)