import {
  CircularProgress,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemText,
  Container,
} from "@mui/material";
import { useSelectUsers } from "../entities/user/useSelectUsers";
import { useAppSelector } from "../shared/hooks";

function Filter() {
  const {
    users: userList,
    isLoading,
    error,
  } = useAppSelector((state) => state.users);
  const { toggleUserId, isSelectedId } = useSelectUsers();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <span>Fetch error</span>;
  }

  return (
    <Container>
      <List>
        {userList.map(({ id, username }) => (
          <ListItem key={id}>
            <ListItemButton onClick={() => toggleUserId(id)}>
              <Checkbox checked={isSelectedId(id)} />
              <ListItemText id={username} primary={username} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Filter;
