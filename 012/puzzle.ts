const alphabet = "abcdefghijklmnopqrstuvwxyz";

type Path = {
  x: number;
  y: number;
};

type QueueItem = {
  x: number;
  y: number;
  path: Path[];
};

const parseInput = (input: string) => {
  return input.split("\n");
};

export const part1 = (input: string) => {
  const parsed = parseInput(input);

  const startingRow = parsed.findIndex((row) => row.includes("S"));
  const startingCol = parsed[startingRow].indexOf("S");

  const queue: QueueItem[] = [{
    x: startingCol,
    y: startingRow,
    path: [
      { x: startingCol, y: startingRow },
    ],
  }];

  const visited = new Set<string>();

  while (queue.length) {
    const { x, y, path } = queue.shift()!;
    const directionsToCheck = [];

    if (x > 0) {
      if (
        !queue.find((item) =>
          item.x === x - 1 && item.y === y &&
          item.path.length === path.length + 1
        )
      ) {
        if (!visited.has(`${x - 1},${y}`)) {
          directionsToCheck.push({
            x: x - 1,
            y,
            path: [
              ...path,
              { x: x - 1, y },
            ],
          });
        }
      }
    }

    if (x < parsed[0].length - 1) {
      if (
        !queue.find((item) =>
          item.x === x + 1 && item.y === y &&
          item.path.length === path.length + 1
        )
      ) {
        if (!visited.has(`${x + 1},${y}`)) {
          directionsToCheck.push({
            x: x + 1,
            y,
            path: [
              ...path,
              { x: x + 1, y },
            ],
          });
        }
      }
    }

    if (y > 0) {
      if (
        !queue.find((item) =>
          item.x === x && item.y === y - 1 &&
          item.path.length === path.length + 1
        )
      ) {
        if (!visited.has(`${x},${y - 1}`)) {
          directionsToCheck.push({
            x,
            y: y - 1,
            path: [
              ...path,
              { x, y: y - 1 },
            ],
          });
        }
      }
    }

    if (y < parsed.length - 1) {
      if (
        !queue.find((item) =>
          item.x === x && item.y === y + 1 &&
          item.path.length === path.length + 1
        )
      ) {
        if (!visited.has(`${x},${y + 1}`)) {
          directionsToCheck.push({
            x,
            y: y + 1,
            path: [
              ...path,
              { x, y: y + 1 },
            ],
          });
        }
      }
    }

    for (const direction of directionsToCheck) {
      const nextChar = parsed[direction.y][direction.x];
      const currentChar = parsed[y][x];

      if (currentChar === "S") {
        const value = alphabet.indexOf("a");

        if (
          alphabet.indexOf(nextChar) - value === 1 ||
          alphabet.indexOf(nextChar) - value === 0
        ) {
          queue.push(direction);
          continue;
        }
      }

      if (nextChar === "E" && alphabet.indexOf(currentChar) === 25) {
        return path.length;
      }

      if (
        alphabet.indexOf(nextChar) - alphabet.indexOf(currentChar) === 1 ||
        alphabet.indexOf(nextChar) -
              alphabet.indexOf(currentChar) === 0 ||
        (alphabet.indexOf(nextChar) < alphabet.indexOf(currentChar) &&
          nextChar !== "E")
      ) {
        queue.push(direction);
      }

      queue.sort((a, b) => {
        return a.path.length - b.path.length;
      });
    }

    visited.add(`${x},${y}`);
  }
};

export const part2 = (input: string) => {
  const aStartingPoints: number[][] = [];
  const parsed = parseInput(input);

  parsed.forEach((row, y) => {
    row.split("").forEach((char, x) => {
      if (char === "S") {
        aStartingPoints.push([x, y]);
      }
      if (char === "a") {
        aStartingPoints.push([x, y]);
      }
    });
  });

  let smallestPath = -1;

  for (const [startingCol, startingRow] of aStartingPoints) {
    const queue: QueueItem[] = [{
      x: startingCol,
      y: startingRow,
      path: [
        { x: startingCol, y: startingRow },
      ],
    }];

    const visited = new Set<string>();

    while (queue.length) {
      const { x, y, path } = queue.shift()!;
      const directionsToCheck = [];

      if (x > 0) {
        if (
          !queue.find((item) =>
            item.x === x - 1 && item.y === y &&
            item.path.length === path.length + 1
          )
        ) {
          if (!visited.has(`${x - 1},${y}`)) {
            directionsToCheck.push({
              x: x - 1,
              y,
              path: [
                ...path,
                { x: x - 1, y },
              ],
            });
          }
        }
      }

      if (x < parsed[0].length - 1) {
        if (
          !queue.find((item) =>
            item.x === x + 1 && item.y === y &&
            item.path.length === path.length + 1
          )
        ) {
          if (!visited.has(`${x + 1},${y}`)) {
            directionsToCheck.push({
              x: x + 1,
              y,
              path: [
                ...path,
                { x: x + 1, y },
              ],
            });
          }
        }
      }

      if (y > 0) {
        if (
          !queue.find((item) =>
            item.x === x && item.y === y - 1 &&
            item.path.length === path.length + 1
          )
        ) {
          if (!visited.has(`${x},${y - 1}`)) {
            directionsToCheck.push({
              x,
              y: y - 1,
              path: [
                ...path,
                { x, y: y - 1 },
              ],
            });
          }
        }
      }

      if (y < parsed.length - 1) {
        if (
          !queue.find((item) =>
            item.x === x && item.y === y + 1 &&
            item.path.length === path.length + 1
          )
        ) {
          if (!visited.has(`${x},${y + 1}`)) {
            directionsToCheck.push({
              x,
              y: y + 1,
              path: [
                ...path,
                { x, y: y + 1 },
              ],
            });
          }
        }
      }

      for (const direction of directionsToCheck) {
        const nextChar = parsed[direction.y][direction.x];
        const currentChar = parsed[y][x];

        if (currentChar === "S") {
          const value = alphabet.indexOf("a");

          if (
            alphabet.indexOf(nextChar) - value === 1 ||
            alphabet.indexOf(nextChar) - value === 0
          ) {
            queue.push(direction);
            continue;
          }
        }

        if (nextChar === "S") {
          const value = alphabet.indexOf("a");

          if (
            value - alphabet.indexOf(currentChar) === 1 ||
            value - alphabet.indexOf(currentChar) === 0
          ) {
            queue.push(direction);
            continue;
          }
        }

        if (nextChar === "E" && alphabet.indexOf(currentChar) === 25) {
          if (smallestPath === -1) {
            smallestPath = path.length;
          } else {
            smallestPath = smallestPath < path.length
              ? smallestPath
              : path.length;
          }
          break;
        }

        if (
          alphabet.indexOf(nextChar) - alphabet.indexOf(currentChar) === 1 ||
          alphabet.indexOf(nextChar) -
                alphabet.indexOf(currentChar) === 0 ||
          (alphabet.indexOf(nextChar) < alphabet.indexOf(currentChar) &&
            nextChar !== "E")
        ) {
          queue.push(direction);
        }

        queue.sort((a, b) => {
          return a.path.length - b.path.length;
        });
      }

      visited.add(`${x},${y}`);
    }
  }

  return smallestPath;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
