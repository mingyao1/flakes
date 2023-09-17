import pandas as pd
import sqlite3

csv_file_path = 'Dataset_-_CBRE_Challenge_-_HackSMU_2023.csv'
df = pd.read_csv(csv_file_path)

df['id'] = df["Asset ID"]
df.set_index('id')
df["mfr"] = df['Manufacturer'].str.extract('(\d+)').astype(int)
df['asset_type'] = pd.factorize(df['Asset Type'])[0]

df['floor_no'] = df['Floor'].astype(int)
df['room_no'] = df['Room'].astype(int)

df['uptime'] = df['Operational Time (hrs)'].astype(int)
df["install_date"] = pd.to_datetime(df["Installation Date"]).dt.strftime('%Y-%m-%d %H:%M:%S')
df["last_serviced_date"] = pd.to_datetime(df["Last Serviced Date"]).dt.strftime('%Y-%m-%d %H:%M:%S')
df['work_orders_ct'] = df["Work Orders"].astype(int)
df['repairs_ct'] = df["Repairs"].astype(int)

selected_columns = [
    'id',
    'mfr',
    'asset_type',

    'floor_no',
    'room_no',

    'uptime',
    'install_date',
    'last_serviced_date',
    'work_orders_ct',
    'repairs_ct'
]
df_selected = df[selected_columns]
df_selected.set_index('id')

mapping_table = df[['asset_type', 'Asset Type']].drop_duplicates().sort_values('asset_type')


sqlite_file_path = '../backend/database.db'
conn = sqlite3.connect(sqlite_file_path)

df_selected.to_sql('assets', conn, if_exists='replace', index=False)
mapping_table.to_sql('asset_names', conn, if_exists='replace', index=False)

# Close the database connection
conn.close()
