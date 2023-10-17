import { Card, CardContent, Chip, Typography } from "@mui/material";
import { DateRange } from "@mui/icons-material";
import { TaskProps } from "../context";

const Task = ({ name, description, deadline }: TaskProps) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 150 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Chip size="small" icon={<DateRange />} label={deadline} />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
