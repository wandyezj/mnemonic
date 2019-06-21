import {Word, WordList, WordType} from "./word";


/**
 * create a 'adjective noun' phrase using words from the word list that have the specified tag or if a tag can not be found use undefined. 
 * 
 * @param words 
 * @param adjectiveTag 
 * @param nounTag 
 */
export function mnemonic(words: WordList, adjectiveTag: string, nounTag: string): string {

    const adjectives = wordsWithTypeAndTag(words, "adjective", adjectiveTag);
    const nouns = wordsWithTypeAndTag(words, "noun", nounTag);
 
    const adjective = getRandomWord(adjectives);
    const noun = getRandomWord(nouns);

    return `${adjective} ${noun}`;
}

function getRandomWord(words: WordList): string {
    return words.length === 0 ? "undefined" : words[getRandomWholeNumber(words.length)].word;
}

/**
 * get random whole number in range [0, maxExclusive) same as [0, maxExclusive - 1]
 * @param maxExclusive 
 */
function getRandomWholeNumber(maxExclusive: number): number {
    return Math.floor(Math.random() * maxExclusive);
}

function wordsWithTag(words: WordList, tag: string): WordList {
    return words.filter((word) => word.tags.includes(tag));
} 

function wordsWithType(words: WordList, type: WordType): WordList {
    return words.filter((word) => word.types.includes(type));
}

function wordsWithTypeAndTag(words: WordList, type: WordType, tag: string): WordList {
    const withTag = wordsWithTag(words, tag);
    return wordsWithType(withTag, type);
}