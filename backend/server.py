from flask import Flask, jsonify, request
import pandas as pd
import sqlite3

sqlite_file_path = 'database.db'

app = Flask(__name__)

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
    return df.to_json()

@app.route('/get-asset-predictions')
def get_asset_predictions():
    
    data = {'message': 'This is JSON data from the backend'}
    return jsonify(data)

@app.route('/search')
def search():
    conn = sqlite3.connect(sqlite_file_path)

    q = request.args.get('query', None)

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
    return df.to_json()


if __name__ == '__main__':
    app.run()