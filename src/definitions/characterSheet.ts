import {
  Ability,
  AbilityScore,
  BaseItem,
  BasicInfo,
  Feature,
  Source,
  Sourceable,
} from "./characterForm";
import { ToolsProficiency, LanguagesProficiency } from "./stepperForm";

interface SheetHeaderInfo extends BasicInfo {
  subclass: string;
  size: string;
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

export interface Attack extends BaseItem {
  attackBonus: number;
  damage: string;
}

export interface Weapon extends Sourceable {
  type: string;
  range: number;
  properties: string[];
  damageType: string;
  damage: Damage;
}

export interface Pageable<T> {
  content: T[];
  totalElements: number;
}

export interface Slot {
  level: number;
  count: number;
}

interface AbilitySheet extends AbilityScore {
  result: number;
  modifier: number;
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
  abilityAbbreviation: string;
  modifier: number;
  saveDc: number;
  slots: Slot[];
  spells: Spell[];
}

export interface SheetProficiencies<T extends Sourceable> {
  item: T;
  from: string;
}

interface BaseSkill {
  label: string;
  modifier: number;
  proficient: boolean;
}

export interface Skill extends BaseSkill {
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

export interface Proficient {
  name: string;
  proficient: boolean;
}

interface CharacterInfo {
  id: string;
  info: SheetHeaderInfo;
}

interface CharacterSheet extends CharacterInfo {
  stats: Stats;
  abilities: AbilitySheet[];
  skills: Skill[];
  savingThrows: Skill[];
  tools: SheetProficiencies<ToolsProficiency>[];
  languages: SheetProficiencies<LanguagesProficiency>[];
  features: Feature[];
  spellcasting?: Spellcasting;
  armor: Armor;
  attacks: Attack[];
  sources: Source[];
  proficiencies: Proficiencies;
}

const characterSheetDefaults: CharacterSheet = {
  id: "",
  sources: [],
  info: {
    characterName: "Character Name",
    playerName: "Player name",
    sourceIds: [],
    size: "medium",
    sheetPhotoUrl: "",
    cardPhotoUrl: "",
    subclass: "Assasin",
    level: 1,
    class: {
      id: "",
      name: "Barbarian",
    },
    background: {
      id: "",
      name: "Acolyte",
    },
    race: {
      id: "",
      name: "Human",
    },
  },
  stats: {
    speed: 0,
    initiative: 0,
    proficiencyBonus: 0,
    hitDice: {
      amount: 0,
      sides: 0,
      notation: "5d8",
    },
    hitPoints: 0,
    armorClass: 0,
  },
  abilities: [
    {
      label: Ability.STRENGTH,
      score: 0,
      upByOne: false,
      upByTwo: false,
      result: 0,
      modifier: 0,
    },
    {
      label: Ability.DEXTERITY,
      score: 0,
      upByOne: false,
      upByTwo: false,
      result: 0,
      modifier: 0,
    },
    {
      label: Ability.CONSTITUTION,
      score: 0,
      upByOne: false,
      upByTwo: false,
      result: 0,
      modifier: 0,
    },
    {
      label: Ability.INTELLIGENCE,
      score: 0,
      upByOne: false,
      upByTwo: false,
      result: 0,
      modifier: 0,
    },
    {
      label: Ability.WISDOM,
      score: 0,
      upByOne: false,
      upByTwo: false,
      result: 0,
      modifier: 0,
    },
    {
      label: Ability.CHARISMA,
      score: 0,
      upByOne: false,
      upByTwo: false,
      result: 0,
      modifier: 0,
    },
  ],
  skills: [
    {
      label: "Acrobatics",
      modifier: 0,
      proficient: false,
      ability: Ability.DEXTERITY,
      displayName: "Acrobatics",
    },
    {
      label: "Animal Handling",
      modifier: 0,
      proficient: false,
      ability: Ability.WISDOM,
      displayName: "Animal Handling",
    },
    {
      label: "Arcana",
      modifier: 0,
      proficient: false,
      ability: Ability.INTELLIGENCE,
      displayName: "Arcana",
    },
    {
      label: "Athletics",
      modifier: 0,
      proficient: false,
      ability: Ability.STRENGTH,
      displayName: "Athletics",
    },
    {
      label: "Deception",
      modifier: 0,
      proficient: false,
      ability: Ability.CHARISMA,
      displayName: "Deception",
    },
    {
      label: "History",
      modifier: 0,
      proficient: false,
      ability: Ability.INTELLIGENCE,
      displayName: "History",
    },
    {
      label: "Insight",
      modifier: 0,
      proficient: false,
      ability: Ability.WISDOM,
      displayName: "Insight",
    },
    {
      label: "Intimidation",
      modifier: 0,
      proficient: false,
      ability: Ability.CHARISMA,
      displayName: "Intimidation",
    },
    {
      label: "Investigation",
      modifier: 0,
      proficient: false,
      ability: Ability.INTELLIGENCE,
      displayName: "Investigation",
    },
    {
      label: "Medicine",
      modifier: 0,
      proficient: false,
      ability: Ability.WISDOM,
      displayName: "Medicine",
    },
    {
      label: "Nature",
      modifier: 0,
      proficient: false,
      ability: Ability.INTELLIGENCE,
      displayName: "Nature",
    },
    {
      label: "Perception",
      modifier: 0,
      proficient: false,
      ability: Ability.WISDOM,
      displayName: "Perception",
    },
    {
      label: "Performance",
      modifier: 0,
      proficient: false,
      ability: Ability.CHARISMA,
      displayName: "Performance",
    },
    {
      label: "Persuasion",
      modifier: 0,
      proficient: false,
      ability: Ability.CHARISMA,
      displayName: "Persuasion",
    },
  ],
  savingThrows: [
    {
      label: "strength",
      modifier: 0,
      proficient: false,
      ability: Ability.STRENGTH,
      displayName: "Strength",
    },
    {
      label: "dexterity",
      modifier: 0,
      proficient: false,
      ability: Ability.DEXTERITY,
      displayName: "Dexterity",
    },
    {
      label: "constitution",
      modifier: 0,
      proficient: false,
      ability: Ability.CONSTITUTION,
      displayName: "Constitution",
    },
    {
      label: "intelligence",
      modifier: 0,
      proficient: false,
      ability: Ability.INTELLIGENCE,
      displayName: "Intelligence",
    },
    {
      label: "wisdom",
      modifier: 0,
      proficient: false,
      ability: Ability.WISDOM,
      displayName: "Wisdom",
    },
    {
      label: "charisma",
      modifier: 0,
      proficient: false,
      ability: Ability.CHARISMA,
      displayName: "Charisma",
    },
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
      name: "",
    },
  },
  attacks: [],
  proficiencies: {
    tools: [],
    languages: [],
    weapons: [],
    armor: [],
  },
};

export { characterSheetDefaults };
export type {
  CharacterSheet,
  SheetHeaderInfo,
  Spellcasting,
  BaseSkill,
  Stats,
  Proficiencies,
  CharacterInfo,
  AbilitySheet,
};
