import networkx as nx
from . import Firefighter_Problem



# Now you can use firefighter


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
    budget = int(budget)
    ans = None
    
    match selected_algorithm:
        case "Spreading MaxSave":
            print(selected_algorithm)
            ans = Firefighter_Problem.spreading_maxsave(Graph=G,budget=budget,source=source,targets=target)
            return ans
        case "Spreading MinBudget":
            print(selected_algorithm)
            ans = Firefighter_Problem.spreading_minbudget(Graph=G,source=source,targets=target)
            return ans
        case "Non-Spreading Dirlay MinBudget":
            print(selected_algorithm)
            ans = Firefighter_Problem.non_spreading_dirlaynet_minbudget(Graph=G,source=source,targets=target)
            return ans
        case "Non-Spreading MinBudget":
            print(selected_algorithm)
            ans = Firefighter_Problem.non_spreading_minbudget(Graph=G,source=source,targets=target)
            print(ans)
        case "Heuristic Spreading Maxsave": 
            print(selected_algorithm)
            ans = Firefighter_Problem.heuristic_maxsave(Graph=G,budget=budget,source=source,targets=target,spreading=True)
            return ans
        case "Heuristic Spreading MinBudget":
            print(selected_algorithm)
            ans = Firefighter_Problem.heuristic_minbudget(Graph=G,source=source,targets=target,spreading=True)
            return ans
        case "Heuristic Non-Spreading MinBudget":
            print(selected_algorithm)
            ans = Firefighter_Problem.heuristic_minbudget(Graph=G,source=source,targets=target,spreading=False)
            return ans
        case _:
            raise ValueError("Unknown algorithm selected")

if __name__ == "__main__":
    pass