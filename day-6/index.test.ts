import {part2, part1} from './index';

const exampleInputOne = `
mjqjpqmgbljsphdztnvjfqwrcgsmlb
`;

const expectedAnswerPart1 = 7;
const expectedAnswerPart2 = 19;

describe('Day 6', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(exampleInputOne);
    expect(result).toEqual(expectedAnswerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(exampleInputOne);
    expect(result).toEqual(expectedAnswerPart2);
  });
});
