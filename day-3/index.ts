import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getPoints = (letter: string) =>
  letter.toLowerCase() === letter ? letter.charCodeAt(0) - 96 : letter.charCodeAt(0) - 38;

export const part1 = (input: string) => {
  const rucksacks = input.trim().split('\n');

  let total = 0;

  for (const rucksack of rucksacks) {
    const items1 = rucksack.slice(0, rucksack.length / 2).split('');
    const items2 = rucksack.slice(rucksack.length / 2, rucksack.length).split('');
    const letter = items1.filter((item) => items2.includes(item))[0];

    total += getPoints(letter);
  }

  return total;
};

export const part2 = (input: string) => {
  const rucksacks = input.trim().split('\n');

  let group: string[][] = [];
  let total = 0;
  let count = 1;

  for (const rucksack of rucksacks) {
    group.push(rucksack.split(''));

    if (count % 3 === 0) {
      const letter = group.shift()?.filter((a) => group.every((b) => b.includes(a)))[0] as string;
      total += getPoints(letter);
      group = [];
    }

    count++;
  }

  return total;
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
