import { CircularProgress, Container, SxProps } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { useGetPostsQuery, PostCard } from "../entities/post";
import ShowComment from "../features/ShowComment";

const containerStyles: SxProps = {
  "& > *:not(:last-child)": { marginBottom: 2 },
};

function PostList() {
  const [searchParams] = useSearchParams();
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useGetPostsQuery(searchParams.getAll("userId"));

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
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
