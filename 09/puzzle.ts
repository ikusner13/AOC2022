const isAdjacent = (head: number[], tail: number[]) => {
  return Math.abs(
        head[0] - tail[0],
      ) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
};

export const part1 = (input: string) => {
  const start = [0, 0];

  const headPointer = [...start];
  const tailPointer = [...start];

  const directions = input.split("\n");

  const visited = new Set<string>();

  for (const direction of directions) {
    const heading = direction.split(" ")[0];
    const distance = parseInt(direction.split(" ")[1]);

    for (let i = 0; i < distance; i++) {
      const oldHeadPointer = [...headPointer];
      switch (heading) {
        case "U":
          headPointer[0]--;
          break;
        case "D":
          headPointer[0]++;
          break;
        case "L":
          headPointer[1]--;
          break;
        case "R":
          headPointer[1]++;
          break;
        default:
          break;
      }

      if (!isAdjacent(headPointer, tailPointer)) {
        tailPointer[0] = oldHeadPointer[0];
        tailPointer[1] = oldHeadPointer[1];

        visited.add(
          `${tailPointer[0]}-${tailPointer[1]}`,
        );
      }
    }
  }

  return visited.size + 1;
};

export const part2 = (input: string) => {
  const knots = Array.from({ length: 10 }, () => [0, 0]);

  const directions = input.split("\n");

  const visited = new Set<string>();

  for (const direction of directions) {
    const heading = direction.split(" ")[0];
    const distance = parseInt(direction.split(" ")[1]);

    for (let i = 0; i < distance; i++) {
      switch (heading) {
        case "U":
          knots[0][1] = knots[0][1] + 1;
          break;
        case "D":
          knots[0][1] = knots[0][1] - 1;
          break;
        case "L":
          knots[0][0] = knots[0][0] - 1;
          break;
        case "R":
          knots[0][0] = knots[0][0] + 1;
          break;
        default:
          break;
      }

      for (let j = 1; j < knots.length; j++) {
        if (!isAdjacent(knots[j - 1], knots[j])) {
          if (knots[j - 1][0] > knots[j][0]) {
            knots[j][0] = knots[j][0] + 1;
          }

          if (knots[j - 1][0] < knots[j][0]) {
            knots[j][0] = knots[j][0] - 1;
          }

          if (knots[j - 1][1] > knots[j][1]) {
            knots[j][1] = knots[j][1] + 1;
          }

          if (knots[j - 1][1] < knots[j][1]) {
            knots[j][1] = knots[j][1] - 1;
          }

          if (j === knots.length - 1) {
            visited.add(
              `${knots[j][0]}-${knots[j][1]}`,
            );
          }
        }
      }
    }
  }

  return visited.size + 1;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
