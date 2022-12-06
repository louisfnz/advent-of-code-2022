import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

type ABC = 'A' | 'B' | 'C';
type XYZ = 'X' | 'Y' | 'Z';

const getGames = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(' ') as [ABC, XYZ]);

export const part1 = (input: string) => {
  const winners = {
    A: 'Z',
    B: 'X',
    C: 'Y',
    X: 'C',
    Y: 'A',
    Z: 'B',
  } as const;
  const scores = {
    X: 1,
    Y: 2,
    Z: 3,
  } as const;

  return getGames(input).reduce((total, game) => {
    if (winners[game[1]] === game[0]) {
      // Win
      total += 6 + scores[game[1]];
    } else if (winners[game[0]] === game[1]) {
      // Lose
      total += scores[game[1]];
    } else {
      // Draw
      total += 3 + scores[game[1]];
    }
    return total;
  }, 0);
};

export const part2 = (input: string) => {
  const winners = {
    A: 'B',
    B: 'C',
    C: 'A',
  } as const;
  const losers = {
    A: 'C',
    B: 'A',
    C: 'B',
  } as const;
  const scores = {
    A: 1,
    B: 2,
    C: 3,
  } as const;

  return getGames(input).reduce((total, game) => {
    if (game[1] === 'Z') {
      // Win
      total += 6 + scores[winners[game[0]]];
    } else if (game[1] === 'X') {
      // Lose
      total += scores[losers[game[0]]];
    } else {
      // Draw
      total += 3 + scores[game[0]];
    }
    return total;
  }, 0);
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
