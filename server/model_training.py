import tensorflow as tf
import os
import cv2
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout
import json

# Avoid OOM errors by setting GPU Memory Consumption Growth
gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus: 
    tf.config.experimental.set_memory_growth(gpu, True)

# Define class names
class_names = ['Beef 1-3', 'Beef 4', 'Beef 5', 'Beef 6', 'Beef 7', 'Beef 8-9']

# Load and preprocess data
data = tf.keras.utils.image_dataset_from_directory('server/data', label_mode='categorical', class_names=class_names)
data = data.map(lambda x, y: (x/255, y))

# Split data
train_size = int(len(data) * 0.8)
val_size = int(len(data) * 0.1)
test_size = int(len(data) * 0.1)

train = data.take(train_size)
val = data.skip(train_size).take(val_size)
test = data.skip(train_size+val_size).take(test_size)

# Define model
model = Sequential([
    Conv2D(16, (3,3), 1, activation='relu', input_shape=(256,256,3)),
    MaxPooling2D(),
    Conv2D(32, (3,3), 1, activation='relu'),
    MaxPooling2D(),
    Conv2D(16, (3,3), 1, activation='relu'),
    MaxPooling2D(),
    Flatten(),
    Dense(256, activation='relu'),
    Dense(6, activation='softmax')
])

# Compile model
model.compile(optimizer='adam', loss=tf.losses.CategoricalCrossentropy(), metrics=['accuracy'])

# Train model
logdir='logs'
tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=logdir)
hist = model.fit(train, epochs=20, validation_data=val, callbacks=[tensorboard_callback])

# Print final training accuracy
if 'accuracy' in hist.history:
    print(f"Final training accuracy: {hist.history['accuracy'][-1]:.4f}")
elif 'acc' in hist.history:
    print(f"Final training accuracy: {hist.history['acc'][-1]:.4f}")
else:
    print("Training accuracy not found in history")

# Save the model
model.save('server/beef_classification_model.keras')

# Save class names
with open('server.class_names.json', 'w') as f:
    json.dump(class_names, f)

print("Model and class names saved successfully.")