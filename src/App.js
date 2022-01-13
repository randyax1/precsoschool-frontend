import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AuthContext } from "./auth/authContext";
import { authReducer } from "./auth/authReducer";

import LoginScreenTeacher from "./screens/TeacherScreens/LoginScreen";
import { NavRoutersDocente } from "./routers/NavRoutersDocente";
import { PrivateRouteDocente } from "./routers/PrivateRouteDocente";

import LoginScreenStudent from "./screens/StudentScreens/LoginScreen";
import { NavRoutersAlumno } from "./routers/NavRoutersAlumno";
import { PrivateRouteAlumno } from "./routers/PrivateRouteAlumno";

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

            <Route path="/" element={<LoginScreenStudent />} />
            <Route path="a/*" element={
                <PrivateRouteAlumno>
                  <NavRoutersAlumno />
                </PrivateRouteAlumno>
              }
            />

            <Route path="/login-docente" element={<LoginScreenTeacher />} />
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
