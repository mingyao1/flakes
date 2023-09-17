from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import joblib
import pandas as pd
import sqlite3

sqlite_file_path = 'database.db'
model = joblib.load('../training/linear_regression_model.pkl')
scaler = joblib.load('../training/scaler.pkl')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) # Allow CORS requests from any origin. This should be removed for prod

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/get-assets')
def get_assets():
    conn = sqlite3.connect(sqlite_file_path)

    asset_type = request.args.get('asset_type', None)
    mfr = request.args.get('mfr', None)
    install_date = request.args.get('install_date', None)
    last_serviced_date = request.args.get('last_serviced_date', None)
    floor_no = request.args.get('floor_no', None)
    room_no	= request.args.get('floor_no', None)

    query = 'SELECT * FROM assets'
    conditions = []
    if asset_type:
        conditions.append('asset_type = "' + asset_type + '"')
    if mfr:
        conditions.append('mfr = "' + mfr + '"')
    if install_date:
        conditions.append('install_date = "' + install_date + '"')
    if last_serviced_date:
        conditions.append('last_serviced_date = "' + last_serviced_date + '"')
    if floor_no:
        conditions.append('floor_no = "' + last_serviced_date + '"')
    if room_no:
        conditions.append('room_no = "' + last_serviced_date + '"')

    if len(conditions) > 0:
        query += " WHERE " + " & ".join(conditions)   
    
    df = pd.read_sql(query, conn)
    return df.to_json(orient = "records")

@app.route('/get-asset-predictions')
def get_asset_predictions():
    days_in_future = request.args.get('days_in_future', None)
    # Make sure days_in_future is a number
    try:
        days_in_future = float(days_in_future)
    except (TypeError, ValueError):
        return Response("{'error':'days_in_future incorrect or missing'}", status=400, mimetype='application/json')
    
    asset_ids = request.args.getlist('id', None)

    data = {
        'coef': model.coef_,
        'intercept': model.intercept_
    }
    conn = sqlite3.connect(sqlite_file_path)

    filter_columns = [
        'id',
        'mfr',
        'asset_type',
        'uptime',
        'install_date', # This will be changed to asset_age
        'last_serviced_date', # will be changed to days_since_last_service
        # 'work_orders_ct', # This is the one we are predicting
        'repairs_ct'
    ]
    filter_columns = ', '.join(filter_columns)

    addtl = f" WHERE id in ({', '.join(asset_ids)})" if asset_ids else ""

    df = pd.read_sql(f'SELECT {filter_columns} FROM assets{addtl}', conn)

    df['install_date'] = pd.to_datetime(df['install_date'])
    df['last_serviced_date'] = pd.to_datetime(df['last_serviced_date'])
    # Create new features like age of asset, days since last serviced, etc.
    df['asset_age'] = (pd.Timestamp.now() - df['install_date']).dt.days
    df['days_since_last_service'] = (pd.Timestamp.now() - df['last_serviced_date']).dt.days + days_in_future
    df.drop(['install_date', 'last_serviced_date'], axis=1, inplace=True) # Drop the original date columns

    df_scaled = scaler.transform(df.drop('id', axis=1))
    predictions = model.predict(df_scaled)
    res = pd.DataFrame()
    res['id'] = df['id']
    res.set_index('id')
    res['work_orders_ct'] = predictions

    return res.to_json(orient = "records")

@app.route('/search')
def search():
    conn = sqlite3.connect(sqlite_file_path)

    q = request.args.get('query', None)
    if not q or len(q) == 0:
        return Response("{'error':'Your query is empty'}", status=400, mimetype='application/json')

    query = 'SELECT * FROM assets'
    conditions = []
    conditions.append('asset_type LIKE "%' + q + '%"')
    conditions.append('mfr LIKE "%' + q + '%"')
    conditions.append('install_date LIKE "%' + q + '%"')
    conditions.append('last_serviced_date LIKE "%' + q + '%"')
    conditions.append('floor_no LIKE "%' + q + '%"')
    conditions.append('room_no LIKE "%' + q + '%"')

    if len(conditions) > 0:
        query += " WHERE " + " OR ".join(conditions)   
    
    df = pd.read_sql(query, conn)
    return df.to_json(orient = "records")


if __name__ == '__main__':
    app.run()