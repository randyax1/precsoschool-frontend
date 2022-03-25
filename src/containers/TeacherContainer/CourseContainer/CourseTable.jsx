import React, { useEffect, useState, useContext} from "react";
import moment from "moment";
import "moment/locale/es-mx"

import {
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
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import InputText from "../../../components/InputText";
import { AuthContext } from "../../../auth/authContext";
import { getCourses } from "../../../lib/demoBackEndClient";

moment.locale("es-mx");

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
      backgroundColor: "white",
      color: "#011228",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
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
    label: "Descripción",
  },
  {
    label: "Fecha de inicio",
  },
  {
    label: "Fecha termino",
  },
  {
    label: "Editar",
  },
  {
    label: "Eliminar",
  },
];

export const CourseTable = () => {

  const classes = useStyles();

  const [filter, setFilter] = useState("");

  const { user } = useContext(AuthContext);
  const token = user.token;

  const [courses, setCourses] = useState([]);

  const [courseToEdit, setCourseToEdit] = useState();
  const [courseIdToEdit, setCourseIdToEdit] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAlert, setOpenAlert] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [deleteCourseModalOpen, setDeleteCourseModalOpen] = useState(false);
  const [courseToBeDelete, setCourseToBeDelete] = useState("");

  const fetchCourses = async () => {
    let precsoSchoolAppResponse = await getCourses(token);
    setCourses(precsoSchoolAppResponse.data.events);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const onFilterInputChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCourseModalClose = () => {
    setCourseModalOpen(false);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const onCourseModalAcceptClick = async () => {
    await fetchCourses();
  };

  const onEditCourseButtonClick = (course) => {
    setCourseToEdit(course);
    setCourseIdToEdit(course);
    setCourseModalOpen(true);
  };

  const onDeleteCourseIconClick = (course) => {
    setDeleteCourseModalOpen(true);
    setCourseToBeDelete(course._id);
  };

  const onCourseDeleted = async () => {
    setDeleteCourseModalOpen(false);
    //Falta peticion de retorno de id
    setOpenAlert(true);
    await fetchCourses();
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
        <InputText
          type="search"
          icon={<SearchRoundedIcon />}
          id="filter"
          onChange={onFilterInputChange}
          label="¿Que estas buscando?"
        />
      </Paper>

      <Paper variant="outlined" className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <caption>***N/P = No proporcionado***</caption>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    className={classes.tableHead}
                    key={index}
                    align={"left"}
                  >
                    <Typography variant="h6">{column.label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                //eslint-disable-next-line
                courses && !!courses.length && courses.filter((item) => {
                      //eslint-disable-next-line
                      if (filter == "") {
                        return item;
                      } else if (
                        item.name.toLowerCase().includes(filter.toLowerCase())
                      ) {
                        return item;
                      } else if (
                        item.description
                          .toLowerCase()
                          .includes(filter.toLowerCase())
                      ) {
                        return item;
                      }
                    })
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
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
                              {item.description}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <Typography
                              variant="subtitle1"
                              className={classes.tableBody}
                            >
                              {moment(item.start).format("LL")}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <Typography
                              variant="subtitle1"
                              className={classes.tableBody}
                            >
                              {moment(item.end).format("LL")}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <IconButton
                              onClick={() => onEditCourseButtonClick(item)}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>

                          <TableCell align="center">
                            <IconButton
                              onClick={() => onDeleteCourseIconClick(item)}
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
          labelDisplayedRows={({ from, to, count }) => `Mostrando ${from}-${to} de ${count}`}
          backIconButtonText={"Página Anterior"}
          nextIconButtonText={"Siguiente Página"}
          rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
          component="div"
          count={courses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

    </>
  );
};
