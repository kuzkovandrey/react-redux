import { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { Comment, useGetPostCommentsQuery } from "../entities/post";

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
    <div>
      <Stack alignItems="center" direction="row" spacing={2}>
        <Button variant="outlined" onClick={() => setIsShow((show) => !show)}>
          {isShow ? "Hide comments" : "Show comments"}
        </Button>
        {isLoading && <CircularProgress size={20} />}
      </Stack>

      {isShow && (
        <Stack sx={{ marginTop: 2 }} spacing={2}>
          {comments.map(({ name, body, id }) => (
            <Comment key={id} name={name} body={body} />
          ))}
        </Stack>
      )}
    </div>
  );
}

export default ShowComment;
