import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Input,
  Button,
} from "@mui/material";
import now, { getFormattedDate, formatTime } from "../utils/now.ts";
import SideBar from "./todoSideNav";
import TodoInput from "./todoInput.tsx";
import { useTaskStore } from "../../store/useTaskStore.ts";
import supabase from "../helper/superbaseClient";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function TodoHeroSection() {
  return (
    <Box
      component="div"
      sx={{ backgroundColor: "#F6F8FA", display: "flex", gap: 2 }}
    >
      <SideBar />
      <TopHero />

      <TodoInput />
    </Box>
  );
}
function TopHero() {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    taskId: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };
  const handleComplete = async () => {
    if (selectedTaskId !== null) {
      try {
        const { error } = await supabase
          .from("todo")
          .update({ completed: true })
          .eq("id", selectedTaskId);
        if (error) throw error;
        fetchTasks();
      } catch (e) {
        console.error("error marking as complete", e);
      } finally {
        handleMenuClose();
      }
    }
  };

  const handleEdit = () => {
    const taskToEdit = tasks.find((task) => task.id === selectedTaskId);
    if (taskToEdit) {
      setEditedTitle(taskToEdit.title);
      setIsEditing(true);
    }
    setAnchorEl(null);
  };

  const handleSaveEdit = async () => {
    if (selectedTaskId !== null) {
      try {
        const { error } = await supabase
          .from("todo")
          .update({ title: editedTitle })
          .eq("id", selectedTaskId);
        if (error) throw error;
        fetchTasks();
      } catch (e) {
        console.error("Error saving edit", e);
      } finally {
        setIsEditing(false);
        setSelectedTaskId(null);
      }
    }
  };
  const handleDelete = async () => {
    if (selectedTaskId !== null) {
      try {
        const { error } = await supabase
          .from("todo")
          .delete()
          .eq("id", selectedTaskId);
        if (error) throw error;
        fetchTasks();
      } catch (e) {
        console.error("Error deleting tasks", e);
      } finally {
        handleMenuClose();
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box
      component="div"
      sx={{ mt: 8, display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {" "}
        Hello 👋 Good {now()} Naomi
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {getFormattedDate()}
      </Typography>
      <Box
        component="div"
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        {tasks.map((task, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid #ccc",
              p: 2,
              borderRadius: 2,
              width: "100%",
              maxWidth: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "white",
            }}
          >
            {isEditing && selectedTaskId === task.id ? (
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  sx={{
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
                <Button onClick={handleSaveEdit}>save</Button>
              </Box>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  backgroundColor: task.completed ? "red" : "white",
                }}
              >
                {task.title}
              </Typography>
            )}
            <Typography variant="body2">
              {formatTime(task.start_time)} - {formatTime(task.end_time)}
            </Typography>
            <IconButton onClick={(e) => handleMenuOpen(e, task.id)}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        ))}
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handleComplete}>Mark as Complete</MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default TodoHeroSection;
