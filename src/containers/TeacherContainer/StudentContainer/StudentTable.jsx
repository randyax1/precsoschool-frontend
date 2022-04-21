import React, { useEffect, useState, useContext } from "react";

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

const columns = [
  {
    label: "Nombre",
  },
  {
    label: "Apellido",
  },
  {
    label: "Email",
  },
  {
    label: "Editar",
  },
  {
    label: "Eliminar",
  },
];

export const StudentTable = () => {

  const classes = useStyles();

  const [filter, setFilter] = useState("");

  const { user } = useContext(AuthContext);
  const token = user.token;

  const [students, setStudents] = useState([]);

  const [studentToEdit, setStudentToEdit] = useState();
  const [studentIdToEdit, setStudentIdToEdit] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAlert, setOpenAlert] = useState(false);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [deleteStudentModalOpen, setDeleteStudentModalOpen] = useState(false);
  const [studentToBeDelete, setStudentToBeDelete] = useState("");

  const fetchStudents = async () => {
    let precsoSchoolAppResponse = await getStudents(token);
    setStudents(precsoSchoolAppResponse.data.Students);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const onFilterInputChange = (event) => {
    setFilter(event.target.value);
  };

  const handleStudentModalClose = () => {
    setStudentModalOpen(false);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const onStudentModalAcceptClick = async () => {
    await fetchStudents();
  };

  const onEditStudentButtonClick = (student) => {
    setStudentToEdit(student);
    setStudentIdToEdit(student);
    setStudentModalOpen(true);
  };

  const onDeleteStudentIconClick = (student) => {
    setDeleteStudentModalOpen(true);
    setStudentToBeDelete(student._id);
  };

  const onStudentDeleted = async () => {
    setDeleteStudentModalOpen(false);
    await deleteStudentById(studentToBeDelete, token);
    setOpenAlert(true);
    await fetchStudents();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper className={classes.searchArea}>

        <Grid container mt={3}>

          <Grid item xs={6} sm={4} p={1} display={{ xs: "none", sm: "block" }}>
            <TitleLabel titleLabel="Estudiantes" />
          </Grid>

          <Grid item xs={6} sm={4} p={1} display={{ xs: "block", sm: "none" }}>
            <TitleLabel titleLabel="Alumnos" />
          </Grid>

          <Grid style={{ textAlign: "right" }} item xs={6} pr={3} pt={2} display={{ xs: "block", sm: "none" }}>
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

      <Paper elevation={5} variant="outlined" className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <caption>***N/P = No proporcionado***</caption>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    style={{ backgroundColor: "#e6e6e6" }}
                    className={classes.tableHead}
                    key={index}
                    align={"left"}
                  >
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      className={classes.textTableFontHeader}
                      variant="h6"
                    >
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                //eslint-disable-next-line
                students &&
                  !!students.length &&
                  students
                    .filter((item) => {
                      //eslint-disable-next-line
                      if (filter == "") {
                        return item;
                      } else if (
                        item.name.toLowerCase().includes(filter.toLowerCase())
                      ) {
                        return item;
                      } else if (
                        item.lastName
                          .toLowerCase()
                          .includes(filter.toLowerCase())
                      ) {
                        return item;
                      } else if (
                        item.email.toLowerCase().includes(filter.toLowerCase())
                      ) {
                        return item;
                      }
                    })
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((item, index) => {
                      return (
                        <TableRow hover role="checkbox" key={index}>
                          <TableCell align="left">
                            <Typography
                              variant="subtitle1"
                              className={classes.tableBody}
                            >
                              {item.name}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <Typography
                              variant="subtitle1"
                              className={classes.tableBody}
                            >
                              {item.lastName}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <Typography
                              variant="subtitle1"
                              className={classes.tableBody}
                            >
                              {item.email}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <IconButton
                              onClick={() => onEditStudentButtonClick(item)}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>

                          <TableCell>
                            <IconButton
                              style={{ marginLeft: "15px" }}
                              onClick={() => onDeleteStudentIconClick(item)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={"Filas por Página"}
          labelDisplayedRows={({ from, to, count }) =>
            `Mostrando ${from}-${to} de ${count}`
          }
          backIconButtonText={"Página Anterior"}
          nextIconButtonText={"Siguiente Página"}
          rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <QuestionModal
        open={deleteStudentModalOpen}
        setOpen={setDeleteStudentModalOpen}
        onCancel={() => setDeleteStudentModalOpen(false)}
        onConfirm={() => onStudentDeleted()}
        title={"Eliminar estudiante"}
        body={"¿Estás seguro que deseas eliminar este estudiante?"}
      />

      <Snackbar
        open={openAlert}
        autoHideDuration={7000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} variant="filled" severity="success">
          El estudiante a sido eliminado.
        </Alert>
      </Snackbar>
    </>
  );
};
