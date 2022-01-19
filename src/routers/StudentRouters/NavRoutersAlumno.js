import { Route, Routes } from "react-router-dom";
import NavContainer from "../../containers/NavContainer";

import PageNotFound from "../../screens/PageNotFound";
import HomeScreenEstudiante from "../../screens/StudentScreens/HomeScreen";

export const NavRoutersAlumno = () => {
  return (
    <>
      <Routes>
        
        <Route element={<NavContainer />}>
          <Route path="inicio-alumno" element={<HomeScreenEstudiante />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  );
};
