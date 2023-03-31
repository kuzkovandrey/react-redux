import {
  FETCH_USERS_STARTED,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./types";
import { User } from "../../shared/models";
import { getUsers } from "../../shared/api";
import { AppThunk } from "../../app/store";

const fetchUsersStarted = () => ({
  type: FETCH_USERS_STARTED as typeof FETCH_USERS_STARTED,
});

const fetchUsersSuccess = (users: User[]) => ({
  type: FETCH_USERS_SUCCESS as typeof FETCH_USERS_SUCCESS,
  users,
});

const fetchUsersFailure = () => ({
  type: FETCH_USERS_FAILURE as typeof FETCH_USERS_FAILURE,
});

export const fetchUsers = (): AppThunk => {
  return async (dispatch) => {
    dispatch(fetchUsersStarted());

    try {
      const users = await getUsers();
      dispatch(fetchUsersSuccess(users));
    } catch {
      dispatch(fetchUsersFailure());
    }
  };
};

export type Action = ReturnType<
  typeof fetchUsersFailure | typeof fetchUsersSuccess | typeof fetchUsersStarted
>;
