import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { DateRange, Delete } from "@mui/icons-material";
import { BoardDispatchContext, TaskProps } from "../context";
import { useContext } from "react";
import { DELETE_TASK } from "../context/actions";
import dayjs from "dayjs";

const Task = ({
  name,
  description,
  deadline,
  id,
  pLine,
}: TaskProps & { pLine: string }) => {
  const dispatch = useContext(BoardDispatchContext);

  const onDelete = () => {
    dispatch({ type: DELETE_TASK, payload: { id, source: pLine } });
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 150 }}>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        }
        subheader={
          <Chip
            size="small"
            icon={<DateRange />}
            label={dayjs(deadline).format("DD MMM YY")}
          />
        }
        action={
          <IconButton aria-label="delete" onClick={onDelete}>
            <Delete fontSize="small" />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
