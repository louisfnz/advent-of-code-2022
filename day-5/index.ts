import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getStacks = (input: string) => {
  const stacks = [] as string[][];
  const rows = input.split('\n\n')[0].split('\n');
  rows.pop();

  for (const row of rows) {
    let s = 0;
    for (let i = 0; i < row.length; i++) {
      if (i > 0 && i % 4 === 0) s = i / 4;
      if ([' ', '[', ']'].includes(row[i])) continue;
      if (!stacks[s]) stacks[s] = [];
      stacks[s].push(row[i]);
    }
  }

  return stacks;
};

const getMoves = (input: string) =>
  input
    .split('\n\n')[1]
    .trim()
    .split('\n')
    .map((move) =>
      move
        .replace(/^move (\d+) from (\d+) to (\d+)$/, '$1 $2 $3')
        .split(' ')
        .map(Number),
    );

const getTopCrates = (stacks: string[][]) =>
  stacks.reduce((result, stack) => result + stack.shift(), '');

export const part1 = (input: string) => {
  const stacks = getStacks(input);
  const moves = getMoves(input);

  for (const move of moves) {
    const [qty, from, to] = move;

    for (let i = 0; i < qty; i++) {
      const crate = stacks[from - 1].shift();
      if (crate) stacks[to - 1].unshift(crate);
    }
  }

  return getTopCrates(stacks);
};

export const part2 = (input: string) => {
  const stacks = getStacks(input);
  const moves = getMoves(input);

  for (const move of moves) {
    const [qty, from, to] = move;
    const cratesToMove = [];

    for (let i = 0; i < qty; i++) {
      cratesToMove.push(stacks[from - 1].shift());
    }

    cratesToMove.reverse().forEach((crate) => {
      if (crate) stacks[to - 1].unshift(crate);
    });
  }

  return getTopCrates(stacks);
};

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
