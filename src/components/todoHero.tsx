import { Box, Typography } from "@mui/material";
import now, { getFormattedDate } from "../utils/now.ts";
import SideBar from "./todoSideNav";
import TodoInput from "./todoInput.tsx";
import { useTaskStore } from "../../store/useTaskStore.ts";

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
            <Typography variant="body2">{task.title}</Typography>
            <Typography variant="body2">List:{task.listType}</Typography>
            <Typography variant="body2">
              {task.startTime}-{task.endTime}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default TodoHeroSection;
