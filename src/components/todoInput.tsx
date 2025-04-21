import { useState } from "react";
import { Box, Dialog, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function TodoInput() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ position: "fixed", bottom: 20, left: 250 }}>
      <Button
        onClick={handleOpen}
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "black",
          color: "white",
          width: "30rem",
          borderRadius: "5rem",
        }}
      >
        create a new task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box style={{ padding: "2rem", minWidth: "300px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            n<h2>create a new task</h2>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default TodoInput;
