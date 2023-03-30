import { Button, CircularProgress, Container, SxProps } from "@mui/material";
import { useState } from "react";

import { Comment, useGetPostCommentsQuery } from "../entities/post";

const containerStyles: SxProps = {
  "& > *:not(:last-child)": { marginBottom: 2 },
};

interface ShowCommentProps {
  postId: number;
}

function ShowComment({ postId }: ShowCommentProps) {
  const [isShow, setIsShow] = useState(false);

  const { data: comments = [], isLoading } = useGetPostCommentsQuery(
    `${postId}`,
    {
      skip: !isShow,
    }
  );

  return (
    <>
      <Button variant="outlined" onClick={() => setIsShow((show) => !show)}>
        {isShow ? "Hide comments" : "Show comments"}
      </Button>

      {isLoading && <CircularProgress />}

      {isShow && (
        <Container sx={containerStyles}>
          {comments.map(({ name, body, id }) => (
            <Comment key={id} name={name} body={body} />
          ))}
        </Container>
      )}
    </>
  );
}

export default ShowComment;
