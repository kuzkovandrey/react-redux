import { Card, Typography } from "@mui/material";

interface CommentProps {
  name: string;
  body: string;
}

function Comment({ name, body }: CommentProps) {
  return (
    <Card sx={{ p: 2 }}>
      <Typography sx={{ marginBottom: 1 }} variant="h5">
        {name}
      </Typography>
      <Typography variant="body2">{body}</Typography>
    </Card>
  );
}

export default Comment;
