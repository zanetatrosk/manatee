import { BaseItem, Background, Class, Race } from "@pages/CreateCharacter/definitions/characterForm";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Source extends BaseItem {}

interface IFormDataState {
    races: Race[];
    backgrounds: Background[];
    sources: Source[];
    classes: Class[];
}

const initialState: IFormDataState = {
    races: [],
    backgrounds: [],
    sources: [],
    classes: [],
};

export const dataForm = createSlice({
    name: 'dataForm',
    initialState: initialState,
    reducers: {
        setRaces (state, action: PayloadAction<Race[]>) {
            state.races = action.payload;
        },
        setBackgrounds(state, action: PayloadAction<Background[]>){
            state.backgrounds = action.payload;
        },
        setSources(state, action: PayloadAction<Source[]>){
            state.sources = action.payload;
        },
        setClasses(state, action: PayloadAction<Class[]>){
            state.classes = action.payload;
        },
    }
});
