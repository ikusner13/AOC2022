// / - [b.txt, c.dat, a, d]
// a - [f, g,h.lst, e]
// e - [i]
// d - [j,d.log, d.ext,k]

export const part1 = (input: string) => {
  const directories = new Map<string, string[]>();
  const split = input.split("\n");

  const path = [];

  for (let i = 0; i < split.length; i++) {
    const line = split[i];

    if (line[0] === "$") {
      const args = split[i].split(" ");
      if (args[1] === "cd" && args[2] !== "..") {
        path.push(args[2]);
        directories.set(path.join("/"), []);
      } else if (args[1] === "cd" && args[2] === "..") {
        path.pop();
      }
    } else {
      const s = line.split(" ");

      if (s[0] === "dir") {
        directories.set(
          path.join("/"),
          [
            ...(directories.get(path.join("/")) ?? []),
            `${path.join("/")}/${s[1]}`,
          ],
        );
      } else {
        directories.set(
          path.join("/"),
          [...(directories.get(path.join("/")) ?? []), s[0]],
        );
      }
    }
  }

  const sumDir = (dir: string): number => {
    const total = directories.get(dir)?.reduce((acc, curr) => {
      if (!isNaN(Number(curr))) {
        return acc + Number(curr);
      }

      return acc + sumDir(curr);
    }, 0)!;

    return total;
  };

  const sums = [];

  for (let entry of directories) {
    const sum = sumDir(entry[0]);
    sums.push(sum);
  }

  return sums.reduce((acc, curr) => {
    if (curr > 100_000) {
      return acc;
    }
    return acc + curr;
  }, 0);
};

export const part2 = (input: string) => {
  const directories = new Map<string, string[]>();
  const split = input.split("\n");

  const path = [];

  for (let i = 0; i < split.length; i++) {
    const line = split[i];

    if (line[0] === "$") {
      const args = split[i].split(" ");
      if (args[1] === "cd" && args[2] !== "..") {
        path.push(args[2]);
        directories.set(path.join("/"), []);
      } else if (args[1] === "cd" && args[2] === "..") {
        path.pop();
      }
    } else {
      const s = line.split(" ");

      if (s[0] === "dir") {
        directories.set(
          path.join("/"),
          [
            ...(directories.get(path.join("/")) ?? []),
            `${path.join("/")}/${s[1]}`,
          ],
        );
      } else {
        directories.set(
          path.join("/"),
          [...(directories.get(path.join("/")) ?? []), s[0]],
        );
      }
    }
  }

  const sumDir = (dir: string): number => {
    const total = directories.get(dir)?.reduce((acc, curr) => {
      if (!isNaN(Number(curr))) {
        return acc + Number(curr);
      }

      return acc + sumDir(curr);
    }, 0)!;

    return total;
  };

  const sums = [];

  for (let entry of directories) {
    const sum = sumDir(entry[0]);
    sums.push(sum);
    sums.sort((a, b) => b - a);
  }

  const root = sums[0];
  const unused = 70_000_000 - root;
  const needed = 30_000_000 - unused;

  for (let i = sums.length - 1; i > 0; i--) {
    if (sums[i] > needed) {
      return sums[i];
    }
  }
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  // console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
