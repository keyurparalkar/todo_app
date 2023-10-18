import { Add } from "@mui/icons-material";
import { Grid, Paper } from "@mui/material";
import { useContext } from "react";
import { BoardContext } from "../context";
import PipeLine, { StyledAddButton } from "./PipeLine";

const Board = () => {
  const pipeLines = useContext(BoardContext);

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={5}>
      {Object.entries(pipeLines).map(([pLine, tasks], index) => (
        <PipeLine key={`grid-${index}`} pLine={pLine} tasks={tasks} />
      ))}
      <Grid item>
        Add new status
        <Paper
          sx={{
            height: "50vh",
            width: 220,
            padding: "1rem",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <StyledAddButton aria-label="delete">
            <Add />
          </StyledAddButton>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Board;
