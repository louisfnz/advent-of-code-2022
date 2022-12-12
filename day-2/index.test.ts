import {part2, part1} from './index';

const input = `
A Y
B X
C Z
`;

const answerPart1 = 15;
const answerPart2 = 12;

describe('Day 2', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
