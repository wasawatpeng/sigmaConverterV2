const drawerWidth = 350;
export const navbarStyles = {
    drawer:{
        width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2e2e2e",
          },
    },
    toolbar:{
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        padding: "10px 0 10px 0",
        margin: "0 20px 0 20px",
    },
    icons:{

    },
    text:{
        '& span':{
            marginLeft:'-10px',
            fontWeight:600,
            fontSize:18
        }
    }
}