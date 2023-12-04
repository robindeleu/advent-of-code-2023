import * as fs from "fs";
import { Just, Maybe, Nothing } from "purify-ts";

const wordsToNumbers: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function readTextFile(filePath: string): Maybe<string> {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return Just(data);
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
    return Nothing;
  }
}

function getNumbersOutOfString(text: string): Maybe<number> {
  let matches = Maybe.fromNullable(text.match(/\d/g))
    .map((regex) => {
      const [firstItem, ...rest] = regex;
      const lastItem = Maybe.fromNullable(rest.pop()).orDefault(firstItem);
      return firstItem + lastItem;
    })
    .map(Number);
  return matches;
}

function getNumbersOutOfStringPart2(text: string): number {
  const nums = Array.from(
    text.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
  )
    .flat()
    .filter((v) => v !== "")
    .map((v) => wordsToNumbers[v] ?? v);
  return parseInt(nums[0] + nums[nums.length - 1]);
}

function iterateOverRawTextPart1(text: string): Array<number> {
  let stringArray = text.split("\r\n");
  let results: Array<number> = [];

  for (const line of stringArray) {
    getNumbersOutOfString(line).map((v) => {
      results.push(v);
    });
  }

  return results;
}

function makeSum(array: Array<number>): number {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum = sum + array[i];
  }
  return sum;
}

function iterateOverRawTextPart2(text: string): number {
  let stringArray = text.split("\r\n");
  return stringArray
    .map(getNumbersOutOfStringPart2)
    .reduce((acc, cur) => (acc += cur), 0);
}

function partTwo() {
  readTextFile("./input.txt").map(iterateOverRawTextPart2).map(console.log);
}

function partOne() {
  readTextFile("./input.txt")
    .map(iterateOverRawTextPart1)
    .map(makeSum)
    .map(console.log);
}

function main() {
  partOne();
  partTwo();
}

main();
