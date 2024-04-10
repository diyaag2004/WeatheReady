import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
import pickle

dataset = pd.read_csv('dataset.csv')

X = dataset[['Temperature', 'Humidity', 'Wind speed']]
y = dataset[['Shirt', 'Jeans']]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

forest = RandomForestClassifier(n_estimators=100, random_state=42)
model = MultiOutputClassifier(forest, n_jobs=-1)
model.fit(X_train, y_train)


with open('model.pkl', 'wb') as file:
    pickle.dump(model, file)


