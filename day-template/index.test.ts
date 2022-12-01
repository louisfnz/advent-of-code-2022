import {part2, part1} from './index';

// Stick the example in the problem description here:
const exampleInputOne = `
Example input value 1
Example input value 2
Example input value 3
Example input value 4
Example input value 5
`.trim();

// ... and the example answers from the problem description here:
const expectedAnswerPart1 = 15;
const expectedAnswerPart2 = 120;

describe('Day 1', () => {
  it('Calculates part 1 correctly', () => {
    const result1 = part1(exampleInputOne);
    expect(result1).toEqual(expectedAnswerPart1);
  });

  it('Calculates part 2 correctly', () => {
    const result1 = part2(exampleInputOne);
    expect(result1).toEqual(expectedAnswerPart2);
  });
});
