import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import characterReducer from '../reducers/characterReducer';
import { generalContentApiSlice } from '../api/generalContentApiSlice';
import { charactersApiSlice } from 'api/charactersApiSlice';
import { themeReducer } from 'reducers/themeReducer';
// ...

const store = configureStore({
  reducer: {
    [generalContentApiSlice.reducerPath]: generalContentApiSlice.reducer,
    [charactersApiSlice.reducerPath]: charactersApiSlice.reducer,
    character: characterReducer,
    theme: themeReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalContentApiSlice.middleware).concat(charactersApiSlice.middleware),
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