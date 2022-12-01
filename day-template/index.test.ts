import {part2, part1} from './index';

const exampleInputOne = `
Example input value 1
Example input value 2
Example input value 3
Example input value 4
Example input value 5
`;

const expectedAnswerPart1 = 15;
const expectedAnswerPart2 = 120;

describe('Day 1', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(exampleInputOne);
    expect(result).toEqual(expectedAnswerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(exampleInputOne);
    expect(result).toEqual(expectedAnswerPart2);
  });
});
