import { CircularProgress, Stack } from "@mui/material";
import { useEffect } from "react";
import { PostCard, fetchPostsByIdList } from "../entities/post";
import { useSelectUsers } from "../entities/user/useSelectUsers";
import ShowComment from "../features/ShowComment";
import { useAppDispatch, useAppSelector } from "../shared/hooks";

function PostList() {
  const dispatch = useAppDispatch();
  const { posts, isLoading, error } = useAppSelector((state) => state.posts);
  const { getIdList } = useSelectUsers();

  useEffect(() => {
    const idList = getIdList();
    dispatch(fetchPostsByIdList(idList));
  }, [dispatch, getIdList]);

  if (isLoading && !posts.length) {
    return <CircularProgress />;
  }

  if (error) {
    return <span>Fetch error</span>;
  }

  return (
    <Stack spacing={2}>
      {posts.map(({ title, body, id }) => (
        <PostCard
          key={id}
          title={title}
          body={body}
          showCommentSlot={<ShowComment postId={id} />}
        />
      ))}
    </Stack>
  );
}

export default PostList;
