interface Monkey {
  items: number[];
  operation: string;
  test: {
    case: string;
    true: number;
    false: number;
  };
  inspects: number;
}

const sampleMonkeys: Monkey[] = [
  {
    items: [79, 98],
    operation: "* 19",
    test: {
      case: "23",
      true: 2,
      false: 3,
    },
    inspects: 0,
  },
  {
    items: [54, 65, 75, 74],
    operation: "+ 6",
    test: {
      case: "19",
      true: 2,
      false: 0,
    },
    inspects: 0,
  },
  {
    items: [79, 60, 97],
    operation: "* old",
    test: {
      case: "13",
      true: 1,
      false: 3,
    },
    inspects: 0,
  },
  {
    items: [74],
    operation: "+ 3",
    test: {
      case: "17",
      true: 0,
      false: 1,
    },
    inspects: 0,
  },
];

const inputMonkeys: Monkey[] = [
  {
    items: [54, 53],
    operation: "* 3",
    test: {
      case: "2",
      true: 2,
      false: 6,
    },
    inspects: 0,
  },
  {
    items: [95, 88, 75, 81, 91, 67, 65, 84],
    operation: "* 11",
    test: {
      case: "7",
      true: 3,
      false: 4,
    },
    inspects: 0,
  },
  {
    items: [76, 81, 50, 93, 96, 81, 83],
    operation: "+ 6",
    test: {
      case: "3",
      true: 5,
      false: 1,
    },
    inspects: 0,
  },
  {
    items: [83, 85, 85, 63],
    operation: "+ 4",
    test: {
      case: "11",
      true: 7,
      false: 4,
    },
    inspects: 0,
  },
  {
    items: [85, 52, 64],
    operation: "+ 8",
    test: {
      case: "17",
      true: 0,
      false: 7,
    },
    inspects: 0,
  },
  {
    items: [57],
    operation: "+ 2",
    test: {
      case: "5",
      true: 1,
      false: 3,
    },
    inspects: 0,
  },
  {
    items: [60, 95, 76, 66, 91],
    operation: "* old",
    test: {
      case: "13",
      true: 2,
      false: 5,
    },
    inspects: 0,
  },
  {
    items: [65, 84, 76, 72, 79, 65],
    operation: "+ 5",
    test: {
      case: "19",
      true: 6,
      false: 0,
    },
    inspects: 0,
  },
];

export const part1 = (input: string) => {
  const monkeyRef = inputMonkeys;
  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeyRef) {
      for (const item of monkey.items) {
        monkey.inspects++;

        let op = monkey.operation;

        if (op === "* old") {
          op = "* " + item;
        }

        const itemWorryLevelAfterInspect = eval(
          `${item.toString()} ${op}`,
        );

        const boredWorryLevel = Math.floor(itemWorryLevelAfterInspect / 3);

        const test = boredWorryLevel % parseInt(monkey.test.case, 10) === 0;

        if (test) {
          monkeyRef[monkey.test.true].items.push(boredWorryLevel);
        } else {
          monkeyRef[monkey.test.false].items.push(boredWorryLevel);
        }

        monkey.items = monkey.items.filter((i) => i !== item);
      }
    }
  }

  return monkeyRef
    .map((monkey) => monkey.inspects)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b);
};

export const part2 = (input: string) => {
  return input.split("\n").length;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  // console.log("part2", part2(input));
};

import.meta.main && main();
