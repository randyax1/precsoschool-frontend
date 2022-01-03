import { ThemeProvider, createTheme,  } from '@mui/material/styles';
//import NavContainer from './containers/NavContainer';
//import CourseContainer from './containers/TeacherContainer/CourseContainer/CourseContainer';
//import HomeContainer from './containers/TeacherContainer/HomeContainer/HomeContainer';
import LoginScreen from './screens/TeacherScreens/LoginScreen';
//import StudentScreen from './screens/TeacherScreens/StudentScreen';

const theme = createTheme();

function App() {
  return (  
    
    <ThemeProvider theme={theme}>
      <LoginScreen />
      {/*
      <NavContainer />
      <HomeContainer />
      <StudentScreen />
      <CourseContainer />
      */}
    </ThemeProvider>
    
  );
}

export default App;
