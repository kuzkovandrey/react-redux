import { Card, SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

interface PostCardProps {
  title: string;
  body: string;
  showComment: ReactNode;
}

function PostCard({ title, body, showComment }: PostCardProps) {
  return (
    <Card sx={cardStyles}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2">{body}</Typography>
      {showComment}
    </Card>
  );
}

const cardStyles: SxProps = {
  "& > *:not(:last-child)": { marginBottom: 2 },
  p: 2,
};

export default PostCard;
