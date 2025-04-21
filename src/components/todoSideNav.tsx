import { Checkbox, FormControlLabel, Box } from "@mui/material";
import supabase from "../helper/superbaseClient";

function SideBar(): React.JSX.Element {
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
        control={<Box sx={{ width: 24 }} />}
        label="Home"
        sx={{ width: "80%" }}
      />
      <FormControlLabel
        control={<Checkbox sx={{ color: "black" }} />}
        sx={{ width: "80%" }}
        label="completed"
      />
      <FormControlLabel
        control={<Checkbox sx={{ color: "purple" }} />}
        sx={{ width: "80%" }}
        label="personal"
      />
      <FormControlLabel
        control={<Checkbox sx={{ color: "blue" }} />}
        sx={{ width: "80%" }}
        label="work"
      />
      <FormControlLabel
        control={<Box sx={{ width: 24 }} />}
        label="💪 Diet"
        sx={{ width: "80%" }}
      />
    </Box>
  );
}

export default SideBar;
