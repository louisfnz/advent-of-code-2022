import {readFileSync} from 'fs';

type Packet = Array<Packet | number> | number;

const input = readFileSync(__dirname + '/input.txt', 'utf-8').trim();

const comparePackets = (packet1: Packet, packet2: Packet): boolean | undefined => {
  if (typeof packet1 === 'number' && Array.isArray(packet2)) {
    return comparePackets([packet1], packet2);
  }

  if (typeof packet2 === 'number' && Array.isArray(packet1)) {
    return comparePackets(packet1, [packet2]);
  }

  if (typeof packet1 === 'number' && typeof packet2 === 'number') {
    if (packet1 < packet2) return true;
    if (packet1 > packet2) return false;
    return;
  }

  if (Array.isArray(packet1) && Array.isArray(packet2)) {
    let p = 0;
    while (p < Math.min(packet1.length, packet2.length)) {
      const compare = comparePackets(packet1[p], packet2[p]);
      if (compare !== undefined) return compare;
      p++;
    }

    if (packet1.length < packet2.length) {
      return true;
    }

    if (packet1.length > packet2.length) {
      return false;
    }
  }
};

export const part1 = (input: string) => {
  const packetPairs = input
    .trim()
    .split('\n\n')
    .map((pair) => pair.split('\n').map((p) => JSON.parse(p)));

  return packetPairs.reduce((result, [left, right], i) => {
    if (comparePackets(left, right)) result += i + 1;
    return result;
  }, 0);
};

export const part2 = (input: string) => {
  const divider1 = [[2]];
  const divider2 = [[6]];
  const packets = input
    .trim()
    .replaceAll('\n\n', '\n')
    .split('\n')
    .map((s) => JSON.parse(s))
    .concat([divider1, divider2]);

  packets.sort((a, b) => (comparePackets(a, b) ? -1 : 1));

  return (packets.indexOf(divider1) + 1) * (packets.indexOf(divider2) + 1);
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
