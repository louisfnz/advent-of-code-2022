import {part2, part1} from './index';

const exampleInputOne = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

const expectedAnswerPart1 = 31;
const expectedAnswerPart2 = 29;

describe('Day 12', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(exampleInputOne);
    expect(result).toEqual(expectedAnswerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(exampleInputOne);
    expect(result).toEqual(expectedAnswerPart2);
  });
});
