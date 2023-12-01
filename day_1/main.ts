import * as fs from "fs";
import { Just, Maybe, Nothing } from "purify-ts";

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

function iterateOverRawText(text: string): Array<number> {
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

function partOne() {
  readTextFile("./input.txt")
    .map(iterateOverRawText)
    .map(makeSum)
    .map(console.log);
}

function main() {
  partOne();
}

main();
