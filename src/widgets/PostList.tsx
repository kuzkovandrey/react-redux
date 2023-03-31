import { CircularProgress, Container, SxProps } from "@mui/material";
import { useEffect } from "react";
import { PostCard } from "../entities/post";
import { fetchPostsByIdList } from "../entities/post/actions";
import { useSelectUsers } from "../entities/user/useSelectUsers";
import ShowComment from "../features/ShowComment";
import { useAppDispatch, useAppSelector } from "../shared/hooks";

const containerStyles: SxProps = {
  "& > *:not(:last-child)": { marginBottom: 2 },
};

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
    <Container sx={containerStyles}>
      {posts.map(({ title, body, id }) => (
        <PostCard
          key={id}
          title={title}
          body={body}
          showComment={<ShowComment postId={id} />}
        />
      ))}
    </Container>
  );
}

export default PostList;
