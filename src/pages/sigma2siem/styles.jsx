import { bgcolor } from "@mui/system";
import { spacing } from '@mui/system';

export const sigma2siemStyles = {
    verDivider:{
        width:"50px",
        ".MuiDivider-wrapper":{
            padding:"0px"
        },
        ".MuiDivider-wrapperVertical":{
            padding:"0px"
        },
        "::before":{
            borderColor:'#a3a3a3',
        },
        "::after":{
            borderColor:'#a3a3a3',
        }
    },
    gridContentLeft:{
        minHeight: "100%",
        paddingLeft:"25px",
        display: "flex",
        justifyContent: "center",
    },
    gridContentRight:{
        minHeight: "100%",
        paddingRight:"25px",
        display: "flex",
        justifyContent: "center",
    },
    center:{
        display: "flex",
        justifyContent: "center",
    },
    gridCenter:{
        // minWidth: "100%",
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
    },
    TitleBox:{
        display: "flex",
        alignItems: "center",
        minWidth: "1300px",
        minHeight: "60px",
        justifyContent: "center",
        // backgroundColor: "#fff",
    },
    appbar:{
        minHeight:'150px',
        paddingLeft:'350px',
        margin:'auto',
        bgcolor:'#018ccf',
    },
    appbarTypo:{
        flexGrow: 1 ,
        display: 'flex', 
        alignItems: 'end', 
        fontWeight:600, 
        fontSize:56,
        padding:'0 0px 10px 50px'
    }
}