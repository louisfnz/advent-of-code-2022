import {part2, part1} from './index';

const input = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

const answerPart1 = 31;
const answerPart2 = 29;

describe('Day 12', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
