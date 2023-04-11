import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { siem2siemStyles } from "./styles";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonIcon from "../../components/common/ButtonIcon/ButtonIcon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { useRef } from "react";

const Siem2siem = () => {
  const refSigmaInput = useRef(null);
  const [sigmaInput, setSigmaInput] = useState({
    formatOut: "",
    formatIn: "",
    sigmaData: "",
  });
  const handleSigmaInputChange = (event) => {
    setSigmaInput({ ...sigmaInput, sigmaData: event.target.value });
  };
  const [formatOut, setFormatOut] = React.useState("");
  const [formatIn, setFormatIn] = React.useState("");
  const handleChangeSelect = (event) => {
    setFormatOut(event.target.value);
    setSigmaInput({ ...sigmaInput, formatOut: event.target.value });
  };
  const refOutput = useRef(null)
  const [convertOutput, setConvertOutput] = useState("");
  const convertOutputHandleChange = (event) =>{
    setConvertOutput(event.target.value);
  }
  const convertSigmaClick = () => {
    setOpenLoading(!setOpenLoading);
    let ConvertData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: sigmaInput,
      }),
    };
    let uuid = uuidv4();
    console.log(sigmaInput);
    fetch("http://localhost:5000/api/sigmaConverter/" + uuid, ConvertData)
      //.then(console.log(data))
      .then((response) => response.json())
      .then((data) => {
        console.log(data.output);
        refOutput.current.value = data.output
        setConvertOutput(data.output);
        setOpenLoading(false);
        // document.getElementById('sigmaConvertOutput').removeAttribute("disabled");
      })
      .catch((error) => console.log(error));
  };
  const [OpenLoading, setOpenLoading] = React.useState(false);
  const fileInput = useRef();
  const fileInputHandleClick = () => {
    fileInput.current.click();
  };
  const handleFileChange = (event) => {
    const file_obj = event.target.files && event.target.files[0];
    if (!file_obj) {
      return;
    }
    // console.log(file_read)
    // console.log('fileObj is', file_obj);
    // console.log(event.target.files);
    // console.log(file_obj);
    event.target.value = null;
    let reader = new FileReader();
    reader.onload = function (event) {
      const readText = event.target.result;
      refSigmaInput.current.value = readText;
      // console.log(refSigmaInput)
      setSigmaInput({ ...sigmaInput, sigmaData: readText });
    };
    reader.readAsText(file_obj);
    event.target.value = null;
  };
  const copyClickFunc = () => {
    navigator.clipboard.writeText(convertOutput);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={OpenLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        maxWidth="1300px"
        disableGutters
        sx={{
          backgroundColor: "#fff",
          border: 1,
          borderRadius: "16px",
          borderColor: "#a3a3a3",
          // padding: "10px",
          minWidth: "1300px",
          minHeight: "700px",
        }}
      >
        <Grid
          container
          alignItems="center"
          justify="center"
          sx={siem2siemStyles.gridCenter}
        >
          <Box sx={siem2siemStyles.TitleBox}>
            <Grid container sx={{ width: "100%" }}>
              <Grid width="50%">
                <Grid sx={{ textAlign: "center" }}>
                  <h3 style={{ color: "black", fontWeight: "800" }}>Sigma</h3>
                </Grid>
              </Grid>
              {/* <Divider orientation="vertical" flexItem sx={{minHeight:'640px'}}
            ></Divider> */}
              <Grid width="50%">
                <Grid sx={{ textAlign: "center" }}>
                  <h3 style={{ color: "black", fontWeight: "800" }}>SIEM</h3>
                </Grid>
              </Grid>
              <Box width="100%">
                <Divider
                  orientation="horizontal"
                  sx={{ bgcolor: "#a3a3a3" }}
                ></Divider>
              </Box>
              <Grid width="625px" sx={siem2siemStyles.gridContentLeft}>
                <Box
                  sx={{
                    padding: "10px 0 20px 0",
                    width: 580,
                    minHeight: 640,
                    maxWidth: "100%",
                  }}
                >
                  <Box sx={{ maxWidth: 200, paddingTop: "10px" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="formatIn-label">SIEM</InputLabel>
                      <Select
                        labelId="event-label"
                        id="event"
                        value={formatIn}
                        label="formatIn"
                        defaultValue="none"
                        onChange={handleChangeSelect}
                        // variant="standard"
                      >
                        <MenuItem value="IBM Qradar">IBM Qradar</MenuItem>
                        <MenuItem value="Splunk">Splunk</MenuItem>
                        <MenuItem value="Elastic">Elastic</MenuItem>
                        <MenuItem value="LogRhythm">LogRhythm</MenuItem>
                        <MenuItem value="Sumo Logic">Sumo Logic</MenuItem>
                        {/* <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box style={{ position: "relative" }}>
                    <TextField
                      inputRef={refSigmaInput}
                      onChange={handleSigmaInputChange}
                      id="sigmaruleInput"
                      placeholder="Place Sigma rule here"
                      fullWidth
                      multiline
                      rows={23}
                      sx={{ marginTop: "16px", marginBottom: 0 }}
                    />
                    <ButtonIcon
                      icon={<UploadFileOutlinedIcon></UploadFileOutlinedIcon>}
                      fileChangeFunction={handleFileChange}
                      refInput={fileInput}
                      onClickFunc={fileInputHandleClick}
                    ></ButtonIcon>
                  </Box>
                </Box>
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                sx={siem2siemStyles.verDivider}
              >
                <IconButton
                  onClick={convertSigmaClick}
                  color="primary"
                  aria-label="convert"
                  sx={{ padding: "0px" }}
                >
                  <ArrowCircleRightRoundedIcon
                    fontSize="inherit"
                    sx={{ width: "50px", height: "50px" }}
                  ></ArrowCircleRightRoundedIcon>
                </IconButton>
              </Divider>
              <Grid xs sx={siem2siemStyles.gridContentRight}>
                <Box
                  sx={{
                    padding: "10px 0 20px 0",
                    width: 580,
                    minHeight: 640,
                    maxWidth: "100%",
                  }}
                >
                  <Box sx={{ maxWidth: 200, paddingTop: "10px" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="formatOut-label">SIEM</InputLabel>
                      <Select
                        labelId="event-label"
                        id="event"
                        value={formatOut}
                        label="formatOut"
                        defaultValue="none"
                        onChange={handleChangeSelect}
                        // variant="standard"
                      >
                        <MenuItem value="IBM Qradar">IBM Qradar</MenuItem>
                        <MenuItem value="Splunk">Splunk</MenuItem>
                        <MenuItem value="Elastic">Elastic</MenuItem>
                        <MenuItem value="LogRhythm">LogRhythm</MenuItem>
                        <MenuItem value="Sumo Logic">Sumo Logic</MenuItem>
                        {/* <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box style={{ position: "relative" }}>
                    <TextField
                      id="siemOutput"
                      inputRef={refOutput}
                      onChange={convertOutputHandleChange}
                      placeholder="Click convert button to get SIEM rule"
                      fullWidth
                      multiline
                      rows={23}
                      sx={{ marginTop: "12px", marginBottom: 0 }}
                    />
                    <ButtonIcon
                      icon={<ContentCopyIcon></ContentCopyIcon>}
                      onClickFunc={copyClickFunc}
                    ></ButtonIcon>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box width="100%"></Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Siem2siem;