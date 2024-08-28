from flask import Flask, send_from_directory, request, jsonify, send_file
from flask_cors import CORS
from Server.Backend import Algorithms
import os
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)

logger.info(f"Static folder path: {app.static_folder}")
if os.path.exists(app.static_folder):
    logger.info(f"Contents of static folder: {os.listdir(app.static_folder)}")
else:
    logger.error(f"Static folder does not exist: {app.static_folder}")

def result_to_json(algo_result, selected_algorithm, log_filename):
    logger.debug(f"Processing result for algorithm: {selected_algorithm}")
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
    logger.info("Received request to /run-algorithm")
    data = request.json
    logger.debug(f"Request data: {data}")
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
    logger.info(f"Received request to get log file: {filename}")
    log_directory = "logs"
    full_path = os.path.join(log_directory, filename)
    logger.debug(f"Attempting to send file: {full_path}")
    if os.path.exists(full_path):
        return send_file(full_path, as_attachment=True)
    else:
        logger.error(f"Log file not found: {full_path}")
        return "Log file not found", 404

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    logger.info(f"Received request for path: {path}")
    full_path = os.path.join(app.static_folder, path)
    logger.debug(f"Full path: {full_path}")
    logger.debug(f"Does path exist? {os.path.exists(full_path)}")
    
    if path != "" and os.path.exists(full_path):
        logger.info(f"Serving file: {full_path}")
        return send_from_directory(app.static_folder, path)
    else:
        logger.info("Serving index.html")
        index_path = os.path.join(app.static_folder, 'index.html')
        logger.debug(f"Index path: {index_path}")
        logger.debug(f"Does index.html exist? {os.path.exists(index_path)}")
        return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(error):
    logger.error(f"404 error: {error}")
    return "Not found", 404

@app.errorhandler(500)
def server_error(error):
    logger.error(f"500 error: {error}")
    return "Internal server error", 500

if __name__ == '__main__':
    logger.info("Starting Flask development server...")
    app.run(debug=True)
else:
    logger.info("Flask app initialized (not running directly)")