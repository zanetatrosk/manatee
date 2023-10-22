import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import getReducers from '../reducers/reducers';
// Or from '@reduxjs/toolkit/query/react'
import characterReducer from '../reducers/characterReducer';
import { raceApiSlice } from '../api/raceApiSlice';
// ...

const store = configureStore({
  reducer: {
    [raceApiSlice.reducerPath]: raceApiSlice.reducer,
    character: characterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(raceApiSlice.middleware),
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