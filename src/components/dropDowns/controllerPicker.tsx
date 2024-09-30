import * as React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface ComponentProps {
  itemList: Array<{ id: number; name: string }>;
  setItem: (id: number) => void;
}

export default function ControlledOpenSelect({ itemList, setItem }: ComponentProps) {
  const [svg, setSvg] = React.useState<number | string>("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof svg>) => {
    const selectedValue = Number(event.target.value);
    setSvg(selectedValue);
    setItem(selectedValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <FormControl sx={{ mt: 1, minWidth: 260 }}>
        <InputLabel size="small">SVG</InputLabel>
        <Select size="small" open={open} onClose={handleClose} onOpen={handleOpen} value={svg} label="SVG" onChange={handleChange}>
          {itemList.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
