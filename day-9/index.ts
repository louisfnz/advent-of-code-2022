import {readFileSync} from 'fs';

type Direction = 'U' | 'R' | 'D' | 'L';
type Vector = [number, number];

const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();

const getDirections = (input: string) =>
  input
    .trim()
    .split('\n')
    .map((i) => {
      const split = i.split(' ');
      return [split[0], Number(split[1])] as [Direction, number];
    });

const shouldFollow = (front: Vector, back: Vector) => {
  return Math.abs(front[0] - back[0]) > 1 || Math.abs(front[1] - back[1]) > 1;
};

const directionVector = (dir: Direction): Vector => {
  if (dir[0] === 'U') return [0, -1];
  if (dir[0] === 'R') return [1, 0];
  if (dir[0] === 'D') return [0, 1];
  return [-1, 0];
};

const followVector = (front: Vector, back: Vector): Vector => {
  let [x, y] = [0, 0];
  if (front[0] > back[0]) x = 1;
  if (front[0] < back[0]) x = -1;
  if (front[1] > back[1]) y = 1;
  if (front[1] < back[1]) y = -1;
  return [x, y];
};

export const part1 = (input: string) => {
  const directions = getDirections(input);
  const tailVisited = new Set<string>(['0,0']);

  let headPos: Vector = [0, 0];
  let tailPos: Vector = [0, 0];

  for (const [direction, steps] of directions) {
    const vector = directionVector(direction);

    for (let i = 1; i <= steps; i++) {
      headPos = [headPos[0] + vector[0], headPos[1] + vector[1]];

      if (shouldFollow(headPos, tailPos)) {
        const fv = followVector(headPos, tailPos);
        tailPos = [tailPos[0] + fv[0], tailPos[1] + fv[1]];
        tailVisited.add(`${tailPos[0]},${tailPos[1]}`);
      }
    }
  }

  return tailVisited.size;
};

export const part2 = (input: string) => {
  const directions = getDirections(input);
  const tailVisited = new Set<string>(['0,0']);
  const tails: Vector[] = [];

  let headPos: Vector = [0, 0];

  for (const [direction, steps] of directions) {
    const vector = directionVector(direction);

    for (let i = 1; i <= steps; i++) {
      headPos = [headPos[0] + vector[0], headPos[1] + vector[1]];

      for (let t = 0; t < 9; t++) {
        if (!tails[t]) tails[t] = [0, 0];
        const front = t === 0 ? headPos : tails[t - 1];
        const back = tails[t];

        if (shouldFollow(front, back)) {
          const fv = followVector(front, back);
          tails[t] = [tails[t][0] + fv[0], tails[t][1] + fv[1]];
          if (t === 8) tailVisited.add(`${tails[t][0]},${tails[t][1]}`);
        } else {
          break;
        }
      }
    }
  }

  return tailVisited.size;
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
