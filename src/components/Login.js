import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import validator from "validator";
import { regexPassword } from "../utils";
// import { GoogleLogin } from "react-google-login";
import Confetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Paper,
  Container,
  Link,
  Stack,
  Button,
  Box,
  Divider,
  Avatar,
  Typography,
  TextField,
  FilledInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import {
  Face as FaceIcon,
  SettingsInputAntenna,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import theme from "../styles/theme";
import { signInGoogle } from "../api";

function Login({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId =
    "389927153738-9n3bpvcsb4barloiflhdec28s7o7q2mr.apps.googleusercontent.com";
  const [getGoogleResponse, setResponse] = useState({
    name: "",
    email: "",
    profile_loaded: false,
  });
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    fetchError: false,
    fetchErrorMessage: "",
  });

  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value;
    let isCorrectValue =
      fieldName === "email"
        ? validator.isEmail(currValue)
        : regexPassword.test(currValue);
    isCorrectValue
      ? setErrors({ ...errors, [fieldName]: false })
      : setErrors({ ...errors, [fieldName]: true });
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  // const fetchGa = async (token) => {
  //   console.log(token);
  //   const res = await fetch('/api/ga', {
  //     method: "POST",
  //     body: JSON.stringify({googleAccessToken: token})
  //   })
  //   console.log(res.data)
  // };
  async function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    window.localStorage.setItem("access_token", accessToken);
    // dispatch(signInGoogle(accessToken, navigate));
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleAccessToken: accessToken,
        }),
      });
      console.log(res);
      if (!res.ok) {
        const error = await res.json();
        return setErrors({
          ...errors,
          fetchError: true,
          fetchErrorMsg: error.msg,
        });
      }
    } catch (error) {
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg:
          "There was a problem with our server, please try again later",
      });
    }
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess, scope: "https://www.googleapis.com/auth/analytics.edit" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        return setErrors({
          ...errors,
          fetchError: true,
          fetchErrorMsg: error.msg,
        });
      }

      const data = await res.json();
      console.log({ data });

      // this is just a visual feedback for user for this demo
      // this will not be an error, rather we will show a different UI or redirect user to dashboard
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg: data.msg,
      });
      setValues({
        email: "",
        password: "",
        showPassword: false,
      });
      return;
    } catch (error) {
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg:
          "There was a problem with our server, please try again later",
      });
    }
  };

  const googleLogin = async (code) => {
    console.log(code);
    const options = {
      url: "http://localhost:5000/api/v1/auth/google",
      method: "POST",
      body: JSON.stringify({ token: code }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const tokens = await axios(options)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    // const tokens = await axios.post(
    //   "http://localhost:5000/api/v1/auth/google",
    //   { code }
    // );
    console.log(tokens);
  };

  const handleLogin = async (googleData) => {
    console.log(googleData);
    console.log(googleData.credential);
    const options = {
      url: "http://localhost:5000/api/v1/auth/google",
      method: "POST",
      body: JSON.stringify({
        token: googleData.credential,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // const res = await fetch ("/api/v1/auth/google", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     token: googleData.tokenId
    //   }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    // const data = await res.json();
  };

  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client.init( {
  //       clientId: clientId,
  //       scope: 'https://www.googleapis.com/auth/userinfo.email'
  //     });
  //   };
  //   gapi.load('client:auth2', initClient);
  // })

  // const googleResponse = async (response) => {
  //   if (response.credential) {
  //     const googleResponse = await axios.post(
  //       "http://localhost:5000/api/v1/user-auth",
  //       {
  //         token: response.credential,
  //       }
  //     );

  //     if (Object.keys(googleResponse.data.payload).length !== 0) {
  //       const { name, email } = googleResponse.data.payload;
  //       setResponse({
  //         name,
  //         email,
  //         profile_loaded: true,
  //       });
  //       toast.success("Logged In");
  //     }
  //   }
  // };

  const onFailure = (err) => {
    // alert(err);
    console.log(err);
  };
  return (
    <>
      <Container sx={{ marginTop: "calc(100vh - 40%)" }} maxWidth="xs">
        <Paper elevation={6}>
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.primary.main,
                boxShadow: "0px 0px 8px rgba(131,153,167,0.99)",
              }}
            >
              <FaceIcon sx={{ fontSize: 70 }} />
            </Avatar>
            <h2>Login</h2>
          </Container>
          <Stack
            component="form"
            onSubmit={handleSubmit}
            noValidate
            spacing={6}
            sx={{ bgcolor: "#f5f5f6", padding: "40px" }}
          >
            <TextField
              variant="filled"
              type="email"
              label="Email"
              value={values.email}
              onChange={handleChange("email")}
              error={errors.email}
              helperText={errors.email && "Please insert a valid email address"}
            />

            <FormControl variant="filled">
              <InputLabel htmlFor="password-field">Password</InputLabel>
              <FilledInput
                id="password-field"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                error={errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={errors.email || errors.password}
                sx={{
                  minWidth: "70%",
                }}
              >
                Login
              </Button>
              <br />
              {/* <GoogleLogin
                // clientId={clientId}
                // buttonText="Login with Google"
                // onSuccess={googleResponse}
                // onFailure={onFailure}
                // cookiePolicy={"single_host_origin"}
                // onSuccess={(credentialResponse) => {
                //   console.log(credentialResponse);
                // }}
                onSuccess={googleLogin}
                onError={(err) => console.log(err)}
                // useOneTap
              /> */}
              <Button onClick={() => login()}>Login with Google</Button>
            </Box>
            {errors.fetchError && (
              <FormHelperText error>{errors.fetchErrorMsg}</FormHelperText>
            )}
            <Divider />
            <Typography paragraph align="center">
              Don't have an account yet?{" "}
              <Link component={RouterLink} to="/signup">
                Sign up here
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
