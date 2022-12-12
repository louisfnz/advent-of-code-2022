import {readFileSync} from 'fs';

type Coordinate = [number, number];
type QueueItem = [Coordinate, number];

const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const getGrid = (input: string) => {
  return input
    .trim()
    .split('\n')
    .map((s) => s.split(''));
};

const findPath = (grid: string[][], queue: QueueItem[], end: Coordinate) => {
  const visited = new Set<string>();
  const addVisited = (x: number, y: number) => visited.add(`${x},${y}`);
  const hasVisited = (x: number, y: number) => visited.has(`${x},${y}`);
  const outOfBounds = (x: number, y: number) =>
    y >= grid.length || y < 0 || x >= grid[0].length || x < 0;

  while (queue.length) {
    const [[x, y], steps] = queue.shift() as QueueItem;
    if (x === end[0] && y === end[1]) return steps;
    if (hasVisited(x, y)) continue;

    for (const [dirX, dirY] of directions) {
      if (outOfBounds(x + dirX, y + dirY)) continue;
      const current = grid[y][x];
      const next = grid[y + dirY][x + dirX];
      const elevation = current === 'S' ? 'a'.charCodeAt(0) : current.charCodeAt(0);
      const nextElevation = next === 'E' ? 'z'.charCodeAt(0) : next.charCodeAt(0);

      if (nextElevation <= elevation + 1 && !hasVisited(x + dirX, y + dirY)) {
        queue.push([[x + dirX, y + dirY], steps + 1]);
      }
    }

    addVisited(x, y);
  }
};

export const part1 = (input: string) => {
  const grid = getGrid(input);
  const queue: QueueItem[] = [];

  let end: Coordinate = [-1, -1];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const char = grid[y][x];
      if (char === 'S') queue.push([[x, y], 0]);
      if (char === 'E') end = [x, y];
    }
  }

  return findPath(grid, queue, end);
};

export const part2 = (input: string) => {
  const grid = getGrid(input);
  const queue: QueueItem[] = [];

  let end: Coordinate = [-1, -1];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const char = grid[y][x];
      if (char === 'S' || char === 'a') queue.push([[x, y], 0]);
      if (char === 'E') end = [x, y];
    }
  }

  return findPath(grid, queue, end);
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
