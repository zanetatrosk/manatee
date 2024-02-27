import { Ability, AbilityScore, BasicInfo, Sourceable } from "./characterForm";
import { Proficiencies, StepperForm } from "./stepperForm";

const abilitiesDefaults: AbilityScore[] = [
  {
    label: Ability.STRENGTH,
    score: 8,
    upByOne: false,
    upByTwo: false,
  },
  {
    label: Ability.DEXTERITY,
    score: 8,
    upByOne: false,
    upByTwo: false,
  },
  {
    label: Ability.CONSTITUTION,
    score: 8,
    upByOne: false,
    upByTwo: false,
  },
  {
    label: Ability.INTELLIGENCE,
    score: 8,
    upByOne: false,
    upByTwo: false,
  },
  {
    label: Ability.WISDOM,
    score: 8,
    upByOne: false,
    upByTwo: false,
  },
  {
    label: Ability.CHARISMA,
    score: 8,
    upByOne: false,
    upByTwo: false,
  },
];

const proficiencyDefault: Proficiencies<Sourceable> = {
  amount: 0,
  defaults: [],
};

const formDefaults: StepperForm = {
  basicInfo: {
    characterName: "New Character Name",
    playerName: "Player Name",
    sources: [],
    sheetPhotoUrl: "",
    cardPhotoUrl: "",
  } as BasicInfo,
  abilityScores: abilitiesDefaults as AbilityScore[],
  race: {
    id: null,
    size: "",
    languageIds: [],
  },
  background: {
    id: null,
    toolIds: [],
    languageIds: [],
  },
  class: {
    id: null,
    subclass: null,
    toolIds: [],
  },
};

export { abilitiesDefaults, proficiencyDefault, formDefaults };
