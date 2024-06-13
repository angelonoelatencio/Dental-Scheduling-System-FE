import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useLoginUser } from "../services/Authentication/mutation";
import { PATH } from "../config/path";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const LoginPage = () => {
  const userToken = localStorage.getItem("t");
  const nav = useNavigate();

  const { mutate: loginMutation, isPending } = useLoginUser();

  React.useEffect(() => {
    if (userToken) {
      window.location.replace(PATH.APPOINTMENTS);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginMutation({
      email: data.get("email")?.toString()!,
      password: data.get("password")?.toString()!,
    });
  };

  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={5}
      component={Paper}
      square
      sx={{ padding: "25px" }}>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {isPending ? (
            <LoadingButton
              fullWidth
              loading={true}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loadingPosition="start">
              <span>Signing in</span>
            </LoadingButton>
          ) : (
            <Button
              //   loading={mutation.isPending}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          )}

          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  nav(PATH.REGISTRATION);
                }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginPage;
