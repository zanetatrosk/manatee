import {
  configureStore,
  ThunkAction,
  Action,
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import { charactersApiSlice } from "api/charactersApiSlice";
import { generalContentApiSlice } from "api/generalContentApiSlice";
import alertReducer from "reducers/alertReducer";
import characterReducer from "reducers/characterReducer";
import { themeReducer } from "reducers/themeReducer";
import { showAlert } from "reducers/alertReducer";

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const str = "Something went wrong during fetching data. The error is: "      
      api.dispatch(
        showAlert(
          "data" in action.error
            ? str + (action.error.data as { message: string }).message 
            : str + action.error.message
        )
      );
    }
    return next(action);
  };

const store = configureStore({
  reducer: {
    [generalContentApiSlice.reducerPath]: generalContentApiSlice.reducer,
    [charactersApiSlice.reducerPath]: charactersApiSlice.reducer,
    character: characterReducer,
    theme: themeReducer.reducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(generalContentApiSlice.middleware)
      .concat(charactersApiSlice.middleware)
      .concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
