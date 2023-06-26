import Signup from "./Signup"
import { Box } from "@mui/material"

function App() {
  return (
    <>
      <Box style={{display: "flex", minHeight: "100vh", justifyContent: "center", alignItems: "center"}}>
        <Signup />
      </Box>
    </>
  )
}

export default App
