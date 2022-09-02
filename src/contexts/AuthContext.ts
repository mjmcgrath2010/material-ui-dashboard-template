import { createContext } from "react";

type Name = {
  first: String;
  last: String;
};

interface InitialStateProps {
  login: (props: { email: string; password: string }) => void;
  signup: (props: {
    email: string;
    password: string;
    name: Record<string, string>;
  }) => void;
  logout: () => void;
  token?: string;
  loggedIn: boolean;
  loading: boolean;
  email?: string;
  name: Name;
}

const initialState: InitialStateProps = {
  login: () => {},
  signup: () => {},
  logout: () => {},
  token: "",
  loggedIn: false,
  loading: false,
  email: "",
  name: {
    first: "",
    last: "",
  },
};

const AuthContext = createContext(initialState);

export default AuthContext;
