import {
  CircularProgress,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { useGetUsersQuery } from "../entities/user";

function Filter() {
  const { data: userList = [], isLoading, isError } = useGetUsersQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const getIdList = () => searchParams.getAll("userId");

  const toggleUserId = (id: number) => {
    const idList = getIdList();

    if (idList.includes(`${id}`)) {
      setSearchParams({
        userId: idList.filter((userId) => +userId !== id),
      });
    } else {
      setSearchParams({
        userId: [...idList, `${id}`],
      });
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <span>Fetch error</span>;
  }

  return (
    <List>
      {userList.map(({ id, username }) => (
        <ListItem key={id}>
          <ListItemButton onClick={() => toggleUserId(id)}>
            <Checkbox
              checked={searchParams.getAll("userId").includes(`${id}`)}
            />
            <ListItemText id={username} primary={username} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default Filter;
