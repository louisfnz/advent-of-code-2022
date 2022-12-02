import {part2, part1} from './index';

const exampleInputOne = `
A Y
B X
C Z
`;

const expectedAnswerPart1 = 15;
const expectedAnswerPart2 = 12;

describe('Day 2', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(exampleInputOne);
    expect(result).toEqual(expectedAnswerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(exampleInputOne);
    expect(result).toEqual(expectedAnswerPart2);
  });
});
