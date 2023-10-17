import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import Board from "./component/Board";

function App() {
  return (
    <Container maxWidth="lg" style={{ backgroundColor: "#dfdfdf" }}>
      <Typography variant="h2" gutterBottom>
        Task board
      </Typography>
      <Board />
    </Container>
  );
}

export default App;
