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
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import supabase from "../helper/superbaseClient";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

function TodoInput() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [listType, setListType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const AddTodo = async () => {
    if (taskTitle && listType && selectedDate && startTime && endTime) {
      const formattedStartDate = selectedDate
        ? dayjs(selectedDate).format("YYYY-MM-DD")
        : null;
      const formattedEndDate = selectedDate
        ? dayjs(selectedDate).format("YYYY-MM-DD")
        : null;

      try {
        const { data, error } = await supabase.from("todo").insert([
          {
            title: taskTitle,
            list_type: listType,
            start_time: `${formattedStartDate} ${startTime}`,
            end_time: `${formattedEndDate} ${endTime}`,
          },
        ]);

        console.log("Insert result:", { data, error });

        if (error) {
          console.error("Supabase insert error:", error);
          setError("Failed to add task. Please try again.");
          return;
        }

        setTaskTitle("");
        setListType("");
        setStartTime("");
        setEndTime("");
        setSelectedDate(null);
        setError(null);
        handleClose();
      } catch (e) {
        console.error("Unexpected error:", e);
        setError("Something went wrong.");
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  const handleListChange = (event: SelectChangeEvent) => {
    setListType(event.target.value);
  };

  return (
    <Box
      component="div"
      sx={{ position: "fixed", left: "30rem", px: 2, mt: 18, zIndex: 1000 }}
    >
      <Button
        onClick={handleOpen}
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "black",
          color: "white",
          width: "100%",
          borderRadius: "5rem",
        }}
      >
        create a new task
      </Button>

      <Dialog open={open} onClose={handleClose} sx={{ boxShadow: 10 }}>
        <Box
          style={{
            padding: "2rem",
            width: "100%",
            maxWidth: "500px",
            overflow: "auto",
          }}
        >
          <Box>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              slotProps={{ textField: { fullWidth: true, sx: { mt: 3 } } }}
            />
          </LocalizationProvider>
          <Box
            sx={{ display: "flex", gap: 2, mt: 3, backgroundColor: "#F6F8FA" }}
          >
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
            onClick={AddTodo}
          >
            Add Task
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default TodoInput;
