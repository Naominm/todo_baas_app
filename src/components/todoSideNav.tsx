import { Checkbox, FormControlLabel, Box, IconButton } from "@mui/material";
import { useTaskStore } from "../../store/useTaskStore";
import { Menu } from "@mui/icons-material";
import { useState } from "react";

function SideBar(): React.JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);
  let personalCount = 0;
  let workCount = 0;
  let dietCount = 0;

  tasks.forEach((task) => {
    if (task.list_type === "personal") personalCount++;
    if (task.list_type === "work") workCount++;
    if (task.list_type === "Diet") dietCount++;
  });

  return (
    <Box
      component="div"
      sx={{
        width: collapsed ? "2rem" : { xs: "100%", sm: "15rem" },
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: collapsed ? "center" : "flex-start",
        gap: 2,
        pt: 5,
        pl: 2,
      }}
    >
      <IconButton
        onClick={() => setCollapsed(!collapsed)}
        sx={{ alignSelf: "flex-end" }}
      >
        <Menu />
      </IconButton>
      {!collapsed && (
        <>
          <FormControlLabel
            control={<Checkbox sx={{ color: "purple" }} />}
            sx={{ width: "100%", maxWidth: "100%" }}
            label={`personal (${personalCount})`}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "blue" }} />}
            sx={{ width: "100%", maxWidth: "100%" }}
            label={`work (${workCount})`}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "blue" }} />}
            sx={{ width: "100%", maxWidth: "100%" }}
            label={`Diet (${dietCount})`}
          />
        </>
      )}
    </Box>
  );
}

export default SideBar;
