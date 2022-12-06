import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();

const elfCaloriesSorted = (input: string) =>
  input
    .split('\n\n')
    .reduce(
      (total, elf) =>
        total.concat([elf.split('\n').reduce((total, line) => total + Number(line), 0)]),
      [] as number[],
    )
    .sort((a, b) => b - a);

export const part1 = (input: string) => elfCaloriesSorted(input)[0];

export const part2 = (input: string) =>
  elfCaloriesSorted(input)
    .slice(0, 3)
    .reduce((total, elf) => total + elf, 0);

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
