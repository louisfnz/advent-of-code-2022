import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getStacks = (input: string) => {
  const rows = input.split('\n\n')[0].split('\n');

  return rows.slice(0, rows.length - 1).reduce((stacks, row) => {
    for (let i = 0; i < row.length; i++) {
      if (!/\w/.test(row[i])) continue;
      const s = Math.floor(i / 4);
      if (!stacks[s]) stacks[s] = [];
      stacks[s].push(row[i]);
    }
    return stacks;
  }, [] as string[][]);
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

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
