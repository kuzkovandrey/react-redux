import { User } from "../../shared/models";
import { Action } from "./actions";
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_STARTED,
  FETCH_USERS_SUCCESS,
} from "./types";

export interface UsersState {
  users: User[];
  isLoading: boolean;
  error?: string;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
};

function usersReducer(
  state: UsersState = initialState,
  action: Action
): UsersState {
  switch (action.type) {
    case FETCH_USERS_STARTED:
      return { ...state, isLoading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.users! };
    case FETCH_USERS_FAILURE:
      return { ...state, isLoading: false, error: "Fetch error" };
    default:
      return state;
  }
}

export default usersReducer;
