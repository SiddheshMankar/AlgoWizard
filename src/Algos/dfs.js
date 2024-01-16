import getNeighbors from "./getNeighbors";

const dfs = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    dfsUtil(startNode, visitedNodesInOrder, grid, finishNode);
    return visitedNodesInOrder;
  };

  const dfsUtil = (currentNode, visitedNodesInOrder, grid, finishNode) => {
    visitedNodesInOrder.push(currentNode);
    currentNode.isVisited = true;

    if (currentNode === finishNode) {
      return true;
    }

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.previousNode = currentNode;
        const reachedFinish = dfsUtil(
          neighbor,
          visitedNodesInOrder,
          grid,
          finishNode
        );
        if (reachedFinish) {
          return true;
        }
      }
    }

    return false;
  };

  export default dfs;
