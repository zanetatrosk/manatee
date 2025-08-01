enum Ability {
  STRENGTH = "Strength",
  DEXTERITY = "Dexterity",
  CONSTITUTION = "Constitution",
  INTELLIGENCE = "Intelligence",
  WISDOM = "Wisdom",
  CHARISMA = "Charisma",
}

enum Size {
  SMALL = "Small",
  MEDIUM = "Medium",
  LARGE = "Large",
  HUGE = "Huge",
  GARGANTUAN = "Gargantuan",
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

interface Race extends Sourceable {
  description: string;
  features: Feature[];
  speed: number;
  sizeOptions: string[];
  //this will be enum
  abilityScorePlus2?: string[];
  abilityScorePlus1?: string[];
  //enum
  skillProficiencies?: AutocompleteParams<string>;
  languageProficiencies: AutocompleteParams<Sourceable>;
}

interface Class extends Sourceable {
  subclasses: string[];
  description: string;
  hitDice: string;
  features: Feature[];
  toolProficiencies: AutocompleteParams<Sourceable>;
}

interface Feature {
  title: string;
  text: string;
  levelMinimum: number;
}

//interface Background similar as Race
interface Background extends Sourceable {
  features: Feature[];
  description: string;
  languageProficiencies: AutocompleteParams<Sourceable>;
  toolProficiencies: AutocompleteParams<Sourceable>;
  skillProficiencies: AutocompleteParams<string>;
}

interface Source extends BaseItem {}

//interface used for autocomplete
interface BaseItem {
  id: string;
  name: string;
}

interface Sourceable extends BaseItem {
  source: Source;
}

interface AutocompleteParams<T> {
  amount: number;
  defaults: T[];
}

export type {
  Race,
  BaseItem,
  Background,
  AbilityScore,
  AutocompleteParams,
  Feature,
  BasicInfo,
  Class,
  Source,
  Sourceable,
};
export { Ability, Size };
