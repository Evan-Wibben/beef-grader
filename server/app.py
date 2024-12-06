
from flask import Flask, request, jsonify
import base64
import numpy as np
import cv2
import tensorflow as tf
import json

app = Flask(__name__)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow all origins
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

# Load the model
model = tf.keras.models.load_model('beef_classification_model.keras')

# Load class names
with open('class_names.json', 'r') as f:
    class_names = json.load(f)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    image_base64 = data['image']
    
    # Decode and preprocess the image
    image_data = base64.b64decode(image_base64)
    nparr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = tf.image.resize(img, (256, 256))
    img = np.expand_dims(img / 255.0, 0)
    
    # Make prediction using your model
    prediction = model.predict(img)
    predicted_class = np.argmax(prediction)
    
    result = {
        'predicted_class': class_names[predicted_class],
        'confidence': float(prediction[0][predicted_class])
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=8080)