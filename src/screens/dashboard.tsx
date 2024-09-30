import { useState } from "react";
import { Box } from "@mui/material";
import TwoDimensionalScalableVectorGraphic from "../components/images/twoDimensionalSvg";

export default function DashBoard() {
  const [key, setKey] = useState(0);
  function handleReset() {
    setKey(key + 1);
  }

  return (
    <Box>
      <TwoDimensionalScalableVectorGraphic key={key} handleReset={handleReset} />
    </Box>
  );
}
