import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import Home from "pages/home";

import theme from "./theme";
import AppIndex from "pages/app";
import Signup from "pages/signup";
import Login from "pages/login";
import client from "client";
import AuthProvider from "providers/AuthProvider";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app/*" element={<AppIndex />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
