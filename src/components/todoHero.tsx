import { Box, Typography } from "@mui/material";
import now, { getFormattedDate } from "../utils/now.ts";
import SideBar from "./todoSideNav";
import TodoInput from "./todoInput.tsx";
import { useTaskStore } from "../../store/useTaskStore.ts";

function TodoHeroSection() {
  const tasks = useTaskStore((state) => state.tasks);
  return (
    <Box
      component="div"
      sx={{ backgroundColor: "#F6F8FA", display: "flex", gap: 2 }}
    >
      <SideBar />
      <TopHero />
      <Box component="div" sx={{ mt: 25, left: 0 }}>
        {tasks.map((task, index) => (
          <Box
            key={index}
            sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}
          >
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2">List:{task.listType}</Typography>
            <Typography variant="body2">
              {task.startTime}-{task.endTime}
            </Typography>
          </Box>
        ))}
      </Box>
      <TodoInput />
    </Box>
  );
}
function TopHero() {
  return (
    <Box
      component="div"
      height="40rem"
      sx={{ mt: 5, display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {" "}
        Hello 👋 Good {now()} Naomi
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {getFormattedDate()}
      </Typography>
    </Box>
  );
}

export default TodoHeroSection;
