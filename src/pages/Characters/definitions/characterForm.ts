


enum Ability {  
    STRENGTH = "Strength",
    DEXTERITY = "Dexterity",
    CONSTITUTION = "Constitution",
    INTELLIGENCE = "Intelligence",
    WISDOM = "Wisdom",
    CHARISMA = "Charisma"
}

//write dnd sizes
// const Size = {
//     SMALL: 'Small',
//     MEDIUM: 'Medium',
//     LARGE: 'Large',
//     HUGE: 'Huge',
//     GARGANTUAN: 'Gargantuan'
// }
enum Size {
    SMALL = "Small",
    MEDIUM = "Medium",
    LARGE = "Large",
    HUGE = "Huge",
    GARGANTUAN = "Gargantuan"
}
interface AbilityScore {
    label: string;
    value: number;
    modifierUpToOne: boolean;
    modifierUpToTwo: boolean;
}
interface Race {
    id: number;
    label: string | null;
    languages: LanguageParams;
    description: string;
    speed: number;
    features: Feature[];
    //this will be enum
    abilityScorePlus1?: string[];
    abilityScorePlus2?: string[];
    //enum
    sizeOptions: string[];
}
interface Feature{
    title: string;
    text: string;
}
interface Background {
    id: number;
    label: string;
    languages: number[];
    tools: number[];
}
//interface used for autocomplete
interface AutocompleteItem {
    id: number;
    title: string;
}
interface LanguageParams {
    amount: number;
    defaults: AutocompleteItem[];
}
// class CharacterForm {
//     // basic information part
//     id: number | null;
//     characterName: string;
//     playerName: string;
//     aligment: string | null;
//     sheetPhoto: string | null;
//     cardPhoto: string | null;
//     //class part
//     //todo
//     //race part
//     race: string | null;
//     languagesRace: AutocompleteItem[];
//     size: string | null;
//     //ability scores part
//     abilityScores: AbilityScore[];
//     //background part
//     background: string | null;
//     tools: AutocompleteItem[];
//     languagesBackground: AutocompleteItem[];
// }

export type {Race, AutocompleteItem, Background, AbilityScore, LanguageParams, Feature}
export {Ability, Size}