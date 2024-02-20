import { LanguagesProficiency, ToolsProficiency } from "./stepperForm";


enum Ability {  
    STRENGTH = "Strength",
    DEXTERITY = "Dexterity",
    CONSTITUTION = "Constitution",
    INTELLIGENCE = "Intelligence",
    WISDOM = "Wisdom",
    CHARISMA = "Charisma"
}

enum Size {
    SMALL = "Small",
    MEDIUM = "Medium",
    LARGE = "Large",
    HUGE = "Huge",
    GARGANTUAN = "Gargantuan"
}


interface BasicInfo {
    characterName: string;
    playerName: string;
    sources: Source[];
    sheetPhoto: string | null;
    cardPhoto: string | null;
}

interface AbilityScore {
    label: string;
    score: number;
    upByOne: boolean;
    upByTwo: boolean;
}


interface AbilitySheet extends AbilityScore {
    result: number;
    modifier: number;
}
    


interface Race {
    id: string | null;
    name: string;
    source?: any;
    description: string;
    features: Feature[];
    speed: number;
    sizeOptions: string[];
    //this will be enum
    abilityScorePlus2?: string[];
    abilityScorePlus1?: string[];
    //enum
    skillProficiencies?: AutocompleteParams;
    languageProficiencies: AutocompleteParams;
}

interface Class {
    id: string | null;
    name: string;
    subclasses: string[];
    description: string;
    hitDice: string;
    features: Feature[];
    toolProficiencies: AutocompleteParams;
}

interface Feature{
    title: string;
    text: string;
}

//interface Background similar as Race
interface Background {
    id: string | null;
    name: string;
    features: Feature[];
    description: string;
    languageProficiencies: AutocompleteParams;
    toolProficiencies: AutocompleteParams;
}

interface Source extends BaseItem {
}

//interface used for autocomplete
interface BaseItem {
    id: string;
    name: string;
}

interface Sourceable extends BaseItem {
    source: Source;
}



interface AutocompleteParams {
    amount: number;
    defaults: BaseItem[];
}


//-----begin with character sheet interfaces

interface SheetHeaderInfo extends BasicInfo {
    subclass: string;
    level: number;
    race: BaseItem;
    dndClass: BaseItem;
    background: BaseItem;
}



interface ProficienciesSheet<T extends Sourceable>{
    item: T;
    from: string;
} 

interface Skill {
    label: string;
    modifier: number;
    proficient: boolean;
}

interface Stats {
    speed: number;
    initiative: number;
    proficiencyBonus: number;
    hitDice: {
        amount: number;
        sides: number;
        notation: string;
    };
    hitPoints: number;
    armorClass: number;
}

interface CharacterSheet {
    id: string;
    info: SheetHeaderInfo;
    stats: Stats;
    abilities: AbilitySheet[];
    skills: Skill[];
    savingThrows: Skill[];
    tools: ProficienciesSheet<ToolsProficiency>[];
    languages: ProficienciesSheet<LanguagesProficiency>[];
    features: Feature[];
}

//-----end with character sheet interfaces

const characterSheetDefaults: CharacterSheet = {
    id: "",
    info: {
        characterName: "Character Name",
        playerName: "Player name",
        sources: [],
        sheetPhoto: "",
        cardPhoto: "",
        subclass: "Assasin",
        level: 1,
        dndClass: {
            id: "",
            name: "Barbarian"
        },
        background: {
            id: "",
            name: "Acolyte"
        },
        race: {
            id: "",
            name: "Human"
        }
    },
    stats: {
        speed: 0,
        initiative: 0,
        proficiencyBonus: 0,
        hitDice: {
            amount: 0,
            sides: 0,
            notation: ""
        },
        hitPoints: 0,
        armorClass: 0
    },
    abilities: [
        {
            label: Ability.STRENGTH,
            score: 0,
            upByOne: false,
            upByTwo: false,
            result: 0,
            modifier: 0
        },
        {
            label: Ability.DEXTERITY,
            score: 0,
            upByOne: false,
            upByTwo: false,
            result: 0,
            modifier: 0
        },
        {
            label: Ability.CONSTITUTION,
            score: 0,
            upByOne: false,
            upByTwo: false,
            result: 0,
            modifier: 0
        },
        {
            label: Ability.INTELLIGENCE,
            score: 0,
            upByOne: false,
            upByTwo: false,
            result: 0,
            modifier: 0
        },
        {
            label: Ability.WISDOM,
            score: 0,
            upByOne: false,
            upByTwo: false,
            result: 0,
            modifier: 0
        },
        {
            label: Ability.CHARISMA,
            score: 0,
            upByOne: false,
            upByTwo: false,
            result: 0,
            modifier: 0
        }  
    ],
    skills: [
        {
            label: "Animal Handling (Wis)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Arcana (Int)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Athletics (Str)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Deception (Cha)",
            modifier: 0,
            proficient: false
        },
        {
            label: "History (Int)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Insight (Wis)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Intimidation (Cha)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Investigation (Int)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Medicine (Wis)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Nature (Int)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Perception (Wis)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Performance (Cha)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Persuasion (Cha)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Religion (Int)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Sleight of Hand (Dex)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Stealth (Dex)",
            modifier: 0,
            proficient: false
        },
        {
            label: "Survival (Wis)",
            modifier: 0,
            proficient: false
        }
    ],
    savingThrows: [
        {
            label: "Strength",
            modifier: 0,
            proficient: false
        },
        {
            label: "Dexterity",
            modifier: 0,
            proficient: false
        },
        {
            label: "Constitution",
            modifier: 0,
            proficient: false
        },
        {
            label: "Intelligence",
            modifier: 0,
            proficient: false
        },
        {
            label: "Wisdom",
            modifier: 0,
            proficient: false
        },
        {
            label: "Charisma",
            modifier: 0,
            proficient: false
        }
    ],
    tools: [],
    languages: [],
    features: []

}


export type {Race, BaseItem as AutocompleteItem, Background, AbilityScore, AutocompleteParams, Feature, BasicInfo, CharacterSheet, Class, Source, Sourceable}
export {Ability, Size, characterSheetDefaults}