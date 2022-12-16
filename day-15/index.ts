import {readFileSync} from 'fs';

interface Position {
  sensor: [number, number];
  beacon: [number, number];
  range: number;
}

const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();

const manhattanDistance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

const getCoord = (str: string, replace: string) =>
  str
    .trim()
    .replace(replace, '')
    .split(',')
    .map((c) => Number(c.trim().replace(/^(x|y)=/g, ''))) as [number, number];

const getPositions = (input: string): Position[] => {
  return input
    .trim()
    .split('\n')
    .map((line) => {
      const split = line.split(':');
      const sensor = getCoord(split[0], 'Sensor at ');
      const beacon = getCoord(split[1], 'closest beacon is at ');
      return {
        sensor,
        beacon,
        range: manhattanDistance(sensor[0], sensor[1], beacon[0], beacon[1]),
      };
    });
};

export const part1 = (input: string) => {
  const positions = getPositions(input);
  const targetRow = require.main === module ? 2000000 : 10;
  const valid = new Set<number>();
  const beacons = new Set<number>();

  for (const item of positions) {
    if (item.beacon[1] === targetRow) {
      beacons.add(item.beacon[0]);
    }
  }

  for (const position of positions) {
    const lower = position.sensor[1] - position.range;
    const upper = position.sensor[1] + position.range;

    if (targetRow >= lower && targetRow <= upper) {
      const diff =
        targetRow <= position.sensor[1]
          ? position.sensor[1] - targetRow
          : targetRow - position.sensor[1];
      const fill = 1 + position.range * 2 - diff * 2;
      const start = position.sensor[0] - position.range + diff;
      for (let x = start; x < start + fill; x++) {
        if (!beacons.has(x)) {
          valid.add(x);
        }
      }
    }
  }

  return valid.size;
};

export const part2 = (input: string) => {
  const positions = getPositions(input);
  const range = require.main === module ? 4000000 : 20;

  for (let y = 0; y < range; y++) {
    let x = 0;
    while (x < range) {
      const furthestRange = positions.reduce((fr, position) => {
        const distance = manhattanDistance(position.sensor[0], position.sensor[1], x, y);
        if (distance <= position.range) {
          fr = Math.max(fr, position.sensor[0] + position.range - Math.abs(position.sensor[1] - y));
        }
        return fr;
      }, Number.MIN_SAFE_INTEGER);

      if (furthestRange > Number.MIN_SAFE_INTEGER) {
        x = 1 + furthestRange;
        continue;
      }

      return x * 4000000 + y;
    }
  }
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
