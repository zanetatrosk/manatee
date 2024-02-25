import { B } from "msw/lib/glossary-de6278a9";
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
    sheetPhotoUrl: string | null;
    cardPhotoUrl: string | null;
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
    levelMinimum?: number;
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
    class: BaseItem;
    background: BaseItem;
}

export interface Armor extends Sourceable {
    type: string;
    baseArmorClass: number;
    strengthRequirement: number;
    stealthDisadvantage: boolean;
    description: string;
}

export interface Damage {
    amount: number;
    sides: number;
    notation: string;
    demageType: string;
}

export interface Weapon extends Sourceable {
    type: string;
    range: number;
    properties: string[];
    damageType: string;
    damage: Damage;
}

export interface Slot {
    level: number;
    count: number;
}
export interface Spell extends Sourceable {
    level: number;
    school: string;
    castingTime: string;
    range: string;
    duration: string;
    description: string;
    higherLevel: string;
}

interface Spellcasting {
    ability: Ability;
    modifier: number;
    saveDc: number;
    slots: Slot[];
    spells: Spell[];
}

interface ProficienciesSheet<T extends Sourceable>{
    item: T;
    from: string;
} 

interface BaseSkill {
    label: string;
    modifier: number;
    proficient: boolean;
}

interface Skill extends BaseSkill {
    ability: Ability;
    displayName: string;
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

interface Proficiencies {
    tools: string[];
    languages: string[];
    weapons: string[];
    armor: string[];
}

interface CharacterSheet {
    id: string;
    info: SheetHeaderInfo;
    stats: Stats;
    abilities: AbilitySheet[];
    skills: Skill[];
    savingThrows: BaseSkill[];
    tools: ProficienciesSheet<ToolsProficiency>[];
    languages: ProficienciesSheet<LanguagesProficiency>[];
    features: Feature[];
    spellcasting?: Spellcasting;
    armor: Armor;
    weapons: Weapon[];
    proficiencies: Proficiencies;
}

//-----end with character sheet interfaces

const characterSheetDefaults: CharacterSheet = {
    id: "",
    info: {
        characterName: "Character Name",
        playerName: "Player name",
        sources: [],
        sheetPhotoUrl: "",
        cardPhotoUrl: "",
        subclass: "Assasin",
        level: 1,
        class: {
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
            notation: "5d8"
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
            label: "Acrobatics",
            modifier: 0,
            proficient: false,
            ability: Ability.DEXTERITY,
            displayName: "Acrobatics"
        },
        {
            label: "Animal Handling",
            modifier: 0,
            proficient: false,
            ability: Ability.WISDOM,
            displayName: "Animal Handling"
        },
        {
            label: "Arcana",
            modifier: 0,
            proficient: false,
            ability: Ability.INTELLIGENCE,
            displayName: "Arcana"
        },
        {
            label: "Athletics",
            modifier: 0,
            proficient: false,
            ability: Ability.STRENGTH,
            displayName: "Athletics"
        },
        {
            label: "Deception",
            modifier: 0,
            proficient: false,
            ability: Ability.CHARISMA,
            displayName: "Deception"
        },
        {
            label: "History",
            modifier: 0,
            proficient: false,
            ability: Ability.INTELLIGENCE,
            displayName: "History"
        },
        {
            label: "Insight",
            modifier: 0,
            proficient: false,
            ability: Ability.WISDOM,
            displayName: "Insight"
        },
        {
            label: "Intimidation",
            modifier: 0,
            proficient: false,
            ability: Ability.CHARISMA,
            displayName: "Intimidation"
        },
        {
            label: "Investigation",
            modifier: 0,
            proficient: false,
            ability: Ability.INTELLIGENCE,
            displayName: "Investigation"
        },
        {
            label: "Medicine",
            modifier: 0,
            proficient: false,
            ability: Ability.WISDOM,
            displayName: "Medicine"
        },
        {
            label: "Nature",
            modifier: 0,
            proficient: false,
            ability: Ability.INTELLIGENCE,
            displayName: "Nature"
        },
        {
            label: "Perception",
            modifier: 0,
            proficient: false,
            ability: Ability.WISDOM,
            displayName: "Perception"
        },
        {
            label: "Performance",
            modifier: 0,
            proficient: false,
            ability: Ability.CHARISMA,
            displayName: "Performance"
        },
        {
            label: "Persuasion",
            modifier: 0,
            proficient: false,
            ability: Ability.CHARISMA,
            displayName: "Persuasion"
        },
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
    features: [],
    armor: {
        id: "",
        name: "",
        type: "",
        baseArmorClass: 0,
        strengthRequirement: 0,
        stealthDisadvantage: false,
        description: "",
        source: {
            id: "",
            name: ""
        }
    },
    weapons: [],
    proficiencies: {
        tools: [],
        languages: [],
        weapons: [],
        armor: []
    },
    

}


export type {Race, BaseItem as AutocompleteItem, Background, AbilityScore, AutocompleteParams, Feature, BasicInfo, CharacterSheet, Class, Source, Sourceable, Spellcasting}
export {Ability, Size, characterSheetDefaults}