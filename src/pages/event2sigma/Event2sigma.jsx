import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { evt2sigmaStyles } from "./styles";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
// import { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import Fab from "@mui/material/Fab";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ButtonIcon from "../../components/common/ButtonIcon/ButtonIcon";
import { useCallback } from "react";
import {useRef,useEffect} from "react";


const Event2sigma = () => {
  const refEvtInput = useRef(null)
  const [evtInput, setEvtInput] = useState({
    title: "",
    author: "",
    level: "",
    desc: "",
    format: "",
    evtData: "",
  });
  // useEffect(() => {
  //   console.log(evtInput.evtData);
  // }, [evtInput]);
  const handleEvtInputChange = (event) => {
    // console.log(evtInput)
    // console.log(refEvtInput.current.value)
    setEvtInput({ ...evtInput, [event.target.id]: event.target.value });
    // console.log("change")
    // console.log(evtInput.evtData)
  };
  const [evtFormat, setEvtFormat] = React.useState("");
  const handleChangeSelect = (event) => {
    setEvtInput({ ...evtInput, format: event.target.value });
    setEvtFormat(event.target.value);
    // console.log(event.target.value)
    // console.log(evtInput)
  };
  const refOutput = useRef(null) 
  const [Evt2SigmaOutput, setEvt2SigmaOutput] = useState("");
  const Evt2SigmaOutputHandle = (e) =>{
    setEvt2SigmaOutput(e.target.value)
  }
  const convertEvtClick = () => {
    // console.log(refEvtInput.current.value)
    if(evtInput.format == ""){
      console.log("Please select format")
    }
    else {
      console.log(evtInput.evtData)
      let ConvertData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: evtInput,
        }),
      };
      console.log(evtInput);
      console.log(ConvertData);
      let uuid = uuidv4();
      fetch("http://localhost:5000/api/EvtToSigma/" + uuid, ConvertData)
        //.then(console.log(data))
        .then((response) => response.json())
        .then((data) => {
          console.log(data.output);
          refOutput.current.value = data.output
          setEvt2SigmaOutput(data.output);
          setOpenLoading(false);
          // document.getElementById('sigmaOutput').removeAttribute("disabled");
          // document.getElementById('sigmaOutput').focus();
        })
        // .then(({data,response})=>{
        // console.log(data)
        //console.log(response)
        // })
        .catch((error) => console.log(error));
    }
  };
  const [OpenLoading, setOpenLoading] = React.useState(false);
  // const handleCloseLoading = () => {
  //   setOpenLoading(false);
  // };
  const fileInput = useRef();
  const fileInputHandleClick = () =>{
    fileInput.current.click()
  }
  const handleFileChange = (event) =>{
    const file_obj = event.target.files && event.target.files[0]
    if (!file_obj){
        return
    }
    // console.log(file_read)
    // console.log('fileObj is', file_obj);
    // console.log(event.target.files);
    // console.log(file_obj);
    event.target.value = null;
    let reader = new FileReader();
    reader.onload = function(event) {
        const readText = event.target.result
        refEvtInput.current.value=readText
        // console.log(refEvtInput)
        setEvtInput({...evtInput, evtData: readText})
    };
    reader.readAsText(file_obj)
    event.target.value = null
  }
  const copyClickFunc = () =>{
    navigator.clipboard.writeText(Evt2SigmaOutput)
  }
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
          sx={evt2sigmaStyles.gridCenter}
        >
          <Box sx={evt2sigmaStyles.TitleBox}>
            <Grid container sx={{ width: "100%" }}>
              <Grid width="50%">
                <Grid sx={{ textAlign: "center" }}>
                  <h3 style={{ color: "black", fontWeight: "800" }}>Event</h3>
                </Grid>
              </Grid>
              {/* <Divider orientation="vertical" flexItem sx={{minHeight:'640px'}}
              ></Divider> */}
              <Grid width="50%">
                <Grid sx={{ textAlign: "center" }}>
                  <h3 style={{ color: "black", fontWeight: "800" }}>Sigma</h3>
                </Grid>
              </Grid>
              <Box width="100%">
                <Divider
                  orientation="horizontal"
                  sx={{ bgcolor: "#a3a3a3" }}
                ></Divider>
              </Box>
              <Grid width="625px" sx={evt2sigmaStyles.gridContentLeft}>
                <Box
                  sx={{
                    padding: "10px 0 20px 0",
                    width: 580,
                    minHeight: 640,
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    onChange={handleEvtInputChange}
                    id="title"
                    fullWidth
                    label="Title"
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    onChange={handleEvtInputChange}
                    id="author"
                    label="Author"
                    variant="outlined"
                    margin="dense"
                    sx={{ width: "60%", marginRight: "11.6px" }}
                  />
                  <TextField
                    onChange={handleEvtInputChange}
                    id="level"
                    label="Level"
                    variant="outlined"
                    margin="dense"
                    sx={{ width: "38%" }}
                  />
                  <TextField
                    onChange={handleEvtInputChange}
                    id="desc"
                    fullWidth
                    label="Description"
                    variant="outlined"
                    margin="dense"
                  />
                  <Box sx={{ maxWidth: 150, paddingTop: "10px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="event-label">Event format</InputLabel>
                      <Select
                        labelId="event-label"
                        id="format"
                        value={evtFormat}
                        label="Event format"
                        defaultValue="none"
                        onChange={handleChangeSelect}
                        // variant="standard"
                      >
                        {/* <MenuItem value="XML">XML</MenuItem> */}
                        <MenuItem value="YAML">YAML</MenuItem>
                        {/* <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box
                    style={{
                      position: "relative",
                    }}
                  >
                    <TextField
                      inputRef={refEvtInput}
                      onChange={handleEvtInputChange}
                      id="evtData"
                      placeholder="Select event log format and place event here"
                      fullWidth
                      multiline
                      rows={12}
                      sx={{ marginBottom: 0, marginTop: "10px", }}
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
                    >
                    </ButtonIcon>
                  </Box>
                </Box>
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                sx={evt2sigmaStyles.verDivider}
              >
                <IconButton
                  onClick={convertEvtClick}
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
              <Grid xs sx={evt2sigmaStyles.gridContentRight}>
                <Box
                  sx={{
                    padding: "10px 0 20px 0",
                    width: 580,
                    minHeight: 640,
                    maxWidth: "100%",
                  }}
                >
                <Box
                  style={{ position: "relative" }}
                >
                  <TextField
                    id="sigmaOutput"
                    inputRef={refOutput}
                    onChange={Evt2SigmaOutputHandle}
                    placeholder="Click convert button to get Sigma rule"
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
                    icon={<ContentCopyIcon></ContentCopyIcon>}
                    onClickFunc={copyClickFunc}
                  >
                  </ButtonIcon>
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

export default Event2sigma;
