from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import tensorflow.compat.v2 as tf   # pip install -U "tensorflow==1.14"
import tensorflow_hub as hub
import numpy as np
import pandas as pd
import cv2
from skimage import io
import base64
import io as python_io
import os
import kagglehub
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

try:
    model_path = kagglehub.model_download("google/aiy/tensorFlow1/vision-classifier-food-v1")
    model = hub.KerasLayer('https://www.kaggle.com/models/google/aiy/TensorFlow1/vision-classifier-food-v1/1')
    print("Model loaded successfully")

except Exception as e:
    print(f"Error downloading model: {e}")

def classify_food_image(image):
    try:
        input_shape = (224, 224)
        image = cv2.resize(image, dsize=input_shape, interpolation=cv2.INTER_CUBIC)
        image = image / image.max()
        images = np.expand_dims(image, 0)

        output = model(images)
        output_array = output.numpy()[0]

        label_map_url = "https://www.gstatic.com/aihub/tfhub/labelmaps/aiy_food_V1_labelmap.csv"
        classes = list(pd.read_csv(label_map_url)["name"])

        CONFIDENCE_THRESHOLD = 0.001

        predictions = []
    
        for i, confidence in enumerate(output_array):
            if confidence > CONFIDENCE_THRESHOLD:
                predictions.append({
                    "food_item": classes[i],
                    "confidence": float(confidence),
                    "class_index": i,
                    "raw_logit": float(confidence),
                })

        predictions.sort(key=lambda x: x['confidence'], reverse=True)

        #  standardized output format
        return {
            "model_info": {
                "model_name": "vision-classifier-food-v1",
                "model_type": "tensorflow",
                "creator": "google/aiy",
                "documentation_url": "https://www.kaggle.com/models/google/aiy/tfLite/vision-classifier-food-v1",
            },
            "predictions": [{
                "confidence_value": pred["confidence"],
                "food_item": pred["food_item"],
            } for pred in predictions]
        }

    except Exception as e:
        raise Exception(f"Error in classification: {str(e)}")

@app.route('/hello', methods=['GET'])
def hello():
    return {"message": "Hello from python flask server"}

@app.route('/analyze', methods=['POST'])
def analyze():
    
    print('Received request:')
    
    try:
        print('Received image data:', request.json.keys())

        if 'image' not in request.json:
            print("Error: 'image' key is not found in request")
            return jsonify({"error": "'image' key not found in request"}), 400
        
        image_data = request.json['image']
        print('Base64 string length:', len(image_data))

        try: 
            image_bytes = base64.b64decode(image_data)
            print('Successfully decoded base64 data, size:', len(image_bytes))
        
        except Exception as e:
            print("Error decoding base64:", str(e))
            return jsonify({"error": f"Base64 decode error: {str(e)}"}), 400
        
        try:
            image = np.asarray(io.imread(python_io.BytesIO(image_bytes)), dtype="float")
            print('Successfully loaded image, shape:', image.shape)
        
        except Exception as e:
            print("Error loading image:", str(e))
            return jsonify({"error": f"Image loading error: {str(e)}"}), 400
        
        
        results = classify_food_image(image)

        return jsonify(results)
    
    except Exception as e:
        print("Error in analyze route:". str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    port = int(os.getenv('PYTHON_SERVICE_PORT', 5002))
    app.run(host='0.0.0.0', port=port, debug=True)