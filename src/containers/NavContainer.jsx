import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CameraIcon from "@mui/icons-material/Camera";

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

import { makeStyles, createStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import {
  Outlet
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import { types } from '../types/types';

const drawerWidth = 180;

const useStyles = makeStyles((theme) =>
  createStyles({
    logo: {
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
    }
  }),
);

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  position:'relative',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const NavContainer = (props) => {

  const theme = useTheme();
  const classes = useStyles();
  const history = useNavigate();

  const routesListDocente = [
    {
      text: "Inicio",
      icon: <GridViewRoundedIcon style={{ color:'#757575'}} />,
      onClick: () => history("inicio-docente", handleDrawerClose())
    },
    {
      text: "Estudiantes",
      icon: <AccountBoxRoundedIcon style={{ color:'#757575'}} />,
      onClick: () => history("estudiantes", handleDrawerClose())
    },
    {
      text: "Cursos",
      icon: <ClassRoundedIcon style={{ color:'#757575'}} />,
      onClick: () => history("cursos", handleDrawerClose())
    },
    {
    text: "Logout",
    icon: <ExitToAppRoundedIcon style={{color: 'red'}} />,
    onClick: () => history("/login-docente", handleLogout())
    }

  ];

  const routesListAlumno = [
    {
      text: "Inicio",
      icon: <GridViewRoundedIcon style={{ color:'#757575'}} />,
      onClick: () => history("inicio-alumno", handleDrawerClose())
    },
    {
      text: "Logout",
      icon: <ExitToAppRoundedIcon style={{color: 'red'}} />,
      onClick: () => history("/", handleLogout())
    }
  
  ];

  const [open, setOpen] = React.useState(false);

  const { user, dispatch } = useContext(AuthContext);

  const list = user.Rol === "teacher" ? routesListDocente : routesListAlumno; 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch({ type: types.logout });
    handleDrawerClose();
  }

  return (
    <div sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{backgroundColor:'#f18f00'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{fontWeight:900}} className={classes.logo} variant="h5" noWrap>
          <span style={{ color: "#F26E09" }}>
          <CameraIcon />
          <span style={{ color: "#32373B" }}>
            Precso<span style={{ color: "white" }}>School</span>
          </span>
        </span>
      </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((itemList, index) => {
            const { text, icon, onClick } = itemList;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Outlet/>
    </div>
  );
}

export default NavContainer