import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();

const getGrid = (input: string) => {
  return input
    .trim()
    .split('\n')
    .map((row) => row.split('').map(Number));
};

const onEdge = (x: number, y: number, grid: number[][]) =>
  y === 0 || x === 0 || y === grid.length - 1 || x === grid[0].length - 1;

const checkLeft = (x: number, y: number, grid: number[][]) => {
  let checkX = x - 1;
  let visible = true;
  let score = 0;
  while (checkX >= 0) {
    score++;
    if (grid[y][checkX] >= grid[y][x]) {
      visible = false;
      break;
    }
    checkX--;
  }
  return {visible, score};
};

const checkUp = (x: number, y: number, grid: number[][]) => {
  let checkY = y - 1;
  let visible = true;
  let score = 0;
  while (checkY >= 0) {
    score++;
    if (grid[checkY][x] >= grid[y][x]) {
      visible = false;
      break;
    }
    checkY--;
  }
  return {visible, score};
};

const checkRight = (x: number, y: number, grid: number[][]) => {
  let checkX = x + 1;
  let visible = true;
  let score = 0;
  while (checkX < grid[0].length) {
    score++;
    if (grid[y][checkX] >= grid[y][x]) {
      visible = false;
      break;
    }
    checkX++;
  }
  return {visible, score};
};

const checkDown = (x: number, y: number, grid: number[][]) => {
  let checkY = y + 1;
  let visible = true;
  let score = 0;
  while (checkY < grid.length) {
    score++;
    if (grid[checkY][x] >= grid[y][x]) {
      visible = false;
      break;
    }
    checkY++;
  }
  return {visible, score};
};

export const part1 = (input: string) => {
  const grid = getGrid(input);
  let totalVisible = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (onEdge(x, y, grid)) {
        totalVisible++;
      } else {
        if (checkLeft(x, y, grid).visible) {
          totalVisible++;
          continue;
        }
        if (checkUp(x, y, grid).visible) {
          totalVisible++;
          continue;
        }
        if (checkRight(x, y, grid).visible) {
          totalVisible++;
          continue;
        }
        if (checkDown(x, y, grid).visible) {
          totalVisible++;
        }
      }
    }
  }

  return totalVisible;
};

export const part2 = (input: string) => {
  const grid = getGrid(input);
  let maxScore = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (!onEdge(x, y, grid)) {
        const left = checkLeft(x, y, grid).score;
        const up = checkUp(x, y, grid).score;
        const right = checkRight(x, y, grid).score;
        const down = checkDown(x, y, grid).score;
        maxScore = Math.max(maxScore, left * up * right * down);
      }
    }
  }

  return maxScore;
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
