# this file simply calls the algorithms from the networkZ library.
# it processes the data given from the server side and then sends the results to the app.js side using the server
# import networkz.
import networkx as nx
from Firefighter_Problem import *

def create_nx_graph(data):
    G = nx.DiGraph()

    # Add nodes to the graph
    for node in data['nodes']:
        G.add_node(node['id'], pos=(node['x'], node['y']))

    # Add edges to the graph
    for edge in data['edges']:
        G.add_edge(edge['source'], edge['target'])

    return G

def run_algorithm(graph, selected_algorithm, source, target, budget):
    G = create_nx_graph(graph)
    ans = ""
    
    match selected_algorithm:
        case "Spreading MaxSave":
            print(selected_algorithm)
            ans = spreading_maxsave(Graph=graph,budget=budget,source=source,targets=target)
            return ans, G
        case "Spreading MinBudget":
            print(selected_algorithm)
        case "Non-Spreading Dirlay MinBudget":
            # run 
            print(selected_algorithm)
        case "Non-Spreading MinBudget":
            # run 
            print(selected_algorithm)
        case "Heuristic Spreading Maxsave":
            # run 
            print(selected_algorithm)
        case "Heuristic Spreading MinBudget":
            # run 
            print(selected_algorithm)
        case "Heuristic Non-Spreading MinBudget":
            # run 
            print(selected_algorithm)
        case _:
            raise ValueError("Unknown algorithm selected")
        
# def non_spreading_minbudget(graph, source, target):
#     ans = Firefighter_Problem.non_spreading_minbudget(graph, source, target)
#     print(ans)
#     return ans

# Add more algorithm functions as needed

if __name__ == "__main__":
    pass