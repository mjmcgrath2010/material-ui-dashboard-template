import { Box, Button, Typography } from "@mui/material";
import backgroundImage from "assets/images/home-background.jpg";
import AuthContext from "contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) => t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        position: "fixed",
        width: "100vw",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
            gap: 2,
            alignItems: "center",
          }}
        >
          {loggedIn ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/app")}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/login")}
              >
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "20vh",
        }}
      >
        <Typography variant="h3">Your App</Typography>
        <Typography variant="h5">Coming soon</Typography>
      </Box>
    </Box>
  );
};

export default Home;
