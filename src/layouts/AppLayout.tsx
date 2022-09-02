import { Box } from "@mui/material";
import TopAppNav from "components/TopAppNav";
import AuthContext from "contexts/AuthContext";
import { ReactElement, useContext } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactElement | ReactElement[];
};

const AppLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const { loading, loggedIn, email } = useContext(AuthContext);

  if (loading || !email) {
    return <Box>Loading...</Box>;
  }

  if (!loading && !loggedIn) {
    navigate("/login");
  }
  return (
    <>
      <TopAppNav>
        <Box padding={2} paddingTop={0}>
          {children}
        </Box>
      </TopAppNav>
    </>
  );
};

export default AppLayout;
