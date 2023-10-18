import { Add, SortByAlpha } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import { DragEvent, useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { BoardContext, BoardDispatchContext, TaskProps } from "../context";
import AddTaskModal from "./TaskModal";
import Task from "./Task";
import { MOVE_TASK, SORT_PIPELINE } from "../context/actions";
import dayjs from "dayjs";

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

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    try {
      const { pLine: source, task } = JSON.parse(
        e.dataTransfer.getData("text")
      );
      // Make sure to parse the deadline to dayjs object:
      task.deadline = dayjs(task.deadline);

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
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const onDragStart = (e: DragEvent<HTMLDivElement>, task: TaskProps) => {
    e.dataTransfer.setData("text", JSON.stringify({ pLine, task }));
  };

  const onSort = () => {
    dispatch({
      type: SORT_PIPELINE,
      payload: {
        source: pLine,
      },
    });
  };

  return (
    <Grid item>
      <div onDrop={onDrop} onDragOver={onDragOver}>
        <Paper
          sx={{
            height: "70vh",
            width: 220,
            padding: "1rem",
            overflow: "auto",
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
              {pLine}
            </Typography>
            <IconButton onClick={onSort}>
              <SortByAlpha />
            </IconButton>
          </Box>

          {tasks.map((task) => (
            <div
              draggable={true}
              onDragStart={(e: DragEvent<HTMLDivElement>) =>
                onDragStart(e, task)
              }
              key={`task-${task.id}`}
            >
              <Task {...task} pLine={pLine} />
            </div>
          ))}
          <StyledAddButton onClick={handleOpen}>
            <Add />
          </StyledAddButton>
          <AddTaskModal
            open={open}
            handleClose={handleClose}
            pipeline={pLine}
            operation="ADD"
          />
        </Paper>
      </div>
    </Grid>
  );
};

export default PipeLine;
