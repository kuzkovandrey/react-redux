import { Dispatch } from "react";
import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import postsReducer from "../entities/post/reducer";
import usersReducer from "../entities/user/reducer";

const store = createStore(
  combineReducers({
    users: usersReducer,
    posts: postsReducer,
  }),
  applyMiddleware(thunk)
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
