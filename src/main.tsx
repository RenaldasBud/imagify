import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./layout";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004731",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      letterSpacing: 0.5,
    },
    fontFamily: "Poppins",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  </StrictMode>
);
