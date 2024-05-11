import pickle
import lightgbm as lgb
print(lgb.__version__)


# Load the model
model = pickle.load(open("Model/foot.pkl", "rb"))

# Create a dummy input similar to what you expect in your API
sample = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

# Try predicting
print("Prediction:", model.predict(sample))
