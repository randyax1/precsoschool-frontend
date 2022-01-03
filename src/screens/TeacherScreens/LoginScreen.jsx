import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import CameraIcon from "@mui/icons-material/Camera";
import { makeStyles, createStyles } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputText from "../../components/InputText";
import ButtonLoading from "../../components/ButtonLoading";

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
        textCenter
        fullWidth 
        label="Usuario" 
        id="user" 
        onChange={() => {}} 
        />

        <InputText
          textCenter
          fullWidth
          label="Contraseña"
          id="password"
          type="password"
          onChange={() => {}}
        />

        <br />
        <ButtonLoading
          fullWidth
          label="Acceder"
          onClick={() => {}}
          isLoading={false}
        />

      </Box>
    </div>
  );
};

export default LoginScreen;
