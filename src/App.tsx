import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import Board from "./component/Board";
import StatusModal from "./component/StatusModal";

function App() {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "#dfdfdf" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" gutterBottom>
          Task board
        </Typography>
        <StatusModal />
      </Box>
      <Board />
    </Container>
  );
}

export default App;
