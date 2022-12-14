import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();

const mapCave = (input: string) => {
  const baseMap: string[][] = [];
  for (let y = 0; y < 200; y++) {
    baseMap[y] = [];
    for (let x = 0; x < 1000; x++) {
      baseMap[y][x] = '.';
    }
  }

  return input
    .trim()
    .split('\n')
    .reduce(
      (map, line) => {
        const walls = line
          .replaceAll(' -> ', '#')
          .split('#')
          .map((s) => s.trim().split(',').map(Number));

        for (let w = 0; w < walls.length; w++) {
          if (walls[w + 1]) {
            const [startX, startY] = walls[w];
            const [endX, endY] = walls[w + 1];

            if (startX === endX) {
              const from = startY <= endY ? startY : endY;
              const to = endY >= startY ? endY : startY;

              for (let y = from; y <= to; y++) {
                if (!map[0][y]) map[0][y] = [];
                map[0][y][startX] = '#';
              }

              if (startY > map[1]) map[1] = startY;
            } else {
              if (!map[0][startY]) map[0][startY] = [];
              const from = startX <= endX ? startX : endX;
              const to = endX >= startX ? endX : startX;

              for (let x = from; x <= to; x++) {
                map[0][startY][x] = '#';
              }

              if (startY > map[1]) map[1] = startY;
            }
          }
        }

        return map;
      },
      [baseMap, 0] as [string[][], number],
    );
};

export const part1 = (input: string) => {
  const [map] = mapCave(input);
  let abyss = false;
  let totalSand = 0;

  while (!abyss) {
    let tile = [500, 0];
    while (true) {
      const look = map[tile[1] + 1]?.[tile[0]];
      if (!look) {
        abyss = true;
        break;
      }
      if (look === '.') {
        tile = [tile[0], tile[1] + 1];
      } else {
        if (map[tile[1] + 1][tile[0] - 1] === '.') {
          tile = [tile[0] - 1, tile[1] + 1];
        } else if (map[tile[1] + 1][tile[0] + 1] === '.') {
          tile = [tile[0] + 1, tile[1] + 1];
        } else {
          map[tile[1]][tile[0]] = 'o';
          totalSand++;
          break;
        }
      }
    }
  }

  return totalSand;
};

export const part2 = (input: string) => {
  const [map, lowestPoint] = mapCave(input);
  let totalSand = 0;

  for (let x = 0; x < map[0].length; x++) {
    map[lowestPoint + 2][x] = '#';
  }

  while (map[0][500] !== 'o') {
    let tile = [500, 0];
    while (true) {
      const look = map[tile[1] + 1]?.[tile[0]];

      if (look === '.') {
        tile = [tile[0], tile[1] + 1];
      } else {
        if (map[tile[1] + 1][tile[0] - 1] === '.') {
          tile = [tile[0] - 1, tile[1] + 1];
        } else if (map[tile[1] + 1][tile[0] + 1] === '.') {
          tile = [tile[0] + 1, tile[1] + 1];
        } else {
          map[tile[1]][tile[0]] = 'o';
          totalSand++;
          break;
        }
      }
    }
  }

  return totalSand;
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
