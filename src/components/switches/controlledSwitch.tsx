import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";

interface ComponentProps {
  label: string;
  handleChangeSaveType: (type: string) => void;
  type: string;
  activeSaveType: string;
}

export default function ControlledSwitch({ label, handleChangeSaveType, type, activeSaveType }: ComponentProps) {
  const handleChange = () => {
    handleChangeSaveType(type);
  };

  return (
    <FormControlLabel
      label={label}
      control={<Switch checked={activeSaveType === type} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />}
    />
  );
}
