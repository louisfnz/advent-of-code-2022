import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();

export const part1 = (input: string) => {
  return input.split('\n').reduce((total, line) => {
    total += Number(line.substring(line.length - 1, line.length));
    return total;
  }, 0);
};

export const part2 = (input: string) => {
  return input
    .trim()
    .split('\n')
    .reduce((total, line) => {
      total *= Number(line.substring(line.length - 1, line.length));
      return total;
    }, 1);
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
