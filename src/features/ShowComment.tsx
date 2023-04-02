import { Button, CircularProgress, Stack } from "@mui/material";
import { useState } from "react";
import {
  selectPostComments,
  fetchCommentsByPostId,
  Comment,
} from "../entities/post";
import { useAppDispatch, useAppSelector } from "../shared/hooks";

interface ShowCommentProps {
  postId: number;
}

function ShowComment({ postId }: ShowCommentProps) {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useAppDispatch();
  const {
    data: comments = [],
    isLoading = false,
    error = "",
  } = useAppSelector(selectPostComments(postId));

  const handleClick = () => {
    setIsShow((show) => !show);

    if (!isShow && !comments.length) {
      dispatch(fetchCommentsByPostId(postId));
    }
  };

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div>
      <Stack alignItems="center" direction="row">
        <Button disabled={isLoading} onClick={handleClick}>
          {isShow ? "Hide comments" : "Show comments"}
        </Button>

        {isLoading && <CircularProgress sx={{ marginLeft: 2 }} size={20} />}
      </Stack>

      {isShow && !!comments.length && (
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
