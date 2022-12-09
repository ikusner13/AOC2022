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

const horizontallyAdjacent = (head: number[], tail: number[]) => {
  if (head[0] === tail[0] && head[1] === tail[1]) {
    return true;
  }

  const adj = Math.abs(head[1] - tail[1]) <= 1 && head[0] === tail[0];

  return adj;
};

const verticallyAdjacent = (head: number[], tail: number[]) => {
  if (head[0] === tail[0] && head[1] === tail[1]) {
    return true;
  }

  return Math.abs(head[0] - tail[0]) <= 1 && head[1] === tail[1];
};

const diagnallyAdjacent = (head: number[], tail: number[]) => {
  return Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
};

export const part2 = (input: string) => {
  const knots = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  const directions = input.split("\n");

  const visited = new Set<string>();

  for (const direction of directions) {
    const heading = direction.split(" ")[0];
    const distance = parseInt(direction.split(" ")[1]);

    console.log("heading", heading, "distance", distance);

    switch (heading) {
      case "U":
        for (let i = 0; i < distance; i++) {
          knots[0][0] = knots[0][0] - 1;

          for (let i = 1; i < knots.length; i++) {
            if (
              !verticallyAdjacent(knots[i - 1], knots[i]) &&
              knots[i - 1][1] === knots[i][1]
            ) {
              knots[i][0] = knots[i][0] - 1;
            }

            if (
              !verticallyAdjacent(knots[i - 1], knots[i]) &&
              knots[i - 1][1] !== knots[i][1]
            ) {
              if (diagnallyAdjacent(knots[i - 1], knots[i])) {
                break;
              }
              knots[i][0] = knots[i][0] - 1;

              if (knots[i - 1][1] > knots[i][1]) {
                knots[i][1] = knots[i][1] + 1;
              } else {
                knots[i][1] = knots[i][1] - 1;
              }
            }
          }
        }

        break;
      case "D":
        for (let i = 0; i < distance; i++) {
        }
        break;
      case "L":
        for (let i = 0; i < distance; i++) {
        }
        break;
      case "R":
        for (let i = 0; i < distance; i++) {
          knots[0][1] = knots[0][1] + 1;

          for (let i = 1; i < knots.length; i++) {
            if (
              !horizontallyAdjacent(knots[i - 1], knots[i]) &&
              knots[i - 1][0] === knots[i][0]
            ) {
              knots[i][1] = knots[i][1] + 1;
            }

            if (
              !horizontallyAdjacent(knots[i - 1], knots[i]) &&
              knots[i - 1][0] !== knots[i][0]
            ) {
              knots[i][1] = knots[i][1] + 1;

              if (knots[i - 1][0] > knots[i][0]) {
                knots[i][0] = knots[i][0] - 1;
              } else {
                knots[i][0] = knots[i][0] + 1;
              }
            }
          }
        }
        break;
      default:
        break;
    }

    console.log("knots", knots, "\n");
  }

  // console.log("knots", knots);

  return visited.size + 1;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  // console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
