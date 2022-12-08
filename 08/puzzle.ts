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
  type Max = {
    position: number;
    value: number;
  };

  const rowMax: Max[] = [];
  const colMax: Max[] = [];

  let bestPositionValue = 0;

  const split = input.split("\n").map((line) => line.split("").map(Number));

  for (let i = 0; i < split.length; i++) {
    for (let j = 0; j < split[i].length; j++) {
      if (i > 0 && i < split.length - 1 && j > 0 && j < split[i].length - 1) {
        const tree = split[i][j];

        const rightBlockingTreeValue = split[i].slice(j + 1, split[i].length)
          .find(
            (value) => value >= tree,
          ) ?? -1;

        const rightBlockingTreePosition = split[i].slice(j + 1, split[i].length)
          .indexOf(rightBlockingTreeValue);

        const rightBlockingTree: Max = {
          value: rightBlockingTreeValue,
          position: rightBlockingTreePosition === -1
            ? -1
            : rightBlockingTreePosition + j + 1,
        };

        const bottomBlockingTreeValue = split.map((row) => row[j]).slice(
          i + 1,
          split.length,
        ).find((value) => value >= tree) ?? -1;

        const bottomBlockingTreePosition = split.map((row) => row[j]).slice(
          i + 1,
          split.length,
        )
          .indexOf(
            bottomBlockingTreeValue,
          );

        const bottomBlockingTree: Max = {
          value: bottomBlockingTreeValue,
          position: bottomBlockingTreePosition == -1
            ? -1
            : bottomBlockingTreePosition + i + 1,
        };

        const rightScore = rightBlockingTree.value !== -1
          ? rightBlockingTree.position - j
          : split[i].length - 1 - j;

        const bottomScore = bottomBlockingTree.value !== -1
          ? bottomBlockingTree.position - i
          : split.length - 1 - i;

        const topScore = colMax[j].value >= tree ? i - colMax[j].position : i;

        const leftScore = rowMax[i].value >= tree ? j - rowMax[i].position : j;

        const totalScore = rightScore * bottomScore * topScore * leftScore;

        if (totalScore > bestPositionValue) {
          bestPositionValue = totalScore;
        }
      }

      if (split[i][j] >= rowMax[i]?.value || rowMax[i]?.value === undefined) {
        rowMax[i] = { position: j, value: split[i][j] }; // this is wrong
      }

      if (split[i][j] >= colMax[j]?.value || colMax[j]?.value === undefined) {
        colMax[j] = { position: i, value: split[i][j] }; // also wrong, but worked with input
      }
    }
  }

  return bestPositionValue;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
