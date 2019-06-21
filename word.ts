
export type WordType = "adjective" | "noun";

export interface Word {
    word: string;
    types: WordType[];
    tags: string[];
}

export type WordList = Word[];

// word type constants

const requiredPropertyTypes = [
    {name: "word", type: "string"},
    {name: "types", type: "object"},
    {name: "tags", type: "object"},
];

const requiredProperties = requiredPropertyTypes.map((property) => property.name);
const allowedWordTypes = ["adjective", "noun"];


/**
 * check that a word object exactly conforms to specification
 * @param word 
 */
export function isValidWord(word: Word): boolean {

    return word !== undefined 
        && word !== null
        && hasOwnProperties(word, requiredProperties) 
        && objectOwnPropertiesHaveSpecifiedTypes(word, requiredPropertyTypes)
        && !word.types.some((type) => !allowedWordTypes.includes(type)) // all types specified conform to specification
        && allArrayElementsAreType(word.tags, "string");
}

/**
 * debug function to find any issues in a words format
 * @param word 
 */
export function wordIssues(word: Word): string {

    if (word === undefined) {
        return "undefined";
    }

    if (word === null) {
        return "null";
    }

    if (!hasOwnProperties(word, requiredProperties)) {
        return "missing required property";
    }

    if (!objectOwnPropertiesHaveSpecifiedTypes(word, requiredPropertyTypes)) {
        return "required property has invalid type";
    }

    if (word.types.some((type) => !allowedWordTypes.includes(type))) {
        return "types can only be {adjective, noun}";
    }

    if (!allArrayElementsAreType(word.tags, "string")) {
        return "some tags are not strings";
    }

    return "";
}

/**
 * check that object has all properties specified
 * @param object 
 * @param properties 
 */
function hasOwnProperties(object: any, properties: string[]): boolean {
    return !properties.some((property: string) => !object.hasOwnProperty(property));
}

function objectOwnPropertyIsType(object: any, property: string, type: string): boolean {
    return object.hasOwnProperty(property) && typeof object[property] === type;
}

function objectOwnPropertiesHaveSpecifiedTypes(object: any, properties: {name: string, type: string}[]): boolean {
    return !properties.some((property) => !objectOwnPropertyIsType(object, property.name, property.type));
}

function allArrayElementsAreType(object: any[], type: string): boolean {
    return !object.some((value) => (typeof value) !== type);
}