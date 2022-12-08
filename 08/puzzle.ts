export const part1 = (input: string) => {
  const rowMax: number[] = [];
  const colMax: number[] = [];

  let visibleTreesCount = 0;

  const split = input.split("\n").map((line) => line.split("").map(Number));

  for (let i = 0; i < split.length; i++) {
    for (let j = 0; j < split[i].length; j++) {
      if (i > 0 && i < split.length - 1 && j > 0 && j < split[i].length - 1) {
        const tree = split[i][j];

        const rightMax = Math.max(...split[i].slice(j + 1, split[i].length));
        const bottomMax = Math.max(
          ...split.map((row) => row[j]).slice(i + 1, split.length),
        );

        if (
          tree > rightMax || tree > bottomMax || tree > (rowMax[i] ?? -1) ||
          tree > (colMax[j] ?? -1)
        ) {
          visibleTreesCount++;
        }
      } else {
        visibleTreesCount++;
      }

      if (split[i][j] > rowMax[i] || rowMax[i] === undefined) {
        rowMax[i] = split[i][j];
      }

      if (split[i][j] > colMax[j] || colMax[j] === undefined) {
        colMax[j] = split[i][j];
      }
    }
  }

  return visibleTreesCount;
};

export const part2 = (input: string) => {
  return input.split("\n").length;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  // console.log("part2", part2(input));
};

import.meta.main && main();
