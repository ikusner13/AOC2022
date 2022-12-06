export const part1 = (input: string) => {
  const MESSAGE_LENGTH = 4;

  const set = new Set();
  let pointer = 1;
  let offset = 0;

  while (pointer < input.length) {
    set.add(input[pointer - 1 + offset]);

    if (pointer !== set.size) {
      pointer -= set.size;
      offset += 1;

      set.clear();
      continue;
    }

    if (set.size === MESSAGE_LENGTH) {
      break;
    }

    if (pointer % MESSAGE_LENGTH === 0) {
      set.clear();
      pointer = 1;
      offset += MESSAGE_LENGTH - 1;
    } else {
      pointer++;
    }
  }

  return pointer + offset;
};

export const part2 = (input: string) => {
  const MESSAGE_LENGTH = 14;

  const set = new Set();
  let pointer = 1;
  let offset = 0;

  while (pointer < input.length) {
    set.add(input[pointer - 1 + offset]);

    if (pointer !== set.size) {
      pointer -= set.size;
      offset += 1;

      set.clear();
      continue;
    }

    if (set.size === MESSAGE_LENGTH) {
      break;
    }

    if (pointer % MESSAGE_LENGTH === 0) {
      set.clear();
      pointer = 1;
      offset += MESSAGE_LENGTH - 1;
    } else {
      pointer++;
    }
  }

  return pointer + offset;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
