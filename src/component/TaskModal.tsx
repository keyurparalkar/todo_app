import { Typography, Modal, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UploadFile } from "@mui/icons-material";
import { ChangeEvent, useContext, useState } from "react";
import { BoardDispatchContext, generateId } from "../context";
import { ADD_TASK_TO_PIPELINE, UPDATE_TASK } from "../context/actions";
import { TaskProps } from "../context";
import dayjs from "dayjs";

export type ModalProps = {
  open: boolean;
  handleClose: () => void;
  pipeline: string;
  operation: "ADD" | "UPDATE";
  task?: TaskProps;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  zIndex: 1000,
  p: 4,
};

const StyledModal = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const TaskModal = ({
  open,
  pipeline,
  handleClose,
  operation,
  task,
}: ModalProps) => {
  const dispatch = useContext(BoardDispatchContext);
  const [payload, setPayload] = useState({
    data: {
      id: operation === "ADD" ? generateId() : task?.id,
      name: operation === "ADD" ? "" : task?.name,
      description: operation === "ADD" ? "" : task?.description,
      deadline: operation === "ADD" ? dayjs() : task?.deadline,
      attachment: operation === "ADD" ? "" : task?.attachment,
    },
    key: operation === "ADD" ? "" : pipeline,
  });

  const handleFieldUpdate = (
    key: string,
    value: string | dayjs.Dayjs | null
  ) => {
    setPayload({
      key: pipeline,
      data: { ...payload.data, [key]: value },
    });
  };

  const onSubmit = () => {
    dispatch({
      type: operation === "ADD" ? ADD_TASK_TO_PIPELINE : UPDATE_TASK,
      payload,
    });
    handleClose();
  };

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-testid="task-modal"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {operation === "ADD" ? "Add" : "Update"} a task
        </Typography>
        <Box mt={2} display="flex" flexDirection="column">
          <TextField
            label="Task name"
            variant="outlined"
            value={payload.data.name}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleFieldUpdate("name", e.target.value)}
          />
          <TextField
            multiline
            margin="normal"
            minRows={4}
            label="Task description"
            variant="outlined"
            value={payload.data.description}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleFieldUpdate("description", e.target.value)}
          />
          <Box mt={1} mb={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                data-testid="date-picker"
                value={payload.data.deadline}
                onChange={(value) => handleFieldUpdate("deadline", value)}
              />
            </LocalizationProvider>
          </Box>

          <Box mb={2}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadFile />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
          <Button
            data-testid="test-submit"
            variant="contained"
            onClick={onSubmit}
          >
            {operation === "ADD" ? "Create" : "Update "} Task
          </Button>
        </Box>
      </Box>
    </StyledModal>
  );
};

export default TaskModal;
