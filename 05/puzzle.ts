export const part1 = (input: string) => {
  const s = input.split("\n\n");

  const stack: string[][] = [];
  s[0].split("\n").slice(0, -1).reverse().forEach((r, index) => {
    if (index === 0) {
      r.split(" ").forEach((i) => stack.push([i]));
      return;
    }

    const s = r.split(" ");

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

    s.forEach((j, index) => {
      if (j !== "") {
        stack[index].push(j);
      }
    });
  });

  const instructions = s[1].split("\n").map((a) => {
    const r = a.split(" ");
    return {
      amount: Number(r[1]),
      start: Number(r[3]) - 1,
      destination: Number(r[5]) - 1,
    };
  });

  instructions.forEach((instruct) => {
    const amount = instruct.amount;
    const start = instruct.start;
    const dest = instruct.destination;

    const toTake = stack[start].splice(stack[start].length - amount, amount);

    toTake.reverse().forEach((t) => stack[dest].push(t));
  });

  let letters = "";
  stack.forEach((e) => letters += e[e.length - 1][1]);

  return letters;
};

export const part2 = (input: string) => {
  const s = input.split("\n\n");

  const stack: string[][] = [];
  s[0].split("\n").slice(0, -1).reverse().forEach((r, index) => {
    if (index === 0) {
      r.split(" ").forEach((i) => stack.push([i]));
      return;
    }

    const s = r.split(" ");

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

    s.forEach((j, index) => {
      if (j !== "") {
        stack[index].push(j);
      }
    });
  });

  const instructions = s[1].split("\n").map((a) => {
    const r = a.split(" ");
    return {
      amount: Number(r[1]),
      start: Number(r[3]) - 1,
      destination: Number(r[5]) - 1,
    };
  });

  instructions.forEach((instruct) => {
    const amount = instruct.amount;
    const start = instruct.start;
    const dest = instruct.destination;

    const toTake = stack[start].splice(stack[start].length - amount, amount);

    toTake.forEach((t) => stack[dest].push(t));
  });

  let letters = "";
  stack.forEach((e) => letters += e[e.length - 1][1]);

  return letters;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
