import { Box, Button, Typography } from "@mui/material";
import Form from "components/Form";
import AuthContext from "contexts/AuthContext";
import AuthLayout from "layouts/AuthLayout";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Signup = (props: Props) => {
  const { signup, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async ({
    email,
    password,
    confirmPassword,
    first,
    last,
  }: any) => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    signup({
      email,
      password,
      name: {
        first,
        last,
      },
    });
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }
  return (
    <AuthLayout title="Signup">
      <Box sx={{ width: "100%", maxWidth: "400px", padding: "16px" }}>
        <Form
          onSubmit={handleSubmit}
          fields={[
            { name: "first", label: "First Name" },
            { name: "last", label: "Last Name" },
            { name: "email", label: "Email" },
            { name: "password", label: "Password", type: "password" },
            {
              name: "confirmPassword",
              label: "Confirm Password",
              type: "password",
            },
          ]}
        />

        <Box
          paddingTop={2}
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography>Have an account?</Typography>
          <Button variant="text" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Signup;
