import getNeighbors from "./getNeighbors";
const bfs = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    const queue = [];
    queue.push(startNode);
    startNode.isVisited = true;

    while (queue.length) {
      const currentNode = queue.shift();
      visitedNodesInOrder.push(currentNode);

      if (currentNode === finishNode) {
        return visitedNodesInOrder;
      }

      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          queue.push(neighbor);
          neighbor.isVisited = true;
          neighbor.previousNode = currentNode;
        }
      }
    }

    return visitedNodesInOrder;
  };

  export default bfs;