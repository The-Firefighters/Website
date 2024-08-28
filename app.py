from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from Server.Backend import Algorithms
import os

app = Flask(__name__)
CORS(app)

def result_to_json(algo_result, selected_algorithm, log_filename):
    if "maxsave" in selected_algorithm.lower():
        data = algo_result[0]
        tampered_result = {timestep: [node for node, t in data if t == timestep] for timestep in set(t for _, t in data)}
        algo_result = (algo_result[0], list(algo_result[1]))

    if "minbudget" in selected_algorithm.lower():
        data = algo_result[1]
        tampered_result = {timestep: [node for node, t in data if t == timestep] for timestep in set(t for _, t in data)}

    return {
        "algoResult": algo_result,
        "DrawingResults": tampered_result,
        "logFilename": os.path.basename(log_filename)
    }

@app.route('/run-algorithm', methods=['POST'])
def run_algorithm_endpoint():
    data = request.json
    graph = data.get('graph')
    selected_algorithm = data.get('selectedAlgorithm')
    source_node = data.get('sourceNode')
    target_nodes = data.get('targetNodes')
    budget = data.get('budget')

    algo_result, log_filename = Algorithms.run_algorithm(graph, selected_algorithm, source_node, target_nodes, budget)
    final_result = result_to_json(algo_result, selected_algorithm, log_filename)

    return jsonify(final_result)

@app.route('/get-log/<filename>', methods=['GET'])
def get_log(filename):
    log_directory = "logs"  # Make sure this matches the directory in your Algorithms.py
    return send_file(os.path.join(log_directory, filename), as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)