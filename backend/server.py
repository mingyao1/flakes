from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()

@app.route('/api/data')
def get_data():
    data = {'message': 'This is JSON data from the backend'}
    return jsonify(data)


