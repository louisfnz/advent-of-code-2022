import {part2, part1} from './index';

const input = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`;

const answerPart1 = 24;
const answerPart2 = 93;

describe('Day 14', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
