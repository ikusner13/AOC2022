const removeExtraSpaces = (s: string[]) => {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "") {
      count++;
    }

    if (s[i] !== "") {
      count = 0;
    }

    if (count === 3) {
      s.splice(i - 2, 3);
      i -= 3;
      count = 0;
    }
  }
};

const createStack = (s: string) => {
  const stack: string[][] = [];
  s.split("\n").slice(0, -1).reverse().forEach((r, index) => {
    const split = r.split(" ");

    if (index === 0) {
      split.forEach((i) => stack.push([i]));
      return;
    }

    removeExtraSpaces(split);

    split.forEach((j, index) => {
      if (j !== "") {
        stack[index].push(j);
      }
    });
  });

  return stack;
};

const createInstructions = (s: string) => {
  return s.split("\n").map((a) => {
    const r = a.split(" ");
    return {
      amount: Number(r[1]),
      start: Number(r[3]) - 1,
      destination: Number(r[5]) - 1,
    };
  });
};
export const part1 = (input: string) => {
  const s = input.split("\n\n");

  const stack = createStack(s[0]);
  const instructions = createInstructions(s[1]);

  instructions.forEach((instruct) => {
    stack[instruct.start].splice(
      stack[instruct.start].length - instruct.amount,
      instruct.amount,
    ).reverse().forEach((t) => stack[instruct.destination].push(t));
  });

  return stack.map((e) => e[e.length - 1][1]).join("");
};

export const part2 = (input: string) => {
  const s = input.split("\n\n");

  const stack = createStack(s[0]);
  const instructions = createInstructions(s[1]);

  instructions.forEach((instruct) => {
    stack[instruct.start].splice(
      stack[instruct.start].length - instruct.amount,
      instruct.amount,
    ).forEach((t) => stack[instruct.destination].push(t));
  });

  return stack.map((e) => e[e.length - 1][1]).join("");
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
