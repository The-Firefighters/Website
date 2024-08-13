from flask import Flask, request, jsonify
from flask_cors import CORS  # This is to handle CORS issues
from Backend import Algorithms  # Make sure this import works

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/run-algorithm', methods=['POST'])
def run_algorithm_endpoint():
    data = request.json
    graph = data.get('graph')
    selected_algorithm = data.get('selectedAlgorithm')
    source_node = data.get('sourceNode')
    target_nodes = data.get('targetNodes')
    budget = data.get('budget')

    # Call your algorithm function and pass the received data
    result = Algorithms.run_algorithm(graph, selected_algorithm, source_node, target_nodes, budget)

    return jsonify({'status': 'success', 'result': result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)