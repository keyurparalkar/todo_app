import { Add } from "@mui/icons-material";
import { Grid, IconButton, Paper } from "@mui/material";
import { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { BoardContext, BoardDispatchContext, TaskProps } from "../context";
import AddTaskModal from "./AddTaskModal";
import Task from "./Task";
import { MOVE_TASK } from "../context/actions";

export const StyledAddButton = styled(IconButton)({
  width: "100%",
  backgroundColor: "#cacaca",
  borderRadius: 0,
  marginTop: 5,
});

type PipeLineProps = {
  pLine: string;
  tasks: TaskProps[];
};

const PipeLine = ({ pLine, tasks }: PipeLineProps) => {
  const boardData = useContext(BoardContext);
  const dispatch = useContext(BoardDispatchContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid item>
      <div
        onDrop={(e) => {
          try {
            const { pLine: source, task } = JSON.parse(
              e.dataTransfer.getData("text")
            );
            const nextSourceList = boardData[source].filter(
              (item) => item.id !== task.id
            );
            const nextDestinationList = [task, ...boardData[pLine]];

            dispatch({
              type: MOVE_TASK,
              payload: {
                source,
                destination: pLine,
                nextSourceList,
                nextDestinationList,
              },
            });
            e.preventDefault();
          } catch (err) {
            throw err;
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {pLine}
        <Paper
          sx={{
            height: "50vh",
            width: 220,
            padding: "1rem",
            overflow: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          {tasks.map((task) => (
            <div
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData("text", JSON.stringify({ pLine, task }));
              }}
              key={`task-${task.id}`}
            >
              <Task {...task} />
            </div>
          ))}
          <StyledAddButton aria-label="delete" onClick={handleOpen}>
            <Add />
          </StyledAddButton>
          <AddTaskModal
            open={open}
            handleClose={handleClose}
            pipeline={pLine}
          />
        </Paper>
      </div>
    </Grid>
  );
};

export default PipeLine;
