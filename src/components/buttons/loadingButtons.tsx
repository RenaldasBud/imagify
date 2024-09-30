import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

const ColorButtonSubmit = styled(LoadingButton)(() => ({
  borderColor: "#004731",
  color: "#004731",
  fontFamily: "Poppins",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#004731",
    color: "white",
    borderColor: "#004731",
  },
}));

export { ColorButtonSubmit };
