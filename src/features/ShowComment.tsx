import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Comment } from "../entities/post";
import { selectPostComments, fetchCommentsByPostId } from "../entities/post";
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
    <>
      <Button disabled={isLoading} onClick={handleClick}>
        {isShow ? "Hide comments" : "Show comments"}
      </Button>

      {isLoading && <CircularProgress sx={{ marginLeft: 2 }} size={20} />}

      {isShow &&
        !!comments.length &&
        comments.map(({ name, body, id }) => (
          <Comment key={id} name={name} body={body} />
        ))}
    </>
  );
}

export default ShowComment;
