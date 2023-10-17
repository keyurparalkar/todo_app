import { Add } from "@mui/icons-material";
import { Grid, IconButton, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { BoardContext } from "../context";
import Task from "./Task";

const StyledAddButton = styled(IconButton)({
  width: "100%",
  backgroundColor: "#cacaca",
  borderRadius: 0,
  marginTop: 5,
});

const Board = () => {
  const pipeLines = useContext(BoardContext);
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={5}>
      {Object.entries(pipeLines).map(([key, tasks], index) => (
        <Grid item key={`grid-${index}`}>
          {key}
          <Paper
            sx={{
              height: "50vh",
              width: 220,
              padding: "1rem",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            {tasks.map((task, idx) => (
              <Task key={`task-${idx}`} {...task} />
            ))}
            <StyledAddButton aria-label="delete">
              <Add />
            </StyledAddButton>
          </Paper>
        </Grid>
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
