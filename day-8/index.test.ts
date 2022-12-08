import {part2, part1} from './index';

const exampleInputOne = `
30373
25512
65332
33549
35390
`;

const expectedAnswerPart1 = 21;
const expectedAnswerPart2 = 8;

describe('Day 8', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(exampleInputOne);
    expect(result).toEqual(expectedAnswerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(exampleInputOne);
    expect(result).toEqual(expectedAnswerPart2);
  });
});
