import React from 'react'
import { Alert, AlertTitle } from "@mui/material";

const MyAlert = ({text,w}) => {
  return (
    <Alert severity="error" variant="filled" 
        sx={{
            width:"300px"
            // ,'& .MuiAlert-message':{textAlign:"center", width:"inherit"}
            // ,'& .MuiAlert-icon':{textAlign:"center", width:"inherit"}
        }}>
    {text}
    </Alert>
  )
}

export default MyAlert