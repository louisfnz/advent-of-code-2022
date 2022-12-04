import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getAssignments = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((s) => s.split(',').map((s) => s.split('-').map(Number)));

export const part1 = (input: string) =>
  getAssignments(input).reduce((acc, [part1, part2]) => {
    if (
      (part1[0] >= part2[0] && part1[1] <= part2[1]) ||
      (part2[0] >= part1[0] && part2[1] <= part1[1])
    ) {
      acc++;
    }

    return acc;
  }, 0);

export const part2 = (input: string) =>
  getAssignments(input).reduce((acc, [part1, part2]) => {
    if (
      (part1[0] <= part2[0] && part1[1] >= part2[0]) ||
      (part2[0] <= part1[0] && part2[1] >= part1[0])
    ) {
      acc++;
    }

    return acc;
  }, 0);

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
