import { AbilityScore, BasicInfo, Sourceable } from "./characterForm";



interface Proficiencies<T extends Sourceable>{
    amount: number;
    defaults: T[];
}

interface LanguagesProficiency extends Sourceable{
    exotic: boolean;
} 

interface ToolsProficiency extends Sourceable{
    type: string;
}

interface ClassForm {
    id: string | null;
    subclass: string | null;
    toolsId: string[];
}

interface RaceForm {
    id: string | null;
    size: string;
    languagesId: string[];
}

interface BackgroundForm {
    id: string | null;
    toolsId: string[];
    languagesId: string[];
}

interface StepperForm {
    basicInfo: BasicInfo;
    abilityScores: AbilityScore[];
    class: ClassForm;
    race: RaceForm;
    background: BackgroundForm;
}


export type { ClassForm, Proficiencies, LanguagesProficiency, ToolsProficiency, RaceForm, BackgroundForm, StepperForm }