import React, { useState, useContext } from "react";
import {
  Alert,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import InputText from "../../../components/InputText";
import { AuthContext } from "../../../auth/authContext";
import TitleLabel from "../../../components/TitleLabel";
import ButtonLoading from "../../../components/ButtonLoading";
import { QuestionModal } from "../../../components/QuestionModal";
import { getStudents, deleteStudentById } from "../../../lib/demoBackEndClient";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "@global": {
        "*::-webkit-scrollbar": {
          height: "10px",
          width: "10px",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "gray",
          borderRadius: "10px",
        },
      },

      "& td": {
        textTransform: "-moz-initial",
      },

      display: "table",
      tableLayout: "fixed",
      width: "100%",
      paddingLeft: "70px",
    },
    container: {
      [theme.breakpoints.up("sm")]: {
        height: "54vh",
      },

      [theme.breakpoints.down("xs")]: {
        height: "60vh",
      },
    },

    searchArea: {
      paddingBottom: theme.spacing(2),
      paddingLeft: "90px",
      width: "100vw",

      [theme.breakpoints.down("md")]: {
        width: "100vw",
      },

      [theme.breakpoints.down("sm")]: {
        width: "100%",
        paddingLeft: "80px",
        paddingBottom: theme.spacing(2),
      },
    },
    tableHead: {
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
    },
    textTableFontHeader: {
      color: "#252122",
      fontWeight: "bold",
    },
    tableBody: {
      color: "#011228",
    },
  })
);

export const HomeTable = () => {

  const classes = useStyles();
  const [filter, setFilter] = useState("");

  const { user } = useContext(AuthContext);

  const onFilterInputChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Paper className={classes.searchArea}>
        <Grid container mt={3}>

          <Grid item xs={6} sm={4} p={1} display={{ xs: "none", sm: "block" }}>
            <TitleLabel titleLabel={"¡Bienvenido " + user.name + "!"} />
          </Grid>

          <Grid item xs={6} sm={4} p={1} display={{ xs: "block", sm: "none" }}>
            <TitleLabel titleLabel={"Inicio"} />
          </Grid>

          <Grid item style={{ textAlign: "right" }} xs={6} pr={3} pt={2} display={{ xs: "block", sm: "none" }}>
            <ButtonLoading icon={<AddRoundedIcon />} label="Agregar" />
          </Grid>

          <Grid item xs={12} sm={4}>
            <InputText
              placeHolder="¿Que estas Buscando?"
              type="search"
              icon={<SearchRoundedIcon />}
              id="filter"
              onChange={onFilterInputChange}
            />
          </Grid>

          <Grid style={{ textAlign: "right" }} item display={{ xs: "none", sm: "block" }} sm={4} pr={4} pt={1}>
            <ButtonLoading icon={<AddRoundedIcon />} label="Agregar" />
          </Grid>

        </Grid>
      </Paper>
    </>
  );
};
