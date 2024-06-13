import { Box, Button, Grid, Link, TextField, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../services/Authentication/mutation";
import { LoadingButton } from "@mui/lab";

const Registration = () => {
  const nav = useNavigate();

  const { mutate: registerUser, isPending } = useRegisterUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    registerUser({
      name: data.get("name")?.toString()!,
      email: data.get("email")?.toString()!,
      password: data.get("password")?.toString()!,
    });
  };

  return (
    <Card sx={{ padding: "25px" }}>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
            <span>Registering</span>
          </LoadingButton>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        )}

        <Grid container>
          <Grid item xs>
            <Link
              href="#"
              variant="body2"
              onClick={() => {
                nav("/login");
              }}>
              Already have account? Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default Registration;
