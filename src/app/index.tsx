import PostList from "../widgets/PostList";
import Filter from "../features/Filter";
import Container from "@mui/material/Container";

function App() {
  return (
    <Container>
      <Filter />
      <PostList />
    </Container>
  );
}

export default App;
