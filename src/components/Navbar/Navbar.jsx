import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./const/navbarItems";
import { navbarStyles } from "./const/styles";
import ConstructionIcon from "@mui/icons-material/Construction";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import { useParams,useNavigate } from "react-router-dom"

const Navbar = () => {
  const drawerWidth = 350;
  const navigate = useNavigate();
  return (
    <div>
      <Drawer
        sx={
          navbarStyles.drawer
        }
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={
            navbarStyles.toolbar
          }
        >
          <img
            alt=""
            src="https://icon-library.com/images/sigma-icon/sigma-icon-10.jpg"
            width="56"
            height="56"
            style={{ paddingRight: "10px" }}
          />
          SIGMA CONVERTER
        </Toolbar>
        <Divider sx={{ bgcolor: "#ebebeb" }}></Divider>
          <List disablePadding sx={{ color: "#fff" }}>
            <ListItem disablePadding>
              <ListItemButton 
                disabled 
                sx={{
                  "&.Mui-disabled": {
                    opacity: 1,
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  <ConstructionIcon fontSize="large"></ConstructionIcon>
                </ListItemIcon>
                <ListItemText
                  primary="Tools"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: "bold",
                    lineHeight: "40px",
                    mb: "2px",
                  }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ bgcolor: "#ebebeb" }}></Divider>
            {mainNavbarItems.map((item, index) => (
              <Box
                sx={{
                  color: "#fff" 
                }}
              >
              <ListItem 
                key={item.id} 
                disablePadding
                onClick={()=>{
                    if(item.route=="download")
                      window.open('https://drive.google.com/file/d/19VG2-X1EsPVsb-i9PPbNqRCJ-e2CY6mA/view','_blank', 'noopener,noreferrer')
                    else 
                      navigate(item.route)
                  }
                }
              >
                <ListItemButton 
                  
                  sx={{
                  ":hover":{
                    backgroundColor:'rgb(128, 128, 128,0.1)'
                  }
                }}>
                  <ListItemIcon sx={{ color:'#fff' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    sx={{ fontSize: 18, fontWeight: "bold" }}
                  >
                    {item.label}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              </Box>
            ))}

          </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
