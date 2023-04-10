import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useRef,useState } from "react";

const ButtonIcon = ({ icon, isFileInput, fileChangeFunction, refInput, onClickFunc}) => {
  
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        textAlign: "end",
        bottom: "0",
      }}
    >
      <IconButton
        size="small"
        style={{ color: "a3a3a3" }}
        sx={{ bgcolor: "transparent", border: 0 }}
        onClick={onClickFunc}
      >
        {icon}
        <input 
        onChange={fileChangeFunction}
        ref={refInput} 
        type="file" 
        style={{ display: 'none' }} 
      />
      </IconButton>
    </Box>
  );
};

export default ButtonIcon;
