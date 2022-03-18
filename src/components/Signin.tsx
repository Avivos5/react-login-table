import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const theme = createTheme();

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

function Signin() {
  const navigate = useNavigate();

  const { register, control, handleSubmit, formState: { errors }  } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data)
    signin(data.email.toString(), data.password.toString());
    navigate("/")
  };

  const appContext = useAuth();
  if (!appContext) return null;
  const {signin} = appContext;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                    {...field}
                    {...register("email")}
                    error={errors.email != null}
                    helperText={errors.email?.message}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    />)}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                    {...field}
                    {...register("password")}
                    error={errors.password != null}
                    helperText={errors.password?.message}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    />)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signin;