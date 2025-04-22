import { useState, useEffect } from "react";
import { Box, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import now, { getFormattedDate } from "../utils/now.ts";
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
  const [completedTask, setCompletedTask] = useState<number[]>([]);

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
        const { data, error } = await supabase
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
    console.log("Edit task:", selectedTaskId);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete task:", selectedTaskId);
    handleMenuClose();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box
      component="div"
      sx={{ mt: 5, display: "flex", flexDirection: "column", gap: "2rem" }}
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
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {tasks.map((task, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid #ccc",
              p: 2,
              borderRadius: 2,
              width: "50rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="body2"
              sx={{ textDecoration: task.completed ? "line-through" : "none" }}
            >
              {task.title}
            </Typography>
            <Typography variant="body2">List:{task.list_type}</Typography>
            <Typography variant="body2">
              {task.start_time} - {task.end_time}
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
