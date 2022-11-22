// import logo from './logo.svg';
// import './App.css';

import { Box } from "@chakra-ui/react";
import { Loading } from "./components/Loading";
import { Weather } from "./components/weather";

function App() {
  return (
    <Box  fontFamily="poppins">
<Weather />
    </Box>
    
  );
}

export default App;
