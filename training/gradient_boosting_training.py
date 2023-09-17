import pandas as pd
import sqlite3
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import GridSearchCV

# Load the dataset
sqlite_file_path = '../backend/database.db'
conn = sqlite3.connect(sqlite_file_path)

filter_columns = [
    'mfr',
    'asset_type',
    'uptime',
    'install_date', # This will be changed to asset_age
    'last_serviced_date', # will be changed to days_since_last_service
    'work_orders_ct',
    'repairs_ct'
]
filter_columns = ', '.join(filter_columns)
df = pd.read_sql(f'SELECT {filter_columns} FROM assets', conn)

df['install_date'] = pd.to_datetime(df['install_date'])
df['last_serviced_date'] = pd.to_datetime(df['last_serviced_date'])
# Create new features like age of asset, days since last serviced, etc.
df['asset_age'] = (pd.Timestamp.now() - df['install_date']).dt.days
df['days_since_last_service'] = (pd.Timestamp.now() - df['last_serviced_date']).dt.days
df.drop(['install_date', 'last_serviced_date'], axis=1, inplace=True) # Drop the original date columns

# Split data into training and test sets
X = df.drop('work_orders_ct', axis=1)
y = df['work_orders_ct']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalize the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train a gradient boosting regression model
model = GradientBoostingRegressor(random_state=42)

# Initialize grid search with 5-fold cross-validation
n_features = X_train_scaled.shape[1]
param_grid = {
    'n_estimators': [50, 100, 150],
    'max_features': [None, 'sqrt', 'log2', n_features],
    'max_depth': [10, 20, 30]
}
grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=5)
grid_search.fit(X_train_scaled, y_train)

print("Best hyperparameters found: ", grid_search.best_params_)
model = grid_search.best_estimator_

# Save the model for use with the inference code in the backend
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(model, 'gradient_boosting_regression_model.pkl')

# Make predictions and evaluate model
y_pred_train = model.predict(X_train_scaled)
y_pred_test = model.predict(X_test_scaled)

rmse_train = np.sqrt(mean_squared_error(y_train, y_pred_train))
rmse_test = np.sqrt(mean_squared_error(y_test, y_pred_test))

print(f"Training RMSE: {rmse_train}")
print(f"Test RMSE: {rmse_test}")
