import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const hasUniqueChars = (s: string) => new Set(s).size === s.length;

const findMarker = (s: string, length: number) => {
  for (let i = length - 1; i < s.length; i++) {
    if (hasUniqueChars(s.slice(i - (length - 1), i + 1))) {
      return i + 1;
    }
  }
};

export const part1 = (input: string) => findMarker(input.trim(), 4);
export const part2 = (input: string) => findMarker(input.trim(), 14);

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
