import { Box,Typography } from "@mui/material";
import now from "../utils/now.ts"
import SideBar from "./todoSideNav";


function TodoHeroSection() {
    return ( 
      <Box component="div" sx={{backgroundColor:"#F6F8FA",display:"flex", gap:2}}>
      <SideBar/>
      <TopHero/>
      </Box>
    );
}
function TopHero() {
  return ( 
    <Box component="div" height="40rem" sx={{mt:5}} >
<Typography variant="h4" sx={{fontWeight:700}}> Hello 👋 Good {now()} Naomi</Typography>
    </Box>
   );
}

export default TodoHeroSection;