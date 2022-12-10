import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();

const getInstructions = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((s) => {
      const split = s.split(' ');
      return [split[0], split[1] ? Number(split[1]) : 0] as [string, number];
    });

export const part1 = (input: string) => {
  const instructions = getInstructions(input);
  const values: number[] = [];

  let x = 1;
  let cycle = 0;

  const maybeUpdateValues = () => {
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      values.push(x * cycle);
    }
  };

  for (const [op, value] of instructions) {
    cycle += 1;
    maybeUpdateValues();

    if (op === 'addx') {
      cycle += 1;
      maybeUpdateValues();
      x += value;
    }
  }

  return values.reduce((total, value) => total + value, 0);
};

export const part2 = (input: string) => {
  const instructions = getInstructions(input);
  const crt: string[][] = [];

  let x = 1;
  let cycle = 0;

  const drawPixel = () => {
    const r = Math.floor(cycle / 40);
    const p = cycle % 40;
    if (!crt[r]) crt[r] = [];
    crt[r][p] = [x - 1, x, x + 1].includes(p) ? '#' : '.';
  };

  for (const [op, value] of instructions) {
    drawPixel();
    cycle += 1;

    if (op === 'addx') {
      drawPixel();
      cycle += 1;
      x += value;
    }
  }

  return crt.map((line) => line.join(''));
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
