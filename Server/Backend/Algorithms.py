import networkx as nx
from . import Firefighter_Problem
import logging
import os
from datetime import datetime

def setup_logger():
    logger = logging.getLogger('firefighter_problem_main')

    # Remove existing handlers to avoid duplication and to reset logging
    if logger.hasHandlers():
        logger.handlers.clear()

    logger.setLevel(logging.DEBUG)

    # Console Handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)

    # File Handler
    log_directory = "logs"
    if not os.path.exists(log_directory):
        os.makedirs(log_directory)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_filename = f"{log_directory}/firefighter_log_{timestamp}.txt"
    file_handler = logging.FileHandler(log_filename)
    file_handler.setLevel(logging.DEBUG)

    # Formatter
    formatter = logging.Formatter('%(message)s')
    console_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)

    # Add handlers to logger
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger, log_filename




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
    logger, log_filename = setup_logger()

    G = create_nx_graph(graph)
    if budget:
        budget = int(budget)
    ans = None
    
    match selected_algorithm:
        case "Spreading MaxSave":
            print(selected_algorithm)
            ans = Firefighter_Problem.spreading_maxsave(Graph=G,budget=budget,source=source,targets=target)
            print(ans)
            return ans,log_filename
        case "Spreading MinBudget":
            print(selected_algorithm)
            ans = Firefighter_Problem.spreading_minbudget(Graph=G,source=source,targets=target)
            return ans,log_filename
        case "Non-Spreading Dirlay MinBudget":
            print(selected_algorithm)
            ans = Firefighter_Problem.non_spreading_dirlaynet_minbudget(Graph=G,source=source,targets=target)
            return ans,log_filename
        case "Non-Spreading MinBudget":
            print(selected_algorithm)
            ans = Firefighter_Problem.non_spreading_minbudget(Graph=G,source=source,targets=target)
            print(ans)
            return ans,log_filename
        case "Heuristic Spreading Maxsave": 
            print(selected_algorithm)
            ans = Firefighter_Problem.heuristic_maxsave(Graph=G,budget=budget,source=source,targets=target,spreading=True)
            return ans,log_filename
        case "Heuristic Spreading MinBudget":
            print(selected_algorithm)
            ans = Firefighter_Problem.heuristic_minbudget(Graph=G,source=source,targets=target,spreading=True)
            return ans,log_filename
        case "Heuristic Non-Spreading MinBudget":
            print(selected_algorithm)
            ans = Firefighter_Problem.heuristic_minbudget(Graph=G,source=source,targets=target,spreading=False)
            return ans,log_filename
        case _:
            logger.error(f"Unknown algorithm selected: {selected_algorithm}")
            raise ValueError("Unknown algorithm selected")
    
if __name__ == "__main__":
    pass