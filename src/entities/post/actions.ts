import { AppThunk } from "./../../app/store";
import { getPostComments, getPostsByUserId } from "./../../shared/api";
import { Comment, Post } from "../../shared/models";
import {
  FETCH_POSTS_STARTED,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  FETCH_POST_COMMENTS_STARTED,
  FETCH_POST_COMMENTS_SUCCESS,
  FETCH_POST_COMMENTS_FAILURE,
} from "./types";

export const fetchPostsByIdList = (
  idList: string[]
): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(fetchPostsStarted());

    try {
      const posts = await getPostsByUserId(idList);
      dispatch(fetchPostsSuccess(posts));
    } catch {
      dispatch(fetchPostsFailure());
    }
  };
};

export const fetchCommentsByPostId = (
  postId: number
): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    dispatch(fetchCommentsStarted(postId));

    try {
      const comments = await getPostComments(postId);
      dispatch(fetchCommentsSuccess(postId, comments));
    } catch {
      dispatch(fetchCommentsFailure(postId));
    }
  };
};

function fetchPostsStarted() {
  return {
    type: FETCH_POSTS_STARTED as typeof FETCH_POSTS_STARTED,
  };
}

function fetchPostsSuccess(posts: Post[]) {
  return {
    type: FETCH_POSTS_SUCCESS as typeof FETCH_POSTS_SUCCESS,
    posts,
  };
}

function fetchPostsFailure() {
  return {
    type: FETCH_POSTS_FAILURE as typeof FETCH_POSTS_FAILURE,
    error: "Fetch error",
  };
}

function fetchCommentsStarted(postId: number) {
  return {
    type: FETCH_POST_COMMENTS_STARTED as typeof FETCH_POST_COMMENTS_STARTED,
    postId,
  };
}

function fetchCommentsSuccess(postId: number, comments: Comment[]) {
  return {
    type: FETCH_POST_COMMENTS_SUCCESS as typeof FETCH_POST_COMMENTS_SUCCESS,
    postId,
    comments,
  };
}

function fetchCommentsFailure(postId: number) {
  return {
    type: FETCH_POST_COMMENTS_FAILURE as typeof FETCH_POST_COMMENTS_FAILURE,
    error: "Fetch error",
    postId,
  };
}

export type PostsAction = ReturnType<
  | typeof fetchPostsStarted
  | typeof fetchPostsSuccess
  | typeof fetchPostsFailure
  | typeof fetchCommentsStarted
  | typeof fetchCommentsSuccess
  | typeof fetchCommentsFailure
>;
