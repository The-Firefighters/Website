from flask import Flask, request, jsonify
from flask_cors import CORS  # This is to handle CORS issues
from Backend import Algorithms  

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

def result_to_json(algo_result,selected_algorithm): 

    if "maxsave" in selected_algorithm.lower():
        data = algo_result[0] #get the stategy for max save
        tampered_result = {timestep: [node for node, t in data if t == timestep] for timestep in set(t for _, t in data)}
        algo_result = (algo_result[0] , list(algo_result[1])) #cant jsonify sets, so we convert it to list..
        

    if "minbudget" in selected_algorithm.lower():
        data = algo_result[1] # get the stategy for minbudget
        tampered_result = {timestep: [node for node, t in data if t == timestep] for timestep in set(t for _, t in data)}

    return jsonify( {"algoResult":algo_result , "DrawingResults":tampered_result } )
    


@app.route('/run-algorithm', methods=['POST'])
def run_algorithm_endpoint():
    data = request.json
    graph = data.get('graph')
    selected_algorithm = data.get('selectedAlgorithm')
    source_node = data.get('sourceNode')
    target_nodes = data.get('targetNodes')
    budget = data.get('budget')

    algo_result = Algorithms.run_algorithm(graph, selected_algorithm, source_node, target_nodes, budget)
    final_result = result_to_json(algo_result,selected_algorithm)

    return final_result

if __name__ == '__main__':
    app.run(debug=True, port=5000)