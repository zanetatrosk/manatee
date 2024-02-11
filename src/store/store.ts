import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import characterReducer from '../reducers/characterReducer';
import { raceApiSlice } from '../api/raceApiSlice';
import { charactersApiSlice } from 'api/charactersApiSlice';
// ...

const store = configureStore({
  reducer: {
    [raceApiSlice.reducerPath]: raceApiSlice.reducer,
    [charactersApiSlice.reducerPath]: charactersApiSlice.reducer,
    character: characterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(raceApiSlice.middleware).concat(charactersApiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;