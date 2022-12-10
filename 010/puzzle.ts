export const part1 = (input: string) => {
  const cpuInstructions = input.split("\n");

  let totalCycles = 1;
  let x = 1;

  let signalStrength = 0;

  for (
    const instruction of cpuInstructions
  ) {
    const [op, arg] = instruction.split(" ");

    if (op === "noop") {
      totalCycles++;

      if (
        totalCycles === 20 || totalCycles === 60 || totalCycles === 100 ||
        totalCycles === 140 || totalCycles === 180 || totalCycles === 220
      ) {
        signalStrength += totalCycles * x;
      }

      continue;
    }

    if (op === "addx") {
      totalCycles++;

      if (
        totalCycles === 20 || totalCycles === 60 || totalCycles === 100 ||
        totalCycles === 140 || totalCycles === 180 || totalCycles === 220
      ) {
        signalStrength += totalCycles * x;
      }

      totalCycles++;
      x += parseInt(arg);

      if (
        totalCycles === 20 || totalCycles === 60 || totalCycles === 100 ||
        totalCycles === 140 || totalCycles === 180 || totalCycles === 220
      ) {
        signalStrength += totalCycles * x;
      }
    }
  }

  return signalStrength;
};

export const part2 = (input: string) => {
  const cpuInstructions = input.split("\n");

  let totalCycles = 1;

  let spritePosition = 1;

  let output = "";

  for (
    let i = 0;
    i < cpuInstructions.length;
    i++
  ) {
    const [op, arg] = cpuInstructions[i].split(" ");
    let position = totalCycles % 40 - 1;
    // starting cycle 1

    if (op === "noop") {
      if (
        [spritePosition - 1, spritePosition, spritePosition + 1].includes(
          position,
        )
      ) {
        output += "#";
      } else {
        output += ".";
      }

      totalCycles++;
      position = totalCycles % 40 - 1;

      if (
        totalCycles - 1 === 40 || totalCycles - 1 === 80 ||
        totalCycles - 1 === 120 ||
        totalCycles - 1 === 160 || totalCycles - 1 === 200 ||
        totalCycles - 1 === 240
      ) {
        // spritePosition = 1;
        position = 0;
        output += "\n";
      }

      // after cycle 1
      continue;
    }

    if (op === "addx") {
      if (
        [spritePosition - 1, spritePosition, spritePosition + 1].includes(
          position,
        )
      ) {
        output += "#";
      } else {
        output += ".";
      }

      totalCycles++;
      position = totalCycles % 40 - 1;

      if (
        totalCycles - 1 === 40 || totalCycles - 1 === 80 ||
        totalCycles - 1 === 120 ||
        totalCycles - 1 === 160 || totalCycles - 1 === 200 ||
        totalCycles - 1 === 240
      ) {
        position = 0;
        output += "\n";
      }

      if (
        [spritePosition - 1, spritePosition, spritePosition + 1].includes(
          position,
        )
      ) {
        output += "#";
      } else {
        output += ".";
      }

      totalCycles++;
      position = totalCycles % 40 - 1;

      if (
        totalCycles - 1 === 40 || totalCycles - 1 === 80 ||
        totalCycles - 1 === 120 ||
        totalCycles - 1 === 160 || totalCycles - 1 === 200 ||
        totalCycles - 1 === 240
      ) {
        position = 0;
        output += "\n";
      }

      spritePosition += parseInt(arg);
    }
  }

  return "\n" + output;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  // console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
