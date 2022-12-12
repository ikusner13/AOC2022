const sample = [
  "Sabqponm",
  "abcryxxl",
  "accszExk",
  "acctuvwj",
  "abdefghi",
];

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

export const part1 = () => {
  const queue: QueueItem[] = [{
    x: 0,
    y: 0,
    path: [
      { x: 0, y: 0 },
    ],
  }];

  const visited = new Set<string>();

  let endPath: Path[] = [];

  while (queue.length) {
    console.log("visited", visited);
    console.log("queue", queue.map((item) => `${item.x},${item.y}`));
    // console.log("queue", queue.map((item) => `${item.x},${item.y}`));
    const { x, y, path } = queue.shift()!;
    // console.log("x", x, "y", y);
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

    if (x < 7) {
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

    if (y < 4) {
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

    console.log(
      "directionsToCheck",
      directionsToCheck.map((item) => `${item.x},${item.y}`),
    );

    for (const direction of directionsToCheck) {
      const nextChar = sample[direction.y][direction.x];
      const currentChar = sample[y][x];

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
        endPath = [...direction.path];
        console.log(endPath);
        return endPath.length - 1;
      }

      if (
        alphabet.indexOf(nextChar) - alphabet.indexOf(currentChar) === 1 ||
        alphabet.indexOf(nextChar) -
              alphabet.indexOf(currentChar) === 0
      ) {
        queue.push(direction);
      }

      queue.sort((a, b) => {
        return a.path.length - b.path.length;
      });
    }

    console.log("queue - after", queue.map((item) => `${item.x},${item.y}`));

    visited.add(`${x},${y}`);
    console.log("\n");
  }
};

export const part2 = (input: string) => {
  return input.split("\n").length;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1());
  // console.log("part2", part2(input));
};

import.meta.main && main();
