import { Add } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
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
        <Paper
          sx={{
            height: "50vh",
            width: 220,
            padding: "1rem",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="subtitle1"
              fontWeight={800}
              component="div"
              display="inline"
            >
              Add new status
            </Typography>
          </Box>
          <StyledAddButton aria-label="delete">
            <Add />
          </StyledAddButton>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Board;
