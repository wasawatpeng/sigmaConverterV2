import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";
import Select from '@mui/material/Select';
// import { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { sigma2siemStyles } from './styles'
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

const Sigma2siem = () => {
  const [sigmaInput,setSigmaInput] = useState({
    format:"",
    sigmaData:""
  })
  const handleSigmaInputChange =(event)=>{
    setSigmaInput({...sigmaInput,sigmaData:event.target.value})
  }
  const [format, setFormat] = React.useState('');
  const handleChangeSelect = (event) => {
    setFormat(event.target.value);
    setSigmaInput({...sigmaInput, format: event.target.value})
  };
const [convertOutput,setConvertOutput] = useState("")
const convertSigmaClick=()=>{
    let ConvertData={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            content:sigmaInput
        })
    }
    let uuid = uuidv4()
    console.log(sigmaInput)
    fetch("http://localhost:5000/api/sigmaConverter/"+uuid,ConvertData)
        //.then(console.log(data))
        .then(response => response.json())
        .then(data=>{
            console.log(data.output)
            setConvertOutput(data.output)
            // document.getElementById('sigmaConvertOutput').removeAttribute("disabled");
        })
        .catch(error=>console.log(error))
  }
  return (
    <div>
    <Grid
      maxWidth="1300px"
      disableGutters
      sx={{
        backgroundColor:'#fff',
        border: 1,
        borderRadius: '16px',
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
        sx={sigma2siemStyles.gridCenter}
      >
        <Box
          sx={
            sigma2siemStyles.TitleBox
          }
        >
          <Grid container sx={{width:'100%'}}>
            <Grid width='50%'>
              <Grid sx={{textAlign:"center"}}>
                <h3 style={{color:"black", fontWeight:"800"}}>
                  Sigma
                </h3>
              </Grid>
            </Grid>
            {/* <Divider orientation="vertical" flexItem sx={{minHeight:'640px'}}
            ></Divider> */}
            <Grid width='50%'>
              <Grid sx={{textAlign:"center"}}>
                <h3 style={{color:"black", fontWeight:"800"}}>
                    SIEM
                  </h3>
              </Grid>
            </Grid>
            <Box width="100%">
              <Divider orientation='horizontal' sx={{ bgcolor: "#a3a3a3" }}></Divider>
            </Box>
            <Grid width="625px" sx={sigma2siemStyles.gridContentLeft}>
              <Box
                sx={{
                  padding:'10px 0 20px 0',
                  width: 580,
                  minHeight: 640,
                  maxWidth: '100%',
                }}
              >
                  <TextField onChange={handleSigmaInputChange} id="sigmaruleInput" placeholder="Place Sigma rule here" fullWidth multiline rows={25} margin="normal"/>
              </Box>
            </Grid>
              <Divider orientation="vertical" flexItem sx={sigma2siemStyles.verDivider}>
                <IconButton onClick={convertSigmaClick} color="primary" aria-label="convert" sx={{padding:'0px'}}>
                  <ArrowCircleRightRoundedIcon fontSize="inherit" sx={{width:'50px',height:"50px"}}></ArrowCircleRightRoundedIcon>
                </IconButton>
              </Divider>
            <Grid xs sx={sigma2siemStyles.gridContentRight}>
              <Box
                sx={{
                  padding:'10px 0 20px 0',
                  width: 580,
                  minHeight: 640,
                  maxWidth: '100%',
                }}
              >
                <Box sx={{ maxWidth: 200, paddingTop:'10px'}}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="format-label">SIEM</InputLabel>
                        <Select
                          labelId="event-label"
                          id="event"
                          value={format}
                          label="format"
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
                  <TextField id="siemOutput" value={convertOutput} placeholder="Click convert button to get SIEM rule" fullWidth multiline rows={23} margin="normal"/>
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

export default Sigma2siem;
