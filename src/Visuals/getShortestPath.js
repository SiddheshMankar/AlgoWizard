const getShortestPath = (finishNode) => {
    const shortestPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return shortestPath;
  };

  export default getShortestPath