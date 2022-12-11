import {readFileSync} from 'fs';

type Monkey = {
  items: number[];
  operation: string;
  divisibleBy: number;
  divisibleTrue: number;
  divisibleFalse: number;
  inspectionCount: number;
};

const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();

const getMonkeys = (input: string): Monkey[] =>
  input
    .trim()
    .split('\n\n')
    .map((s) => {
      const lines = s.trim().split('\n');
      return {
        items: lines[1]
          .replace('Starting items: ', '')
          .split(',')
          .map((i) => Number(i.trim())),
        operation: lines[2].replace('Operation: new = ', ''),
        divisibleBy: Number(lines[3].trim().replace('Test: divisible by ', '')),
        divisibleTrue: Number(lines[4].trim().replace('If true: throw to monkey ', '')),
        divisibleFalse: Number(lines[5].trim().replace('If false: throw to monkey ', '')),
        inspectionCount: 0,
      };
    });

const getResult = (monkeys: Monkey[]) => {
  monkeys.sort((a, b) => b.inspectionCount - a.inspectionCount);
  return monkeys[0].inspectionCount * monkeys[1].inspectionCount;
};

const throwItem = (monkeys: Monkey[], m: number, worryLevel: number) => {
  const throwTo =
    worryLevel % monkeys[m].divisibleBy === 0
      ? monkeys[m].divisibleTrue
      : monkeys[m].divisibleFalse;
  monkeys[throwTo].items.push(Number(worryLevel));
};

const getOperationResult = (monkeys: Monkey[], m: number) => {
  const item = monkeys[m].items.shift()?.toString() as string;
  return eval(monkeys[m].operation.replaceAll('old', item));
};

export const part1 = (input: string) => {
  const monkeys = getMonkeys(input);

  let round = 1;
  while (round <= 20) {
    for (let m = 0; m < monkeys.length; m++) {
      while (monkeys[m].items.length > 0) {
        const result = getOperationResult(monkeys, m);
        const worryLevel = Math.floor(result / 3);
        throwItem(monkeys, m, worryLevel);
        monkeys[m].inspectionCount++;
      }
    }
    round++;
  }

  return getResult(monkeys);
};

export const part2 = (input: string) => {
  const monkeys = getMonkeys(input);
  const primesProduct = monkeys.reduce((total, monkey) => total * monkey.divisibleBy, 1);

  let round = 1;
  while (round <= 10000) {
    for (let m = 0; m < monkeys.length; m++) {
      while (monkeys[m].items.length > 0) {
        const result = getOperationResult(monkeys, m);
        const worryLevel = result % primesProduct;
        throwItem(monkeys, m, worryLevel);
        monkeys[m].inspectionCount++;
      }
    }
    round++;
  }

  return getResult(monkeys);
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
