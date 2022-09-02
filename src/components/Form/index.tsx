import { Box, Button } from "@mui/material";

import Input from "components/Input";
import { useState } from "react";

interface FormField {
  name: string;
  label: string;
  type?: "text" | "password";
}

interface FormProps {
  fields: FormField[];
  onSubmit: (formState: Record<string, string>) => void;
}

const Form = ({ fields, onSubmit }: FormProps) => {
  const [state, setState] = useState<Record<string, string>>({});
  const handleChange = (update: Record<string, string>) =>
    setState((prevState) => ({ ...prevState, ...update }));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
      }}
      component="form"
      method="post"
      onSubmit={handleSubmit}
    >
      {fields.map(({ name, label, type = "text" }: FormField) => (
        <Input
          key={name}
          name={name}
          label={label}
          type={type}
          onChange={handleChange}
        />
      ))}
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        disabled={fields.length !== Object.keys(state).length}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Form;
