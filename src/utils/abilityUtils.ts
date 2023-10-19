import { Ability, AbilityScore, Race } from '@pages/Characters/definitions/characterForm';

const DEFAULT_SCORE = 8;
function createAbilityData(race: Race): AbilityScore[] {
    
    return Object.keys(Ability).map((ability: string) => ({
      label: ability,
      score: DEFAULT_SCORE,
      modifierUpToOne: race?.abilityScorePlus1?.includes(ability) || false,
      modifierUpToTwo: race?.abilityScorePlus2?.includes(ability) || false,
    }));
  }

function retAbilityScore (){

}  
export default createAbilityData;