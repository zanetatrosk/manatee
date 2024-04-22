import { createSlice } from '@reduxjs/toolkit';

interface Error{
    closed: boolean;
    message: string;   
}


const alertReducer = createSlice({
  name: 'alert',
  initialState: { closed: true, message: '' } as Error,
  reducers: {
    showAlert: (state, action) => {
      state.closed = false;
      state.message = action.payload;
      return state;
    },
    hideAlert: (state) => {
      state.closed = true;
      state.message = '';
    },
  },
});

export const { showAlert, hideAlert } = alertReducer.actions;

export default alertReducer.reducer;