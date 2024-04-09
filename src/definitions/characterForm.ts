
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
    sourceIds: string[];
    sheetPhotoUrl: string | null;
    cardPhotoUrl: string | null;
}

interface AbilityScore {
    label: string;
    score: number;
    upByOne: boolean;
    upByTwo: boolean;
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
    levelMinimum: number;
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

export type { Race, BaseItem, Background, AbilityScore, AutocompleteParams, Feature, BasicInfo, Class, Source, Sourceable }
export {Ability, Size}