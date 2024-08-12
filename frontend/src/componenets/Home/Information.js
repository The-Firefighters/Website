import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MathJax from 'react-mathjax2';
import { FaChevronDown } from 'react-icons/fa';
import './Information.css';

//TODO : add content to some of the algortimhs that miss it + add the heuristic ones

function Information() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(prevActive => prevActive === id ? null : id);
  };

  const SpreadingMinBudgetPsudo = `
  $$
  \\textbf{Stage 1: Input} \\\\
  \\textbf{1.1} \\text{ Graph } G(V,E), \\text{source node } s, \\text{target set } T \\subseteq V \\\\
  \\textbf{Stage 2: Binary Search} \\\\
  \\textbf{2.1} \\text{ Perform a binary search on the target group } T \\\\
  \\textbf{Stage 3: MaxSave Algorithm} \\\\
  \\textbf{3.1} \\text{ Run the MaxSave algorithm with the budget } B \\text{ found in the binary search} \\\\
  \\textbf{Stage 4: Budget Matching} \\\\
  \\textbf{4.1} \\text{ Match the budget } B \\text{ so that it is minimal but still able to save all nodes of } T \\\\
  \\textbf{Stage 5: Output} \\\\
  \\textbf{5.1} \\text{ Return the approximated minimal budget } B
  $$
  `;


  const SpreadingMaxSavePsudo = `
  $$
  \\textbf{Stage 1: Input} \\\\
  \\textbf{1.1} \\text{ Graph } G(V,E), \\text{source node } s, \\text{target set } T \\subseteq V, \\text{budget } B \\\\
  \\textbf{Stage 2: Initial Calculations} \\\\
  \\textbf{2.1} \\text{ For each } v \\in V: \\\\
  \\quad \\textbf{2.1.1} \\text{ Calculate } \\Gamma(v) = \\{(u,\\tau) \\mid u \\in V \\text{ and } 0 < \\tau \\leq d(s,v) - d(u,v)\\} \\\\
  \\quad \\textbf{2.1.2} \\text{ where } d(x,y) \\text{ is the shortest distance between } x \\text{ and } y \\\\
  \\textbf{2.2} \\text{ For each possible } (u,\\tau) \\text{ pair:} \\\\
  \\quad \\textbf{2.2.1} \\text{ Calculate } S(u,\\tau) = \\{v \\in T : (u,\\tau) \\in \\Gamma(v)\\} \\\\
  \\quad \\textbf{2.2.2} \\text{ (Nodes in } T \\text{ saved by vaccinating } u \\text{ at time } \\tau) \\\\
  \\textbf{Stage 3: Strategy Initialization} \\\\
  \\textbf{3.1} \\varepsilon \\gets \\text{ all possible } (u,\\tau) \\text{ pairs} \\\\
  \\textbf{3.2} \\Psi \\gets \\emptyset \\quad \\text{(Initialize empty vaccination strategy)} \\\\
  \\textbf{Stage 4: Strategy Optimization} \\\\
  \\textbf{4.1} \\text{ While } |\\Psi| < B \\text{ and } \\varepsilon \\text{ is not empty:} \\\\
  \\quad \\textbf{4.1.1} \\text{ Find } (u^*,\\tau^*) \\text{ that maximizes } |S(u,\\tau) \\setminus \\bigcup_{(u',\\tau') \\in \\Psi} S(u',\\tau')| \\text{ for } (u,\\tau) \\in \\varepsilon \\\\
  \\quad \\textbf{4.1.2} \\text{ (Find option saving most new nodes)} \\\\
  \\textbf{4.2} \\text{ Add } (u^*,\\tau^*) \\text{ to } \\Psi \\\\
  \\textbf{4.3} \\text{ Remove } (u^*,\\tau^*) \\text{ from } \\varepsilon \\\\
  \\textbf{Stage 5: Output} \\\\
  \\textbf{5.1} \\text{ Return } \\Psi \\quad \\text{(The optimized vaccination strategy)}
  $$
  `;

  const NonSpreadMinBudgetPsudo = `
  $$
  \\textbf{Stage 1: Input} \\\\
  \\textbf{1.1} \\text{ Graph } G(V,E), \\text{source node } s, \\text{target node } t \\\\
  \\textbf{Stage 2: Algorithm Execution} \\\\
  \\textbf{2.1} \\text{ Find the Min Cut of } s-t \\text{ using Edmond Karp's / Ford Fulkerson algorithm} \\\\
  \\textbf{Stage 3: Output} \\\\
  \\textbf{3.1} \\text{ Return the minimum cut value}
  $$
  `;

  const NonSpreadDirlayMinBudgetPsudo = `
  $$
  \\textbf{Stage 1: Input} \\\\
  \\textbf{1.1} \\text{ Directed layered graph } G(V,E), \\text{source node } s, \\text{target node } t, \\text{ and } l \\text{ layers} \\\\
  \\textbf{Stage 2: Vertex Capacitation} \\\\
  \\textbf{2.1} \\text{ Set capacity of each vertex } v \\in L_i \\text{ at } \\frac{1}{i \\cdot H(l)} \\\\
  \\textbf{Stage 3: Min Cut in Capacitated Network} \\\\
  \\textbf{3.1} \\text{ Find the min } s-t \\text{ cut in this capacitated network:} \\\\
  \\quad \\textbf{3.1.1} \\text{ Apply a reduction to transfer the capacitated network from nodes to edges:} \\\\
  \\quad \\textbf{3.1.2} \\text{ Construct a new graph } G' \\text{ where each vertex } v \\text{ is replaced with } v_{in} \\text{ and } v_{out} \\\\
  \\quad \\textbf{3.1.3} \\text{ Add edge } (v_{in}, v_{out}) \\text{ with capacity equal to } v \\text{ in } G \\\\
  \\quad \\textbf{3.1.4} \\text{ For each edge } (v, u) \\text{ in } G, \\text{ add edge } (v_{out}, u_{in}) \\text{ with capacity } +\\infty \\\\
  \\quad \\textbf{3.1.5} \\text{ Apply Edmond Karp's / Ford Fulkerson algorithm on } G' \\text{ and denote the results as } H' \\\\
  \\quad \\textbf{3.1.6} \\text{ Given } H', \\text{ find the min } s-t \\text{ cut and get the nodes we need from it:} \\\\
  \\quad \\textbf{3.1.7} \\text{ Denote it as } (N_1 \\ldots N_l), N_i \\subseteq L_i \\\\
  \\textbf{Stage 4: Vaccination Strategy} \\\\
  \\textbf{4.1} \\text{ The algorithm vaccinates the vertices of } N_i \\text{ as follows:} \\\\
  \\quad \\textbf{4.1.1} \\text{ Construct an upper triangular matrix } M' \\\\
  \\quad \\textbf{4.1.2} M'_{ij} := \\frac{|N_j|}{j}, 1 \\leq i \\leq j \\leq l \\\\
  \\quad \\textbf{4.1.3} \\text{ For any column } j, \\text{ the column sum is exactly } |N_j| \\\\
  \\textbf{Stage 5: Output} \\\\
  \\textbf{5.1} \\text{ Return vaccination strategy based on } M'
  $$`;

  const dropdowns = [
    {
      id: 'Spreading-Maxsave',
      title: 'Spreading MaxSave',
      content: "TBD",
      latex: SpreadingMaxSavePsudo
    },
    {
      id: 'Spreading-Minbudget',
      title: 'Spreading Minbudget',
      content: "In the Spreading MinBudget algorithm, the MinBudget problem is as hard as a set-cover. There is a set-cover of size B if and only if there is a vaccination strategy immunizing at most B nodes per time step. Therefore the algrotithm will be: ",
      latex: SpreadingMinBudgetPsudo
    },
    {
      id: 'NonSpreading-Minbudget',
      title: 'Non-Spreading Minbudget',
      content:"For the Non-Spreading Minbudget algorithm, the article considers the following equivalent problem: We create a new node t and edges from all nodes in T (the target node's group) to t, and consider the problem of saving t with the minimum budget, under the additional constraint that t itself cannot be vaccinated. Call s the source and t the sink. Therefore the algorithm will be:",
      latex: NonSpreadMinBudgetPsudo
    },
    {
      id: 'NonSpreading-Dirlay-Minbudget',
      title: 'Non-Spreading Dirlay Minbudget',
      content: "TBD", 
      latex: NonSpreadDirlayMinBudgetPsudo
    },
    {
      id: 'Heuristic-Maxsave',
      title: 'Heuristic Maxsave',
      content: "TBD",
      latex: ""

    },
    {
      id: 'Heuristic-Minbudget',
      title: 'Heuristic Minbudget',
      content: "We will use in the same approach, just like in the Spreading MinBudget algorithm. Therefore the algorithm will be: ", 
      latex: ""

    }
  ];

    return (
    <div className="information-page">
      <div className="input-container">
        <h3>About The Algorithms:</h3>

        {dropdowns.map((dropdown, index) => (
          <React.Fragment key={dropdown.id}>
            {index === 4 && <h3>The Heuristic Algorithms:</h3>}
            <div className="dropdown">
              <div 
                className={`dropdown-header ${activeDropdown === dropdown.id ? 'active' : ''}`}
                onClick={() => toggleDropdown(dropdown.id)}
              >
                <h4>{dropdown.title}</h4>
                <FaChevronDown className={`chevron-icon ${activeDropdown === dropdown.id ? 'rotated' : ''}`} />
              </div>
              <div className={`dropdown-content ${activeDropdown === dropdown.id ? 'active' : ''}`}>
                <p>{dropdown.content}</p>
                <MathJax.Context input="tex">
                  <MathJax.Text text={dropdown.latex} />
                </MathJax.Context>
              </div>
            </div>
          </React.Fragment>
        ))}

        <Link to="/AlgorithmsPage" className="try-it-out-button">
          Try It Out!
        </Link>
      </div>
    </div>
  );
}

export default Information;