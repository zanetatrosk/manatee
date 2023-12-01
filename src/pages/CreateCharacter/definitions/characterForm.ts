


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
    sources: AutocompleteItem[];
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
    id: number | null;
    label: string;
    languages: AutocompleteParams;
    description: string;
    speed: number;
    features: Feature[];
    //this will be enum
    abilityScorePlus1?: string[];
    abilityScorePlus2?: string[];
    //enum
    sizeOptions: string[];
}
interface Class {
    id: number | null;
    label: string;
    subclass: AutocompleteItem;
    description: string;
    hitDice: string;
    features: Feature[];
    tools: AutocompleteParams;
}
interface Feature{
    title: string;
    text: string;
}
//interface Background similar as Race
interface Background {
    id: number | null;
    label: string;
    features: Feature[];
    description: string;
    languages: AutocompleteParams;
    tools: AutocompleteParams;
}
interface Source extends AutocompleteItem {}

//interface used for autocomplete
interface AutocompleteItem {
    id: number | null;
    title: string;
}
interface AutocompleteParams {
    amount: number;
    defaults: AutocompleteItem[];
}
interface CharacterSheet {
    id: number | null;
    basicInfo: BasicInfo;
    race: Race ;
    background: Background ;
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
            label: "",
            languages: {
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
            label: "",
            features: [],
            description: "",
            languages: {
                amount: 0,
                defaults: []
            },
            tools: {
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
            label: "",
            description: "",
            hitDice: "",
            features: [],
            subclass: {
                id: null,
                title: ""
            },
            tools: {
                amount: 0,
                defaults: []
            }
        } as Class,
} as CharacterSheet


export type {Race, AutocompleteItem, Background, AbilityScore, AutocompleteParams, Feature, BasicInfo, CharacterSheet, Class, Source}
export {Ability, Size, formDefaults}