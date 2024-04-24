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
import { ERROR_MESSAGES } from "constants/characterDefinition";

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      api.dispatch(
        showAlert(
          ERROR_MESSAGES.SERVER_NOT_RESPONDING
        )
      );
      console.log(action.payload, 'error');
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
