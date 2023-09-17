from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import sqlite3

sqlite_file_path = "database.db"
model = joblib.load("../training/linear_regression_model.pkl")
scaler = joblib.load("../training/scaler.pkl")
X_columns = []
with open("../training/X_columns.csv", "r") as f:
    X_columns = f.readline().split(",")
if X_columns == []: raise FileNotFoundError

app = Flask(__name__)
CORS(
    app, resources={r"/*": {"origins": "*"}}
)  # Allow CORS requests from any origin. This should be removed for prod


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/get-assets")
def get_assets():
    conn = sqlite3.connect(sqlite_file_path)

    asset_type = request.args.get("asset_type", None)
    mfr = request.args.get("mfr", None)
    install_date = request.args.get("install_date", None)
    last_serviced_date = request.args.get("last_serviced_date", None)
    floor_no = request.args.get("floor_no", None)
    room_no = request.args.get("floor_no", None)

    query = "SELECT assets.id as id, mfr, asset_name, floor_no, room_no, uptime, install_date, last_serviced_date, work_orders_ct, repairs_ct FROM assets LEFT JOIN asset_names ON assets.asset_type = asset_names.id"
    conditions = []
    if asset_type:
        conditions.append('asset_name = "' + asset_type + '"')
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
    return Response(df.to_json(orient="records"), content_type="application/json")


@app.route("/get-asset-predictions")
def get_asset_predictions():
    days_in_future = request.args.get("days_in_future", None)
    # Make sure days_in_future is a number
    try:
        days_in_future = float(days_in_future)
    except (TypeError, ValueError):
        return Response(
            "{'error':'days_in_future incorrect or missing'}",
            status=400,
            content_type="application/json",
        )

    asset_ids = request.args.getlist("id", None)

    print({"coef": model.coef_, "intercept": model.intercept_})
    conn = sqlite3.connect(sqlite_file_path)

    filter_columns = [
        "id",
        "mfr",
        "asset_type",
        "uptime",
        "install_date",  # This will be changed to asset_age
        "last_serviced_date",  # will be changed to days_since_last_service
        # "work_orders_ct", # This is the one we are predicting
        "repairs_ct",
    ]
    filter_columns = ", ".join(filter_columns)

    addtl = f" WHERE id in ({', '.join(asset_ids)})" if asset_ids else ""

    df = pd.read_sql(f"SELECT {filter_columns} FROM assets{addtl}", conn)

    df["install_date"] = pd.to_datetime(df["install_date"])
    df["last_serviced_date"] = pd.to_datetime(df["last_serviced_date"])
    # Create new features like age of asset, days since last serviced, etc.
    df["asset_age"] = (pd.to_datetime(pd.Timestamp.now()) - df["install_date"]).dt.days
    df["days_since_last_service"] = (pd.to_datetime(pd.Timestamp.now()) - df["last_serviced_date"]).dt.days
    df.drop(
        ["install_date", "last_serviced_date"], axis=1, inplace=True
    )  # Drop the original date columns
    df["uptime"] /= 24
    df = pd.get_dummies(df, columns=["mfr", "asset_type"], drop_first=True) # One-hot encode columns which will have no linear correlation

    missing_cols = set(X_columns) - set(df.columns.values)
    for col in missing_cols:
        df[col] = 0
    df = df[X_columns + ["id"]]

    df_scaled = scaler.transform(df.drop("id", axis=1))
    present_predictions = model.predict(df_scaled)
    df["asset_age"] += days_in_future
    df["days_since_last_service"] += days_in_future
    df["uptime"] += days_in_future
    df_scaled = scaler.transform(df.drop("id", axis=1))
    future_predictions = model.predict(df_scaled)

    res = pd.DataFrame()
    res["id"] = df["id"]
    res.set_index("id")
    res["work_orders_in_future"] = np.subtract(future_predictions, present_predictions)

    return Response(res.to_json(orient="records"), content_type="application/json")


@app.route("/search")
def search():
    conn = sqlite3.connect(sqlite_file_path)

    queries = request.args.get("query", None).split(" ")
    if not queries or len(queries) == 0 or len(queries[0]) == 0:
        return Response(
            "{'error':'Your query is empty'}",
            status=400,
            content_type="application/json",
        )

    query = "SELECT assets.id as id, mfr, asset_name, floor_no, room_no, uptime, install_date, last_serviced_date, work_orders_ct, repairs_ct FROM assets LEFT JOIN asset_names ON assets.asset_type = asset_names.id"
    conditions = []

    for q in queries:
        conditions.append('asset_name LIKE "%' + q + '%"')
        conditions.append('mfr LIKE "%' + q + '%"')
        conditions.append('install_date LIKE "%' + q + '%"')
        conditions.append('last_serviced_date LIKE "%' + q + '%"')
        conditions.append('floor_no LIKE "%' + q + '%"')
        conditions.append('room_no LIKE "%' + q + '%"')

    if len(conditions) > 0:
        query += " WHERE " + " OR ".join(conditions)

    df = pd.read_sql(query, conn)
    return Response(df.to_json(orient="records"), content_type="application/json")


if __name__ == "__main__":
    app.run()
