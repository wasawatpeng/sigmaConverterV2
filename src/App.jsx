import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import { makeStyles } from 'tss-react/mui';
import { useLocation } from "react-router-dom";
import { AppStyles } from "./styles";

const useStyles = makeStyles({
  grid:{
    background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "350px",
    paddingTop: "150px",
  }
})

function App() {
  const classes = useStyles();
  const [title, setTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, " ");
    console.log(parsedTitle);
    if (parsedTitle === " event2sigma") {
      setTitle("Event to Sigma");
      // console.log(1);
    } else if (parsedTitle === " sigma2siem") {
      setTitle("Sigma to SIEM");
      // console.log(2);
    } else if (parsedTitle === " sigma2atk") {
      setTitle("Sigma to Attack");
      // console.log(3);
    } else {
      setTitle("Home");
    }
  }, [location]);

  return (
    <Grid container>
      <Navbar />
      <Header title={title} />
      <Box width="100%"></Box>
      <Grid
        alignItems="center"
        justify="center"
        sx={
          AppStyles.grid
        }
      >
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default App;
