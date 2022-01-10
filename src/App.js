import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { ThemeProvider, createTheme,  } from '@mui/material/styles';

import LoginScreenStudent from './screens/StudentScreens/LoginScreen';
import LoginScreenTeacher from './screens/TeacherScreens/LoginScreen';
import HomeScreenDocente from "./screens/TeacherScreens/HomeScreen";
import HomeScreenEstudiante from "./screens/StudentScreens/HomeScreen";
import NavContainer from './containers/NavContainer';
import PageNotFound from "./screens/PageNotFound";
import CourseScreen from "./screens/TeacherScreens/CourseScreen";
import StudentScreen from "./screens/TeacherScreens/StudentScreen";
//import HomeContainer from './containers/TeacherContainer/HomeContainer/HomeContainer';
//import CourseContainer from './containers/TeacherContainer/CourseContainer/CourseContainer';

const theme = createTheme();

function App() {
  //el valor en 1 es referente al Rol de docente
  //const Rol = 1;

  return (  
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Routes>


        <Route path="/" element={<LoginScreenStudent/>}/>
        <Route element={<NavContainer/>}>
          <Route path="inicio-alumno" element={<HomeScreenEstudiante/>}/>
        </Route>


        <Route path="/login-docente" element={<LoginScreenTeacher/>}/>
        <Route element={<NavContainer/>}>          
          <Route path="inicio-docente" element={<HomeScreenDocente/>}/>
          <Route path="estudiantes" element={<StudentScreen/>}/>
          <Route path="cursos" element={<CourseScreen/>}/>
        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
      
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
