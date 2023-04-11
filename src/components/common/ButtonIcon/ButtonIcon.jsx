import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useRef, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

const ButtonIcon = ({
  icon,
  isFileInput,
  fileChangeFunction,
  refInput,
  onClickFunc,
  hoverText,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        textAlign: "end",
        bottom: "0",
      }}
    >
      <Tooltip title={hoverText} placement="top">
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
            style={{ display: "none" }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ButtonIcon;
