import {part2, part1} from './index';

const input = `
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
`;

const answerPart1 = 24000;
const answerPart2 = 45000;

describe('Day 1', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
