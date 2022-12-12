import {part2, part1} from './index';

const input = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`;

const answerPart1 = 88;
const answerPart2 = 36;

describe('Day 9', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
