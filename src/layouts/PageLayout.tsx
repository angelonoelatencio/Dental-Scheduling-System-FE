import { ReactNode, useEffect, useState } from "react";
import { Box, Container, Toolbar, Button } from "@mui/material";
import Copyright from "./Global/copyright";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import AppBar from "./Global/appbar";
import { useNavigate } from "react-router-dom";
import { PATH } from "../config/path";
import { jwtDecode } from "jwt-decode";
const defaultTheme = createTheme();

interface Props {
  children: ReactNode;
}
interface JWTDetails {
  id: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

const PageLayout = (props: Props) => {
  const { children } = props;
  const nav = useNavigate();
  const localToken = localStorage.getItem("t");

  const [loggedInDetails, setLoggedInDetails] = useState<JWTDetails | null>();

  useEffect(() => {
    if (localToken) {
      const decode = jwtDecode(JSON.stringify(localToken)) as JWTDetails;
      setLoggedInDetails(decode);
    }
  }, [localToken]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={false}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            {localToken ? (
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.clear();
                  window.location.replace(PATH.HOME);
                }}>
                Logout {loggedInDetails?.name}
              </Button>
            ) : (
              <Button color="inherit" onClick={() => nav(PATH.LOGIN)}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PageLayout;
