import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import CameraIcon from "@mui/icons-material/Camera";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles, createStyles } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { types } from "../../types/types";
import InputText from "../../components/InputText";
import { AuthContext } from "../../auth/authContext";
import ButtonLoading from "../../components/ButtonLoading";
import { TeacherLoginUser } from "../../lib/demoBackEndClient";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      alignItems: "center",
      backgroundColor: "#F3F6F8",
      display: "flex",
      justifyContent: "center",
      margin: "0px",
      height: "100vh",
      width: "100vw",

      [theme.breakpoints.down("md")]: {
        padding: "10px",
      },
    },

    containerLogin: {
      backgroundColor: "white",
      borderColor: "#DADCDF",
      borderStyle: "solid",
      borderRadius: "12px",
      borderWidth: "2px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0px 40px 20px 40px",

      [theme.breakpoints.down("md")]: {
        padding: "0px 15px 20px 15px",
      },
    },

    iconLogo: {
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
    logo: {
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
    title: {
      color: "#333333",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
    subTitle: {
      color: "#999CA0",

      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
  })
);

const LoginScreen = () => {
  const classes = useStyles();

  const history = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [isErrorAtLogin, setErrorAtLogin] = useState(false);
  const [errorMessageAtLogin, setErrorMessageAtLogin] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    return () => {
      // This is the cleanup function
    }
  }, [email, password]);

  const login = async () => {
    if (email === "") {
      setEmailError(true);
      setEmailHelperText("Favor de ingresar su correo electrónico");
    } else if (!regEmail.test(email)) {
      setEmailError(true);
      setEmailHelperText("Verifique el Formato del Correo Electrónico");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }

    if (password === "") {
      setPasswordError(true);
      setPasswordHelperText("Favor de ingresar su contraseña");
    } else if (password.length < 6) {
      setPasswordError(true);
      setPasswordHelperText("La contraseña debe de ser mayor a 6 caracteres.");
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }

    if (email && password) {
      setLoading(true);

      try {

        const loginTeacherResponse = await TeacherLoginUser(email, password);

        const action = {
          type: types.login,
          payload: {
            Rol: loginTeacherResponse.data.rol,
            name: loginTeacherResponse.data.name,
            token: loginTeacherResponse.data.token
          },
        };
        
        dispatch(action);
        history("/d/inicio-docente");
        setLoading(false);
      } catch (error) {
        
        const errorMessage = error.response.data.msg;
        
        if(errorMessage.includes("The user or password are incorrect.")) {
          setErrorAtLogin(true);
          setErrorMessageAtLogin("El usuario o contraseña son incorrectos.");
        }
        else if(errorMessage.includes("Password incorrect.")) {
          setErrorAtLogin(true);
          setErrorMessageAtLogin("Contraseña ingresada incorrecta.");
        }

        setLoading(false);

      }
    }
  };

  const handleErrorAtLoginAlertClose = () => {
    setErrorAtLogin(false);
  };

  return (
    <div className={classes.main}>
      <CssBaseline />
      <Box className={classes.containerLogin}>
        <Avatar
          sx={{
            mt: 2,
            mb: 2,
            bgcolor: "white",
            width: 75,
            height: 75,
            color: "#F26E09",
          }}
        >
          <CameraIcon sx={{ width: 75, height: 75 }} />
        </Avatar>

        <Typography
          theme={theme}
          className={classes.title}
          variant="h3"
          sx={{
            mb: 2,
          }}
        >
          Iniciar Sesión
        </Typography>

        <Typography
          theme={theme}
          align="center"
          className={classes.subTitle}
          variant="h4"
          sx={{
            mb: 2,
          }}
        >
          &nbsp;Ingrese sus credenciales para acceder.&nbsp;
        </Typography>
        <Typography className={classes.logo} theme={theme} variant="h4" noWrap>
          <span style={{ color: "#F26E09", fontWeight: "bold" }}>
            <CameraIcon className={classes.iconLogo} />
            <span style={{ color: "#676A6E" }}>
              PRECSO
              <span style={{ color: "#f18f00" }}>
                SCHOOL
                <span style={{ color: "#780116" }}>&nbsp;| Docente</span>
              </span>
            </span>
          </span>
        </Typography>

        <InputText
          type="email"
          error={emailError}
          fullWidth
          helperText={emailHelperText}
          id="user"
          label="Usuario"
          textCenter
          onChange={handleEmail}
        />

        <InputText
          error={passwordError}
          fullWidth
          helperText={passwordHelperText}
          id="password"
          label="Contraseña"
          textCenter
          type="password"
          onChange={handlePassword}
        />

        <br />
        <ButtonLoading
          fullWidth
          isLoading={loading}
          label="Acceder"
          onClick={login}
        />
      </Box>

      <Snackbar
        open={isErrorAtLogin}
        autoHideDuration={3000}
        onClose={handleErrorAtLoginAlertClose}
      >
        <Alert
          onClose={handleErrorAtLoginAlertClose}
          variant="filled"
          color="error"
          severity="info"
        >
          {errorMessageAtLogin}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginScreen;