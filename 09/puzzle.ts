export const part1 = (input: string) => {
  const start = [500, 0];

  const headPointer = [...start];
  const tailPointer = [...start];

  const directions = input.split("\n");

  let visitedCount = 1;

  const visited = new Set();

  for (const direction of directions) {
    const heading = direction.split(" ")[0];
    const distance = parseInt(direction.split(" ")[1]);

    switch (heading) {
      case "U":
        for (let i = 0; i < distance; i++) {
          const headPointerOld = [...headPointer];

          headPointer[0]--;
          const isTailPointerAdjacent = Math.abs(
                headPointer[0] - tailPointer[0],
              ) <= 1 && Math.abs(headPointer[1] - tailPointer[1]) <= 1;

          if (!isTailPointerAdjacent) {
            tailPointer[0] = headPointerOld[0];
            tailPointer[1] = headPointerOld[1];

            if (!visited.has(`${tailPointer[0]}-${tailPointer[1]}`)) {
              visited.add(
                `${tailPointer[0]}-${tailPointer[1]}`,
              );
              visitedCount++;
            }
          }
        }
        break;
      case "D":
        for (let i = 0; i < distance; i++) {
          const headPointerOld = [...headPointer];
          headPointer[0]++;
          const isTailPointerAdjacent = Math.abs(
                headPointer[0] - tailPointer[0],
              ) <= 1 && Math.abs(headPointer[1] - tailPointer[1]) <= 1;

          if (!isTailPointerAdjacent) {
            tailPointer[0] = headPointerOld[0];
            tailPointer[1] = headPointerOld[1];

            if (!visited.has(`${tailPointer[0]}-${tailPointer[1]}`)) {
              visited.add(
                `${tailPointer[0]}-${tailPointer[1]}`,
              );
              visitedCount++;
            }
          }
        }
        break;
      case "L":
        for (let i = 0; i < distance; i++) {
          const headPointerOld = [...headPointer];
          headPointer[1]--;

          const isTailPointerAdjacent = Math.abs(
                headPointer[0] - tailPointer[0],
              ) <= 1 && Math.abs(headPointer[1] - tailPointer[1]) <= 1;

          if (!isTailPointerAdjacent) {
            tailPointer[0] = headPointerOld[0];
            tailPointer[1] = headPointerOld[1];

            if (!visited.has(`${tailPointer[0]}-${tailPointer[1]}`)) {
              visited.add(
                `${tailPointer[0]}-${tailPointer[1]}`,
              );
              visitedCount++;
            }
          }
        }
        break;
      case "R":
        for (let i = 0; i < distance; i++) {
          const headPointerOld = [...headPointer];
          headPointer[1]++;

          const isTailPointerAdjacent = Math.abs(
                headPointer[0] - tailPointer[0],
              ) <= 1 && Math.abs(headPointer[1] - tailPointer[1]) <= 1;

          if (!isTailPointerAdjacent) {
            tailPointer[0] = headPointerOld[0];
            tailPointer[1] = headPointerOld[1];

            if (!visited.has(`${tailPointer[0]}-${tailPointer[1]}`)) {
              visited.add(
                `${tailPointer[0]}-${tailPointer[1]}`,
              );
              visitedCount++;
            }
          }
        }
        break;
      default:
        break;
    }
  }

  return visitedCount;
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
