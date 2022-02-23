import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AuthContext } from "./auth/authContext";
import { authReducer } from "./auth/authReducer";

import LoginScreenTeacher from "./screens/TeacherScreens/LoginScreen";
import { NavRoutersDocente } from "./routers/TeacherRouters/NavRoutersDocente";
import { PublicRouteDocente } from "./routers/TeacherRouters/PublicRouteDocente";
import { PrivateRouteDocente } from "./routers/TeacherRouters/PrivateRouteDocente";

import LoginScreenStudent from "./screens/StudentScreens/LoginScreen";
import { NavRoutersAlumno } from "./routers/StudentRouters/NavRoutersAlumno";
import { PublicRouteAlumno } from "./routers/StudentRouters/PublicRouteAlumno";
import { PrivateRouteAlumno } from "./routers/StudentRouters/PrivateRouteAlumno";

const theme = createTheme();

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

function App() {

  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>

            <Route path="/" element={
                <PublicRouteAlumno>
                  <LoginScreenStudent />
                </PublicRouteAlumno>
              } 
            />

            <Route path="a/*" element={
                <PrivateRouteAlumno>
                  <NavRoutersAlumno />
                </PrivateRouteAlumno>
              }
            />
            
            <Route path="/login-docente" element={
                <PublicRouteDocente>
                  <LoginScreenTeacher />
                </PublicRouteDocente>
              } 
            />
            
            <Route path="d/*" element={
                <PrivateRouteDocente>
                  <NavRoutersDocente />
                </PrivateRouteDocente>
              }
            />
            
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;