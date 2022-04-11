import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Grid, Button, Modal, Box } from "@mui/material";

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
    },
    grid: {
      display: "flex",
      width: "400px",
      height: "220px",
      margin: "auto",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "8px",
    },
    topRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "32%",
    },
    middleRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "solid #EBEBEB",
      borderWidth: "thin 0px",
      height: "36%",
    },
    bottomRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "32%",
    },
    textFont: {
      fontFamily: "sans-serif",
      fontSize: "20px",
      fontWeight: "bold",
    },
    textFontSecondary: {
      fontFamily: "sans-serif",
      fontSize: "14px",
    },
    buttonCancel: {
      height: "70%",
    },
    buttonAcept: {
      color: "white",
      backgroundColor: "#011228",
      height: "70%",

      "&:hover": {
        backgroundColor: "#red",
      },
    }
  })
);

export const QuestionModal = (props) => {
    
    const classes = useStyles();

    const handleClose = () => {
        props.setOpen(false);
      };

  return (
      <Modal open={props.open} className={classes.modal}>
          <Box container className={classes.grid}>
              <Grid container>
              <Grid item xs={12} className={classes.topRow}>
                  <label htmlFor="text" className={classes.textFont}>
                      {props.title}
                  </label>
              </Grid>

              <Grid item xs={12} className={classes.middleRow}>
                  <label htmlFor="text" className={classes.textFontSecondary}>
                      {props.body}
                  </label>
              </Grid>

              <Grid item xs={6} className={classes.bottomRow}>
                  <Button onClick={handleClose} className={classes.buttonCancel}>
                      Cancelar
                  </Button>
              </Grid>

              <Grid item xs={6} className={classes.bottomRow}>
                  <Button
                  className={classes.buttonAcept}
                  variant="contained"
                  onClick={props.onConfirm}
                  >
                      {" "}
                      Confirmar   
                  </Button>
              </Grid>
              </Grid>
          </Box>
      </Modal>
  )
};
