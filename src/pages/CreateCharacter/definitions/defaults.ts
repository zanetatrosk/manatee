import { Ability, AbilityScore, BasicInfo, Sourceable } from "./characterForm";
import { Proficiencies, StepperForm } from "./stepperForm";

const abilitiesDefaults: AbilityScore[] = [
  {
    label: Ability.STRENGTH,
    score: 8,
    modifierUpToOne: false,
    modifierUpToTwo: false,
  },
  {
    label: Ability.DEXTERITY,
    score: 8,
    modifierUpToOne: false,
    modifierUpToTwo: false,
  },
  {
    label: Ability.CONSTITUTION,
    score: 8,
    modifierUpToOne: false,
    modifierUpToTwo: false,
  },
  {
    label: Ability.INTELLIGENCE,
    score: 8,
    modifierUpToOne: false,
    modifierUpToTwo: false,
  },
  {
    label: Ability.WISDOM,
    score: 8,
    modifierUpToOne: false,
    modifierUpToTwo: false,
  },
  {
    label: Ability.CHARISMA,
    score: 8,
    modifierUpToOne: false,
    modifierUpToTwo: false,
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
    sheetPhoto: "",
    cardPhoto: "",
  } as BasicInfo,
  abilityScores: abilitiesDefaults as AbilityScore[],
  race: {
    id: null,
    size: "",
    languagesId: [],
  },
  background: {
    id: null,
    toolsId: [],
    languagesId: [],
  },
  class: {
    id: null,
    subclass: null,
    toolsId: [],
  },
};

export { abilitiesDefaults, proficiencyDefault, formDefaults };
