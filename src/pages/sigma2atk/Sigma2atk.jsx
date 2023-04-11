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
// import { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { sigma2atkStyles } from "./styles";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonIcon from "../../components/common/ButtonIcon/ButtonIcon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import MyAlert from "../../components/common/MyAlert/MyAlert";
import Tooltip from "@mui/material/Tooltip";
import LaunchIcon from '@mui/icons-material/Launch';

const Sigma2atk = () => {
  const refSigmaInput = useRef(null);
  const [sigmaInput, setSigmaInput] = useState({
    sigmaData: "",
  });
  const handleSigmaInputChange = (event) => {
    setSigmaInput({ ...sigmaInput, sigmaData: event.target.value });
  };
  const refOutput = useRef(null);
  const [convertOutput, setConvertOutput] = useState("");
  const convertOutputHandleChange = (event) => {
    setConvertOutput(event.target.value);
  };
  const convertSigmaClick = () => {
    if (sigmaInput.sigmaData == "") {
      setOpenError_NoSigma(true);
      setTimeout(function () {
        setOpenError_NoSigma(false);
      }, 2000);
    } else {
      setOpenLoading(true);
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
      fetch("http://localhost:5000/api/sigma2atk/" + uuid, ConvertData)
        //.then(console.log(data))
        .then((response) => response.json())
        .then((data) => {
          console.log(data.output);
          refOutput.current.value = data.output;
          setConvertOutput(data.output);
          setOpenLoading(false);
          // document.getElementById('sigmaConvertOutput').removeAttribute("disabled");
        })
        .catch((error) => console.log(error));
    }
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

  const downloadFile = () => {
    const link = document.createElement("a");
    const file = new Blob([convertOutput], {
      type: "text/plain;charset=utf-8",
    });
    link.href = URL.createObjectURL(file);
    link.download = "mitre_import.json";
    // document.body.appendChild(link)
    link.click();
  };

  const toMITRE = () =>{
    window.open("https://mitre-attack.github.io/attack-navigator/", '_blank', 'noreferrer');
  }

  const [OpenError_NoSigma, setOpenError_NoSigma] = React.useState(false);

  return (
    <div>
      <Backdrop
        sx={{
          paddingTop: "150px",
          paddingLeft: "350px",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={OpenLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Backdrop
        sx={{
          paddingTop: "150px",
          paddingLeft: "350px",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={OpenError_NoSigma}
      >
        <MyAlert text="Please enter Sigma rules" />
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
          sx={sigma2atkStyles.gridCenter}
        >
          <Box sx={sigma2atkStyles.TitleBox}>
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
                  <h3 style={{ color: "black", fontWeight: "800" }}>
                    MITRE ATT&CK®
                  </h3>
                </Grid>
              </Grid>
              <Box width="100%">
                <Divider
                  orientation="horizontal"
                  sx={{ bgcolor: "#a3a3a3" }}
                ></Divider>
              </Box>
              <Grid width="625px" sx={sigma2atkStyles.gridContentLeft}>
                <Box
                  sx={{
                    padding: "10px 0 20px 0",
                    width: 580,
                    minHeight: 640,
                    maxWidth: "100%",
                  }}
                >
                  <Box style={{ position: "relative" }}>
                    <TextField
                      inputRef={refSigmaInput}
                      onChange={handleSigmaInputChange}
                      id="sigmaruleInput"
                      placeholder="Place Sigma rule here"
                      fullWidth
                      multiline
                      rows={24}
                      sx={{ marginTop: "16px", marginBottom: 0 }}
                      inputProps={{
                        style: {
                          marginBottom: "23px",
                        },
                      }}
                    />
                    <ButtonIcon
                      icon={<UploadFileOutlinedIcon></UploadFileOutlinedIcon>}
                      isFileInput={true}
                      fileChangeFunction={handleFileChange}
                      refInput={fileInput}
                      onClickFunc={fileInputHandleClick}
                      hoverText="Import file"
                    ></ButtonIcon>
                  </Box>
                </Box>
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                sx={sigma2atkStyles.verDivider}
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
              <Grid xs sx={sigma2atkStyles.gridContentRight}>
                <Box
                  sx={{
                    padding: "10px 0 20px 0",
                    width: 580,
                    minHeight: 640,
                    maxWidth: "100%",
                  }}
                >
                  <Box style={{ position: "relative" }}>
                    <TextField
                      id="siemOutput"
                      inputRef={refOutput}
                      onChange={convertOutputHandleChange}
                      placeholder="Click convert button to get MITRE ATT&CK "
                      fullWidth
                      multiline
                      rows={24}
                      sx={{ marginTop: "16px", marginBottom: 0 }}
                      inputProps={{
                        style: {
                          marginBottom: "23px",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        width: "100%",
                        position: "absolute",
                        textAlign: "end",
                        bottom: "0",
                      }}
                    >
                      <Tooltip title="Copy text" placement="top">
                        <IconButton
                          size="small"
                          style={{ color: "a3a3a3" }}
                          sx={{ bgcolor: "transparent", border: 0 }}
                          onClick={copyClickFunc}
                        >
                          <ContentCopyIcon></ContentCopyIcon>
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Download" placement="top">
                        <IconButton
                          size="small"
                          style={{ color: "a3a3a3" }}
                          sx={{ bgcolor: "transparent", border: 0 }}
                          onClick={downloadFile}
                        >
                          <DownloadIcon></DownloadIcon>
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Go to MITRE" placement="top">
                        <IconButton
                          size="small"
                          style={{ color: "a3a3a3" }}
                          sx={{ bgcolor: "transparent", border: 0 }}
                          onClick={toMITRE}
                        >
                          <LaunchIcon></LaunchIcon>
                        </IconButton>
                      </Tooltip>
                    </Box>
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

export default Sigma2atk;
