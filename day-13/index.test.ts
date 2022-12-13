import {part2, part1} from './index';

const input = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`;

const answerPart1 = 13;
const answerPart2 = 140;

describe('Day 13', () => {
  it('Calculates part 1 correctly', () => {
    const result = part1(input);
    expect(result).toEqual(answerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result = part2(input);
    expect(result).toEqual(answerPart2);
  });
});
