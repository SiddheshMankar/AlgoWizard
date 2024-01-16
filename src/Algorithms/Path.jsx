import React, { useState, useEffect } from "react";
import "../Styles/Path.css";
import bfs from "../Algos/bfs.js";
import dfs from "../Algos/dfs";
import dijkstra from "../Algos/dijkstra";
import aStar from "../Algos/astar"


const ROWS = 15;
const COLS = 45;

const Node = ({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

const Path = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const [startRow, setStartRow] = useState(7);
  const [startCol, setStartCol] = useState(5);
  const [endRow, setendRow] = useState(7);
  const [endCol, setendCol] = useState(35);

  useEffect(() => {
    initializeGrid();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  


  const initializeGrid = () => {
    const grid = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < COLS; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    setGrid(grid);
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === startRow && col === startCol,
      isFinish: row === endRow && col === endCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const visualizeDijkstra = () => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    setInput()
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const node = grid[row][col];
        node.isVisited = false;
        node.previousNode = null;
      }
    }
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const shortestPath = getShortestPath(finishNode);
    animateDijkstra(visitedNodesInOrder, shortestPath);
  };

  const visualizeAlgorithm = (algorithm) => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    setInput()
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const node = grid[row][col];
        node.isVisited = false;
        node.previousNode = null;
      }
    }

    let visitedNodesInOrder = [];

    switch (algorithm) {
      case "bfs":
        visitedNodesInOrder = bfs(grid, startNode, finishNode);
        break;
      case "dfs":
        visitedNodesInOrder = dfs(grid, startNode, finishNode);
        break;
      default:
        break;
    }

    const shortestPath = getShortestPath(finishNode);
    animateAlgorithm(visitedNodesInOrder, shortestPath);
  };
  const animateAlgorithm = (visitedNodesInOrder, shortestPath) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node node-visited";
        }
      }, 10 * i);
    }
  };


  const getShortestPath = (finishNode) => {
    const shortestPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return shortestPath;
  };

  const animateDijkstra = (visitedNodesInOrder, shortestPath) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node node-visited";
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node node-shortest-path";
        }
      }, 50 * i);
    }
  };
  const visualizeAStar = () => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];

    // Reset the grid properties before each visualization
    setInput();

    // Calculate heuristic for each node in the grid
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const node = grid[row][col];
        node.distance = Infinity;
        node.isVisited = false;
        node.previousNode = null;
        node.heuristic = calculateHeuristic(node, finishNode);
      }
    }

    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    const shortestPath = getShortestPath(finishNode);
    animateAlgorithm(visitedNodesInOrder, shortestPath);
  };
  const calculateHeuristic = (node, finishNode) => {
    return Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col);
  };
  
  const reset =()=>{
    
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const node = grid[row][col];
        node.isVisited = false;
        node.isWall = false;
        node.previousNode = null;
      }
    }
    setInput()
  }
  const setstartRow = (newValue) => {
    const intValue = parseInt(newValue, 10);
    if (!isNaN(intValue) && intValue >= 0 && intValue < ROWS) {
      setStartRow(intValue);
    }
  };
  
  const setstartCol = (newValue) => {
    const intValue = parseInt(newValue, 10);
    if (!isNaN(intValue) && intValue >= 0 && intValue < COLS) {
      setStartCol(intValue);
    }
  };
  
  const setEndRow = (newValue) => {
    const intValue = parseInt(newValue, 10);
    if (!isNaN(intValue) && intValue >= 0 && intValue < ROWS) {
      setendRow(intValue);
    }
  };
  
  const setEndCol = (newValue) => {
    const intValue = parseInt(newValue, 10);
    if (!isNaN(intValue) && intValue >= 0 && intValue < COLS) {
      setendCol(intValue);
    }
  };
  
  const setInput = () => {
    // Reset the class names for start and end nodes
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const element = document.getElementById(`node-${i}-${j}`);
        if (element) {
          if (i === startRow && j === startCol) {
            element.className = "node node-start";
          } else if (i === endRow && j === endCol) {
            element.className = "node node-finish";
          } else {
            // Skip setting class for walls
            if (!grid[i][j].isWall) {
              element.className = "node";
            }
          }
        }
      }
    }
  };
  
  return (
    <div className="pathfinding">
      <h1 className="path">Path</h1>
      <div className="nodevalue">
        <div className="nodeStart">
          <label htmlFor=""> Start: </label>
          <input
            placeholder="Start Row"
            type="range"
            min="0" max="15"
            value={startRow}
            onChange={(e) => {setstartRow(e.target.value); setInput()}}
          />
          <input
            placeholder="Start Column"
            type="range"
            min="0" max="45"
            value={startCol}
            onChange={(e) => {setstartCol(e.target.value); setInput()}}
          />
        </div>
        <div className="nodeEnd">
          <label htmlFor="">End: </label>
          <input
            placeholder="End Row"
            type="range"
            min="0" max="15"
            value={endRow}
            onChange={(e) => {setEndRow(e.target.value); setInput() }}
          />
          <input
            placeholder="End Column"
            type="range"
            min="0" max="45"
            value={endCol}
            onChange={(e) => {setEndCol(e.target.value); setInput()}}
          />
        </div>
      </div>
      <button onClick={visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={() => visualizeAlgorithm("bfs")}>Visualize BFS</button>
      <button onClick={() => visualizeAlgorithm("dfs")}>Visualize DFS</button>
      <button onClick={() => visualizeAStar()}>Visualize A*</button>
      <button onClick={()=>reset()}>Reset</button>

      <div className="grid">
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid-row">
              {row.map((node, nodeIndex) => {
                const { row, col, isStart, isFinish, isWall } = node;
                return (
                  <Node
                    key={nodeIndex}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Path;
