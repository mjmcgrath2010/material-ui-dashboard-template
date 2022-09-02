import { TextField, Box } from "@mui/material";
import { useState } from "react";

interface InputProps {
  variant?: "outlined" | "filled";
  label: string;
  name: string;
  onChange: (update: Record<string, string>) => void;
  defaultValue?: string;
  type?: "text" | "password";
}

const Input = ({
  variant = "outlined",
  label,
  name,
  defaultValue = "",
  onChange,
  type = "text",
}: InputProps) => {
  const [val, setValue] = useState(defaultValue);
  const handleChange = (event: any) => {
    onChange({ [name]: event.target.value });
    setValue(event.target.value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        sx={{ width: "100%" }}
        onChange={handleChange}
        value={val}
        label={label}
        variant={variant}
        type={type}
      />
    </Box>
  );
};

export default Input;
