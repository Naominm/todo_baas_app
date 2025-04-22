import { Checkbox, FormControlLabel, Box } from "@mui/material";
import { useTaskStore } from "../../store/useTaskStore";

function SideBar(): React.JSX.Element {
  const tasks = useTaskStore((state) => state.tasks);
  let personalCount = 0;
  let workCount = 0;
  let dietCount = 0;

  tasks.forEach((task) => {
    if (task.list_type === "personal") personalCount++;
    if (task.list_type === "work") workCount++;
    if (task.list_type === "💪 Diet") dietCount++;
  });

  return (
    <Box
      component="div"
      sx={{
        width: "15rem",
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        pt: 5,
      }}
    >
      <FormControlLabel
        control={<Checkbox sx={{ color: "purple" }} />}
        sx={{ width: "80%" }}
        label={`personal (${personalCount})`}
      />
      <FormControlLabel
        control={<Checkbox sx={{ color: "blue" }} />}
        sx={{ width: "80%" }}
        label={`work (${workCount})`}
      />
      <FormControlLabel
        control={<Box sx={{ width: 24 }} />}
        label={`💪 Diet (${dietCount})`}
        sx={{ width: "80%" }}
      />
    </Box>
  );
}

export default SideBar;
