import React, { useState } from 'react';
import Searching from "./Algorithms/Searching"
import Sorting from "./Algorithms/Sorting"
// import Path from "./Algorithms/Path"
import './App.css';

const App = () => {
  const [activeOption, setActiveOption] = useState('pathfinder');

  const renderComponent = () => {
    switch (activeOption) {
      case 'searching':
        return <Searching />;
      case 'sorting':
        return <Sorting/>;
      // case 'pathfinder':
      //   return <Path />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <h1 className="app-header">Algo Viz</h1>
      <div className="options">
      {/* <button
          className={`option ${activeOption === 'pathfinder' ? 'active' : ''}`}
          onClick={() => setActiveOption('pathfinder')}
        >
          PathFinder
        </button> */}

        <button
          className={`option ${activeOption === 'searching' ? 'active' : ''}`}
          onClick={() => setActiveOption('searching')}
        >
          Searching
        </button>
        
        <button
          className={`option ${activeOption === 'sorting' ? 'active' : ''}`}
          onClick={() => setActiveOption('sorting')}
        >
          Sorting
        </button>
      </div>
      <div className="component-container">{renderComponent()}</div>
    </div>
  );
};

export default App;
