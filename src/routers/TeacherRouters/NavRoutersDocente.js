import { Route, Routes } from "react-router-dom";

import CourseScreen from "../../screens/TeacherScreens/CourseScreen";
import StudentScreen from "../../screens/TeacherScreens/StudentScreen";
import HomeScreenDocente from "../../screens/TeacherScreens/HomeScreen";
import PageNotFound from "../../screens/PageNotFound";
import NavContainer from "../../containers/NavContainer";

export const NavRoutersDocente = () => {
  return (
    <>
      <Routes>
        <Route element={<NavContainer />}>
          <Route path="inicio-docente" element={<HomeScreenDocente />} />
          <Route path="estudiantes" element={<StudentScreen />} />
          <Route path="cursos" element={<CourseScreen />} />
        </Route>

        <Route path="*" element={<PageNotFound />}> </Route>
        
      </Routes>
    </>
  );
};
