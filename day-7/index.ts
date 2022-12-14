import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const parentDir = (dir: string) => {
  if (dir === '/') return '';
  if (/^\/[^/]+$/.test(dir)) return '/';
  const dirs = dir.split('/');
  return dirs.slice(0, dirs.length - 1).join('/');
};

const dirPath = (dir: string, currentDir: string | null) =>
  currentDir === '/' ? currentDir + dir : currentDir + '/' + dir;

const directorySizes = (lines: string[]) => {
  const dirs: Record<string, number> = {
    '/': 0,
  };
  let currentDir = '';
  for (const line of lines) {
    if (line === '$ cd ..') {
      currentDir = parentDir(currentDir);
    } else if (line.startsWith('$ cd ')) {
      currentDir = dirPath(line.replace('$ cd ', ''), currentDir);
    } else if (line.startsWith('dir ')) {
      const dir = dirPath(line.replace('dir ', ''), currentDir);
      dirs[dir] = 0;
    } else if (/^\d+.+$/.test(line)) {
      const fileSize = Number(line.split(' ')[0]);
      let dir = currentDir;
      while (dir) {
        dirs[dir] += fileSize;
        dir = parentDir(dir);
      }
    }
  }
  return dirs;
};

export const part1 = (input: string) => {
  const fs = directorySizes(input.trim().split('\n'));

  return Object.values(fs).reduce((total, size) => (size < 100000 ? total + size : total), 0);
};

export const part2 = (input: string) => {
  const fs = directorySizes(input.trim().split('\n'));
  const required = 30000000 - (70000000 - fs['/']);

  return Object.values(fs).reduce(
    (min, size) => (size > required && size < min ? size : min),
    Number.MAX_SAFE_INTEGER,
  );
};

if (require.main === module) {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
