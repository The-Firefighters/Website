import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Latex from 'react-latex'
import './Information.css';

function Information() {
  const [activeDropdowns, setActiveDropdowns] = useState({});

const SpreadingMaxsaveCode = `$$
\\begin{algorithm}[H]
\\SetAlgoLined
\\KwIn{Graph $G(V,E)$, source node $s$, target set $T \\subseteq V$}
\\KwOut{The approximated minimal budget $B$}
Perform a binary search on the target group $T$\\;
Run the MaxSave algorithm on the parameters of the problem with the budget $B$ that we found in the binary search\\;
Match the budget $B$ so that it is minimal but still able to save all nodes of $T$\\;
\\Return{$B$}
\\caption{($\\ln n$)-approx algorithm}
\\end{algorithm}
$$`;

  const toggleDropdown = (id) => {
    setActiveDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatContent = (content) => {
    return content.split(/([.:])/).map((part, index) => 
      index % 2 === 0 ? part : <React.Fragment key={index}>{part}<br /></React.Fragment>
    );
  };

  const dropdowns = [
    {
      id: 'Spreading-Maxsave',
      title: 'Spreading MaxSave',
      content: "content",
      latex: SpreadingMaxsaveCode
    },
    {
      id: 'Spreading-Minbudget',
      title: 'Spreading Minbudget',
      content: "In the Spreading MinBudget algorithm, the MinBudget problem is as hard as a set-cover. There is a set-cover of size B if and only if there is a vaccination strategy immunizing at most B nodes per time step. Therefore the algrotithm will be: ",
      latex: ""
    },
    {
      id: 'NonSpreading-Minbudget',
      title: 'Non-Spreading Minbudget',
      content:"For the Non-Spreading Minbudget algorithm, the article considers the following equivalent problem: We create a new node t and edges from all nodes in T (the target node's group) to t, and consider the problem of saving t with the minimum budget, under the additional constraint that t itself cannot be vaccinated. Call s the source and t the sink. Therefore the algorithm will be:",
      latex: ""
    },
    {
      id: 'NonSpreading-Dirlay-Minbudget',
      title: 'Non-Spreading Dirlay Minbudget',
      content: ".", 
      latex: ""
    },
    {
      id: 'Heuristic-Maxsave',
      title: 'Heuristic Maxsave',
      content: ".",
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
                className={`dropdown-header ${activeDropdowns[dropdown.id] ? 'active' : ''}`}
                onClick={() => toggleDropdown(dropdown.id)}
              >
              <h4>{dropdown.title}</h4>
              </div>
              <div className={`dropdown-content ${activeDropdowns[dropdown.id] ? 'active' : ''}`}>
                <p>{formatContent(dropdown.content)}</p>
                <Latex>{dropdown.latex}</Latex>
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