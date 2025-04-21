import { useState } from "react";
import {
  Box,
  Dialog,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTaskStore } from "../../store/useTaskStore";

function TodoInput() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [listType, setListType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleListChange = (event: SelectChangeEvent) => {
    setListType(event.target.value);
  };

  const handleSubmit = () => {
    if (taskTitle && listType && startTime && endTime) {
      addTask({
        title: taskTitle,
        listType,
        startTime,
        endTime,
      });
      setTaskTitle("");
      setListType("");
      setStartTime("");
      setEndTime("");
      handleClose();
    }
  };
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
      <Dialog open={open} onClose={handleClose} sx={{ boxShadow: 10 }}>
        <Box style={{ padding: "2rem", minWidth: "400px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">create a new task</Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <TextField
            fullWidth
            label="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth>
            <InputLabel id="list-label">Select list</InputLabel>
            <Select
              value={listType}
              label="select List"
              onChange={handleListChange}
            >
              <MenuItem value="home">🏠 Home</MenuItem>
              <MenuItem value="personal">🟣 Personal</MenuItem>
              <MenuItem value="work">🟦 Work</MenuItem>
              <MenuItem value="diet">💪 Diet</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              variant="outlined"
              focused
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              variant="outlined"
              focused
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Add Task
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default TodoInput;
