import { Box, Typography } from "@mui/material";
import now, { getFormattedDate } from "../utils/now.ts";
import SideBar from "./todoSideNav";
import TodoInput from "./todoInput.tsx";

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
