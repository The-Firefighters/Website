# this file simply calls the algorithms from the networkZ library.
# it processes the data given from the server side and then sends the results to the app.js side using the server
# import networkz.



def run_algorithm(graph, selected_algorithm, source, target, budget):

    import networkx as nx
    G = nx.DiGraph()
    G.add_nodes_from(graph['nodes'])
    G.add_edges_from([(e['source'], e['target']) for e in graph['edges']])

    if selected_algorithm == "Non-Spreading MinBudget":
        return non_spreading_minbudget(G, source, target)
    # Add more algorithm conditions here
    else:
        raise ValueError("Unknown algorithm selected")

def non_spreading_minbudget(graph, source, target):
    ans = Firefighter_Problem.non_spreading_minbudget(graph, source, target)
    print(ans)
    return ans

# Add more algorithm functions as needed

if __name__ == "__main__":
    pass