import { RootState } from "./../../app/store";
import { Comment, Post } from "../../shared/models";
import { PostsAction } from "./actions";
import {
  FETCH_POSTS_STARTED,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  FETCH_POST_COMMENTS_STARTED,
  FETCH_POST_COMMENTS_SUCCESS,
  FETCH_POST_COMMENTS_FAILURE,
} from "./types";

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error?: string;
  comments: {
    [id: number]: {
      data?: Comment[];
      error?: string;
      isLoading?: boolean;
    };
  };
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  comments: {},
};

function postsReducer(
  state: PostsState = initialState,
  action: PostsAction
): PostsState {
  switch (action.type) {
    case FETCH_POSTS_STARTED:
      return { ...state, isLoading: true, error: "" };
    case FETCH_POSTS_SUCCESS:
      return { ...state, isLoading: false, error: "", posts: action.posts };
    case FETCH_POSTS_FAILURE:
      return { ...state, isLoading: false, error: "Fetch error" };
    case FETCH_POST_COMMENTS_STARTED:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.postId]: {
            ...state.comments[action.postId],
            isLoading: true,
            error: "",
          },
        },
      };
    case FETCH_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.postId]: {
            data: action.comments,
            isLoading: false,
            error: "",
          },
        },
      };
    case FETCH_POST_COMMENTS_FAILURE:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.postId]: {
            ...state.comments[action.postId],
            isLoading: false,
            error: "Fetch error",
          },
        },
      };
    default:
      return state;
  }
}

export const selectPostComments = (postId: number) => (state: RootState) =>
  state.posts.comments[postId] ?? {};

export default postsReducer;
