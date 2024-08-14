# this file simply calls the algorithms from the networkZ library.
# it processes the data given from the server side and then sends the results to the app.js side using the server
# import networkz.
import networkx as nx

def create_nx_graph(data):
    """
    Creates a networkx graph from the provided data.

    Parameters:
    data (dict): A dictionary containing nodes and edges information.

    Returns:
    G (networkx.Graph): The created graph.
    """
    # Create an empty graph
    G = nx.Graph()

    # Add nodes to the graph
    for node in data['nodes']:
        G.add_node(node['id'], pos=(node['x'], node['y']))

    # Add edges to the graph
    for edge in data['edges']:
        G.add_edge(edge['source'], edge['target'])

    return G

def run_algorithm(graph, selected_algorithm, source, target, budget):
    print(graph)
    G = create_nx_graph(graph)

    if selected_algorithm == "Non-Spreading MinBudget":
        print(selected_algorithm)
        print(source)
        print(target)
        print(G.nodes)
        print(G.edges)
        # return non_spreading_minbudget(G, source, target)
    # Add more algorithm conditions here
    else:
        raise ValueError("Unknown algorithm selected")

# def non_spreading_minbudget(graph, source, target):
#     ans = Firefighter_Problem.non_spreading_minbudget(graph, source, target)
#     print(ans)
#     return ans

# Add more algorithm functions as needed

if __name__ == "__main__":
    pass