

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
    modifierUpToOne: boolean;
    modifierUpToTwo: boolean;
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

interface Source {
    abbreviation: string;
    name: string;
}

//interface used for autocomplete
interface BaseItem {
    id: string | null;
    name: string;
}

interface Sourceable extends BaseItem {
    source: Source;
}


interface AutocompleteParams {
    amount: number;
    defaults: BaseItem[];
}
interface CharacterSheet {
    id: number | null;
    basicInfo: BasicInfo;
    race: Race;
    background: Background;
    abilityScores: AbilityScore[];
    characterClass: Class;
}

const formDefaults  = {
        basicInfo: {
            characterName: 'New Character Name',
            playerName: 'Player Name',
            sources: [],
            sheetPhoto: "",
            cardPhoto: "",
        } as BasicInfo,
        race: {
            id: null,
            name: "",
            languageProficiencies: {
                amount: 0,
                defaults: []
            },
            description: "",
            speed: 0,
            features: [],
            sizeOptions: []
        } as Race,
        background: {
            id: null,
            name: "",
            features: [],
            description: "",
            languageProficiencies: {
                amount: 0,
                defaults: []
            },
            toolProficiencies: {
                amount: 0,
                defaults: []
            }
        } as Background,
        abilityScores: [
            {
                label: Ability.STRENGTH,
                score: 8,
                modifierUpToOne: false,
                modifierUpToTwo: false
            },
            {
                label: Ability.DEXTERITY,
                score: 8,
                modifierUpToOne: false,
                modifierUpToTwo: false
            },
            {
                label: Ability.CONSTITUTION,
                score: 8,
                modifierUpToOne: false,
                modifierUpToTwo: false
            },
            {
                label: Ability.INTELLIGENCE,
                score: 8,
                modifierUpToOne: false,
                modifierUpToTwo: false
            },
            {
                label: Ability.WISDOM,
                score: 8,
                modifierUpToOne: false,
                modifierUpToTwo: false
            },
            {
                label: Ability.CHARISMA,
                score: 8,
                modifierUpToOne: false,
                modifierUpToTwo: false
            }
        ] as AbilityScore[],
        characterClass: {
            id: null,
            name: "",
            description: "",
            hitDice: "",
            features: [],
            subclasses: [""],
            toolProficiencies: {
                amount: 0,
                defaults: []
            }
        } as Class,
} as CharacterSheet


export type {Race, BaseItem as AutocompleteItem, Background, AbilityScore, AutocompleteParams, Feature, BasicInfo, CharacterSheet, Class, Source, Sourceable}
export {Ability, Size, formDefaults}