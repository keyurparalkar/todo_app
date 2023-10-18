import { Typography, Modal, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useContext, useRef, useState } from "react";
import { BoardDispatchContext } from "../context";
import { ADD_PIPELINE } from "../context/actions";

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

const StatusModal = () => {
  const dispatch = useContext(BoardDispatchContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    if (inputRef.current) {
      console.log(inputRef.current);
      dispatch({
        type: ADD_PIPELINE,
        payload: inputRef.current.value,
      });
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          height: 40,
        }}
        aria-label="delete"
        onClick={handleOpen}
      >
        Add new status
      </Button>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add new status
          </Typography>
          <Box mt={2} display="flex" flexDirection="column">
            <TextField
              inputRef={inputRef}
              id="outlined-basic"
              label="Enter new status"
              variant="outlined"
            />

            <Button variant="contained" onClick={onSubmit}>
              Create Task
            </Button>
          </Box>
        </Box>
      </StyledModal>
    </>
  );
};

export default StatusModal;
