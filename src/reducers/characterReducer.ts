import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Race, Background, AbilityScore, BasicInfo,  Class, characterSheetDefaults } from "@pages/CreateCharacter/definitions/characterForm";

const initialState = characterSheetDefaults;
export const characterReducer = createSlice({
    name: 'character',
    initialState,
    reducers: {
        // setRace (state, action: PayloadAction<Race>) {
        //     state.race = action.payload;
        // },
        // setBackground (state, action: PayloadAction<Background>){
        //     state.background = action.payload;
        // },
        // setAbilityScores (state, action: PayloadAction<AbilityScore[]>){
        //     state.abilityScores = action.payload;
        // },
        // setBasicInfo (state, action: PayloadAction<BasicInfo>){
        //     state.basicInfo = action.payload;
        // },
        // setClass (state, action: PayloadAction<Class>){
        //     state.characterClass = action.payload;
        // },
        // resetState (){
        //     return formDefaults;
        // }
    }
});



export default characterReducer.reducer;