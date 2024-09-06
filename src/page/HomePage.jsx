import React from "react";
import { Box} from "@chakra-ui/react";
import Bar from "../LlistBar/Bar";
import Dashboard from "./Dashboard";
function HomePage() {
  return <Box display={'flex'}>
     <Bar/> 
    <Dashboard/>
  </Box>
}

export default HomePage;
