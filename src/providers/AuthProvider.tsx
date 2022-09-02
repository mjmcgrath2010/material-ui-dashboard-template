import { useState, useEffect, useCallback } from "react";
import AuthContext from "contexts/AuthContext";
import { ReactElement } from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, SIGN_UP } from "mutations";
import { ME } from "queries";

interface AuthProviderProps {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
}

type Name = {
  first: String;
  last: String;
};

interface AuthState {
  token?: string;
  loggedIn: boolean;
  loading: boolean;
  email?: string;
  name: Name;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>({
    loggedIn: true,
    loading: true,
    name: {
      first: "",
      last: "",
    },
  });
  const navigate = useNavigate();
  const [loginRequest, { loading: loginLoading }] = useMutation(LOGIN);
  const [signupRequest, { loading: signupLoading }] = useMutation(SIGN_UP);
  const { data: userData, loading: userDataLoading } = useQuery(ME);

  const { email, name, loading, loggedIn } = state;

  useEffect(() => {
    if (userData?.me?.email) {
      updateState(userData.me);
    }
  }, [userData]);

  const goToRoute = useCallback(
    (route: string) => {
      navigate(route);
    },
    [navigate]
  );

  const updateState = (newState: Partial<AuthState>) =>
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));

  const logout = () => {
    localStorage.removeItem("promptli_access_token");
    setState({
      token: "",
      loggedIn: false,
      loading: false,
      name: {
        first: "",
        last: "",
      },
    });
  };

  const login = async ({ email, password }: any) => {
    const response = await loginRequest({
      variables: { payload: { email, password } },
    });

    const userDataResponse = await userData;

    const {
      data: {
        login: { token },
      },
    } = response;

    localStorage.setItem("promptli_access_token", token);

    updateState({
      token,
      loggedIn: true,
      loading: false,
      ...userDataResponse.me,
    });

    goToRoute("/app");
  };

  const signup = async ({ email, password, name }: any) => {
    const response = await signupRequest({
      variables: {
        payload: { email, password, name },
      },
    });

    const {
      data: {
        addUser: { token },
      },
    } = response;

    localStorage.setItem("promptli_access_token", token);

    updateState({
      loggedIn: true,
      token,
      loading: false,
    });

    navigate("/app");
  };

  useEffect(() => {
    if (signupLoading || loginLoading || userDataLoading) {
      updateState({ loading: signupLoading || loginLoading });
    } else {
      updateState({ loading: false });
    }
  }, [signupLoading, loginLoading, userDataLoading]);

  useEffect(() => {
    if (!localStorage.getItem("promptli_access_token")) {
      updateState({ loggedIn: false, loading: false });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logout,
        login,
        signup,
        email,
        name,
        loading,
        loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
