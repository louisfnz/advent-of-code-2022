import {part2, part1} from './index';

const exampleInputOne = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`.trim();

const expectedAnswerPart1 = 24000;
const expectedAnswerPart2 = 45000;

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
