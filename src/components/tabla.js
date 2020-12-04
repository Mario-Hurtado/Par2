import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { FormattedMessage } from "react-intl";
import VisualD3 from "./visualizacionD3";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 540,
  },
  root: {
    marginTop: 20,
    flexGrow: 1,
    //marginRight: 5,
    marginBottom: 0,
    paddingBottom: 0,
    //width: "100%",
  },
  hover: {
    cursor: "pointer",
  },
});

const SeriesTable = () => {
  const userLang = navigator.language || navigator.userLanguage;
  const classes = useStyles();
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      console.log(localStorage.getItem("series"));
      if (localStorage.getItem("series") === null) {
        setSeries([
          {
            name: "Error",
            id: 0,
            channel: "Connecting with",
            description: "API",
          },
        ]);
      } else {
        setSeries(JSON.parse(localStorage.getItem("series")));
      }
    }
    if (userLang.includes("es")) {
      fetch(
        "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json"
      )
        .then((response) => response.json())
        .then((response) => {
          setSeries(response);
          localStorage.setItem("series", JSON.stringify(response));
        });
    } else {
      fetch(
        "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json"
      )
        .then((response) => response.json())
        .then((response) => {
          setSeries(response);
          localStorage.setItem("series", JSON.stringify(response));
        });
    }
  }, [userLang]);

  return (
    <Container fluid="true">
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.root}>
          <h1>Series</h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">
                    <strong>#</strong>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <strong>
                      <FormattedMessage id="Name" />
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <strong>
                      <FormattedMessage id="Channel" />
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <strong>
                      {" "}
                      <FormattedMessage id="Description" />{" "}
                    </strong>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {series.map((serie) => (
                  <StyledTableRow key={serie.id} className={classes.hover}>
                    <StyledTableCell component="th" scope="row">
                      {serie.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{serie.name}</StyledTableCell>
                    <StyledTableCell align="left">
                      {serie.channel}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {serie.description}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {series !== [] ? (
          <Grid item xs={8}>
            <h1>
              <FormattedMessage id="Seasons" />
            </h1>
            <VisualD3 series={series} />
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
};

export default SeriesTable;
