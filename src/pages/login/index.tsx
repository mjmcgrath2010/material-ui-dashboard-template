import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Form from "components/Form";
import AuthContext from "contexts/AuthContext";
import AuthLayout from "layouts/AuthLayout";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AuthLayout title="Login">
      <Box sx={{ width: "100%", maxWidth: "400px", padding: "16px" }}>
        <Form
          onSubmit={(state: any) => login(state)}
          fields={[
            { name: "email", label: "Email" },
            { name: "password", label: "Password", type: "password" },
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
          <Typography>Don't have an account?</Typography>
          <Button variant="text" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Login;
