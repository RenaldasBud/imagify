import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import DashBoard from "./screens/dashboard";

export default function Layout() {
  return (
    <Box component="main">
      <Container sx={{ mt: 10 }}>
        <Routes>
          <Route path="/" element={<DashBoard />} />
        </Routes>
      </Container>
    </Box>
  );
}
