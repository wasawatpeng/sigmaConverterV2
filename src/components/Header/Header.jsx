import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { headerStyles } from "./styles";

const Header = ({ title }) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={headerStyles.appbar}>
            <Typography component="div" sx={headerStyles.appbarTypo}>
              {title}
            </Typography>
          </AppBar>
        </Box> 
    )
}

export default Header