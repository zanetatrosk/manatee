import { Ability, AbilityScore, Race } from '@pages/CreateCharacter/definitions/characterForm';


const DEFAULT_SCORE = 8;
//in future this could be use by more components
function createAbilityData(race: Race): AbilityScore[] {
    
    return Object.keys(Ability).map((ability: string) => ({
      label: ability,
      score: DEFAULT_SCORE,
      modifierUpToOne: race?.abilityScorePlus1?.includes(ability) || false,
      modifierUpToTwo: race?.abilityScorePlus2?.includes(ability) || false,
    }));

  }


export default createAbilityData;