import { Card, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface PostCardProps {
  title: string;
  body: string;
  showCommentSlot: ReactNode;
}

function PostCard({ title, body, showCommentSlot }: PostCardProps) {
  return (
    <Card sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{body}</Typography>
        {showCommentSlot}
      </Stack>
    </Card>
  );
}

export default PostCard;
