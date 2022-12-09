const isAdjacent = (head: number[], tail: number[]) => {
  return Math.abs(
        head[0] - tail[0],
      ) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
};

const updateAndCheckVisited = (
  visited: Set<string>,
  tailPointer: number[],
  oldHeadPointer: number[],
) => {
  tailPointer[0] = oldHeadPointer[0];
  tailPointer[1] = oldHeadPointer[1];

  if (!visited.has(`${tailPointer[0]}-${tailPointer[1]}`)) {
    visited.add(
      `${tailPointer[0]}-${tailPointer[1]}`,
    );
  }
};

export const part1 = (input: string) => {
  const start = [500, 0];

  const headPointer = [...start];
  const tailPointer = [...start];

  const directions = input.split("\n");

  const visited = new Set<string>();

  for (const direction of directions) {
    const heading = direction.split(" ")[0];
    const distance = parseInt(direction.split(" ")[1]);

    switch (heading) {
      case "U":
        for (let i = 0; i < distance; i++) {
          const headPointerOld = [...headPointer];
          headPointer[0]--;

          if (!isAdjacent(headPointer, tailPointer)) {
            updateAndCheckVisited(visited, tailPointer, headPointerOld);
          }
        }
        break;
      case "D":
        for (let i = 0; i < distance; i++) {
          const headPointerOld = [...headPointer];
          headPointer[0]++;

          if (!isAdjacent(headPointer, tailPointer)) {
            updateAndCheckVisited(visited, tailPointer, headPointerOld);
          }
        }
        break;
      case "L":
        for (let i = 0; i < distance; i++) {
          const headPointerOld = [...headPointer];
          headPointer[1]--;

          if (!isAdjacent(headPointer, tailPointer)) {
            updateAndCheckVisited(visited, tailPointer, headPointerOld);
          }
        }
        break;
      case "R":
        for (let i = 0; i < distance; i++) {
          const headPointerOld = [...headPointer];
          headPointer[1]++;

          if (!isAdjacent(headPointer, tailPointer)) {
            updateAndCheckVisited(visited, tailPointer, headPointerOld);
          }
        }
        break;
      default:
        break;
    }
  }

  return visited.size + 1;
};

export const part2 = (input: string) => {
  return input.split("\n").length;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
