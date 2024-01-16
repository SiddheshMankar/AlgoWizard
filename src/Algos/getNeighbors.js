const ROWS = 15;
const COLS = 45;

const getNeighbors = (node, grid) => {
    const { col, row } = node;
    const neighbors = [];
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < ROWS - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < COLS - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
  };

export default getNeighbors;