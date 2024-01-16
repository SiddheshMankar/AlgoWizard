import getNeighbors from "./getNeighbors";

const aStar = (grid, startNode, finishNode) => {
    const openSet = [startNode];
    const visitedNodesInOrder = [];
    startNode.distance = 0;

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.distance + a.heuristic - (b.distance + b.heuristic));
      const currentNode = openSet.shift();

      if (currentNode === finishNode) {
        return visitedNodesInOrder;
      }

      if (!currentNode.isVisited) {
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
          if (neighbor.isWall) continue; // Skip walls
          const tentativeDistance = currentNode.distance + 1;
          if (tentativeDistance < neighbor.distance) {
            neighbor.distance = tentativeDistance;
            neighbor.previousNode = currentNode;
            if (!openSet.includes(neighbor)) {
              openSet.push(neighbor);
            }
          }
        }
      }
    }

    return visitedNodesInOrder;
  };
  
 

  export default aStar