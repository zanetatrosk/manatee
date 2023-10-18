import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Race, Background, AbilityScore, BasicInfo } from "@pages/Characters/definitions/characterForm";
interface Character{
    basicInfo: BasicInfo;
    race: Race | null;
    background: Background | null;
    abilityScores: AbilityScore[] | null;
}
const initialState = {
    race: null,
    background: null,
    abilityScores: null,
} as Character
export const characterReducer = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setRace (state, action: PayloadAction<Race| null>) {
            state.race = action.payload;
        },
        setBackground (state, action: PayloadAction<Background| null>){
            state.background = action.payload;
        },
        setAbilityScores (state, action: PayloadAction<AbilityScore[]| null>){
            state.abilityScores = action.payload;
        }
        
    }
});


export const { setRace, setBackground, setAbilityScores } = characterReducer.actions

export default characterReducer.reducer;