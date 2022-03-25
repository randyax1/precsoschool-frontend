import React, { useState, useEffect } from "react";

import {
    Modal,
    Backdrop,
    Box,
    Fade,
    Grid,
    Typography
  } from "@mui/material";

import { makeStyles, createStyles } from "@mui/styles";
import InputText from "../../../components/InputText";

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 5,
      boxShadow: theme.shadows[5],
      height: "50%",
      padding: theme.spacing(4, 4, 4, 4),
      position: 'absolute',
      width: "80%",

      [theme.breakpoints.down("md")]: {
        height: "45%",
        padding: theme.spacing(2, 2, 2, 2),
        overflow: "scroll",
        overflowX: "hidden",
        width: "90%",
      },

      [theme.breakpoints.down("sm")]: {
        height: "80%",
        padding: theme.spacing(2, 2, 2, 2),
        width: "90%",
      },

      "@media (min-width: 0px) and (max-width: 820px) and (orientation: landscape)":
        {
          height: "95%",
          padding: theme.spacing(2, 3, 1, 3),
          overflow: "scroll",
          overflowX: "hidden",
          width: "85%",
        },
    },
    title: {
      color: "#011228",

      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(5),
    },
  })
);

export const CourseModal = (props) => {
  const { course = {
      _id: "",
      name: "",
      description: "",
      start: "",
      end: "",
    } } = props;

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState(false);
  const [courseNameHelperText, setCourseNameHelperText] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionHelperText, setDescriptionHelperText] = useState("");

  const [start, setStart] = useState("");
  const [startError, setStartError] = useState(false);
  const [startHelperText, setStartHelperText] = useState("");

  const [end, setEnd] = useState("");
  const [endError, setEndError] = useState(false);
  const [endHelperText, setEndHelperText] = useState("");

  useEffect(() => {
    setCourseName(props.course ? course.name : "");
    setDescription(props.course ? course.description : "");
    setStart(props.course ? course.start : "");
    setEnd(props.course ? course.end : "");

    setCourseNameError(false);
    setDescriptionError(false);
    setStartError(false);
    setEndError(false);

    // eslint-disable-next-line
  }, [props.open]);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleCourseName = (event) => {
    setCourseName(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleStart = (event) => {
    setStart(event.target.value);
  };

  const handleEnd = (event) => {
    setEnd(event.target.value);
  };

  const onAcceptPress = async () => {

    if(courseName === "") {
        setCourseNameError(true);
        setCourseNameHelperText('El nombre del curso es requerido');
    } else {
        setCourseNameError(false);
        setCourseNameHelperText("");
    }

    if(description === "") {
        setDescriptionError(true);
        setDescriptionHelperText('La descripcion no puede quedar vacia.');
    } else {
        setDescriptionError(false);
        setDescriptionHelperText("");
    }

    if(start === "") {
        setStartError(true);
        setStartHelperText('La fecha de incio no puede quedar vacia');
    } else {
        setStartError(false);
        setStartHelperText("");
    }

    if(end === "") {
        setEndError(true);
        setEndHelperText('La fecha de termino no puede quedar vacia');
    } else {
        setEndError(false);
        setEndHelperText("");
    }

    if(courseName && description && start && end) {
        setIsLoading(true);

        setIsLoading(false);
        setOpenAlert(true);
        props.onClose({}, 'escapeKeyDown');
        props.onSuccess();
    }

  };

  return (
      <>
      <Modal
      className={classes.modal}
      open={props.open}
      onClose={props.onClose}
      closeAfterTransition
      BackdropProps={{
          timeout: 500,
      }}
      >
          <Fade in={props.open}>
              <Box className={classes.paper} container spacing={4}>

                  <Grid item xs={12}>
                      <Typography className={classes.title} variant="h5">
                          {props.title}
                      </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4}>
                      <InputText
                      autoFocus={true}
                      capitalize
                      defaultValue={props.course ? course.name:""}
                      error={courseNameError}
                      helperText={courseNameHelperText}
                      id="name-course"
                      
                      label="Nombre del Curso"
                      onChange={handleCourseName}
                      required
                      />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4}>
                      <InputText
                      autoFocus={true}
                      capitalize
                      defaultValue={props.course ? course.description:""}
                      error={descriptionError}
                      helperText={descriptionHelperText}
                      id="description-course"
                      
                      label="Descripción"
                      onChange={handleDescription}
                      required
                      />
                  </Grid>
                  



              </Box>
          </Fade>

      </Modal>
      
      </>
  );
};
