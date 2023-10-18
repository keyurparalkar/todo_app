import { Grid } from "@mui/material";
import { useContext } from "react";
import { BoardContext } from "../context";
import PipeLine from "./PipeLine";

const Board = () => {
  const pipeLines = useContext(BoardContext);

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={5}>
      {Object.entries(pipeLines).map(([pLine, tasks], index) => (
        <PipeLine key={`grid-${index}`} pLine={pLine} tasks={tasks} />
      ))}
      <Grid item></Grid>
    </Grid>
  );
};

export default Board;
