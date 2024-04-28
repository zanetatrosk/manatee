import { AbilityScore, BasicInfo, Sourceable } from "./characterForm";

interface Proficiencies<T extends Sourceable> {
  amount: number;
  defaults: T[];
  from: string;
}

interface LanguagesProficiency extends Sourceable {
  exotic: boolean;
}

interface ToolsProficiency extends Sourceable {
  type: string;
}

interface ClassForm {
  id: string | null;
  subclass: string | null;
  toolIds: string[];
}

interface RaceForm {
  id: string | null;
  size: string;
  languageIds: string[];
}

interface BackgroundForm {
  id: string | null;
  toolIds: string[];
  languageIds: string[];
}

interface StepperForm {
  id?: string;
  info: BasicInfo;
  abilityScores: AbilityScore[];
  class: ClassForm;
  race: RaceForm;
  background: BackgroundForm;
}

export type {
  ClassForm,
  Proficiencies,
  LanguagesProficiency,
  ToolsProficiency,
  RaceForm,
  BackgroundForm,
  StepperForm,
};
