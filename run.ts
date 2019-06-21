
// node

import * as fs from "fs";
import {Word, WordList, isValidWord, wordIssues} from "./word";
import { mnemonic } from "./mnemonic";


function standardNewlines(s: string): string {
    return s.replace(/\r/gm, "");
}

function readFile(path: string): string {
    return standardNewlines(fs.readFileSync(path, "utf-8"));
}

function readFileJson<T>(path: string): T {
    const data: string = readFile(path);
    const object: T = JSON.parse(data);
    return object;
}

function run(wordFilePath: string, adjectiveTag: string, nounTag: string, runs: number) {
    // read words

    console.log(`read: ${wordFilePath}`);

    const words = readFileJson<WordList>(wordFilePath);

    // validate words
    const invalidWords = words.filter((word: Word) => !isValidWord(word));


    if (invalidWords.length > 0) {

        console.log(`Invalid Words: [ ${invalidWords.length} ]/[ ${words.length} ]`);
        invalidWords.forEach((word) => {
            console.log(word);
            console.log(wordIssues(word));
        });
        
        throw "invalid words are present";
    }


    // console.log(invalidWords);

    for(let i =0; i < runs; i++) {
        const generated = mnemonic(words, adjectiveTag, nounTag);
        console.log(generated);
    }
}

const wordFilePath = "./words.json";
const adjectiveTag = "color";
const nounTag = "animal";
const runs = 10;
run(wordFilePath, adjectiveTag, nounTag, runs);