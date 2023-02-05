import {
  Typography,
  Button,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import ReportTable from './Table';
import { Box } from "@mui/system";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ProjectDashboard = () => {
  const { id } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [project, setProject] = useState();
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState("");
  const [views, setViews] = useState([]);
  const [dateValue, setDateValue] = useState(dayjs(Date.now()));
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  const [bounces, setBounces] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [sessions, setSessions] = useState([
    // {
    //   name: "sessions",
    //   detail: [],
    // },
    // {
    //   name: "bounces",
    //   detail: [],
    // },
    // {
    //   name: "transactions",
    //   detail: [],
    // },
  ]);

  const fetchProject = async (id) => {
    await axios
      .get(`/api/project/${id}`)
      .then((response) => {
        // console.log(response.data);
        setProject(response.data.project);
      })
      .catch((err) => console.log(err.message));
  };
  const fetchUrl = async () => {
    await axios.get(`/api/project/${id}/url`).then((response) => {
      // console.log(response.data.url);
      setUrls(response.data.url);
    });

  };
  const handleCreateProjectFormOpen = (e) => {
    setDialogOpen(true);
  };
  const handleCreateProjectFormClose = (e) => {
    setDialogOpen(false);
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const handleCreateUrl = async  () => {
    const options = {
      url: `http://localhost:3000/api/project/${id}/url`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        url: url,
      },
    };
    await axios(options)
      .then((response) => {
        // console.log(response.status);
        setDialogOpen(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const fetchGa = async () => {
    const access_token = localStorage.getItem("access_token");
    const URLS = urls;
    const options = {
      url: "http://localhost:3000/api/ga",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        access_token: access_token,
      },
    };

    // console.log(localStorage.getItem("access_token"));
    await axios(options)
      .then((response) => {
        // console.log(response.data);
        setViews(response.data.views);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .get("http://localhost:3000/api/ga")
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };
  const getReports = async (view) => {
      // for ( let i = 0; i< views.length; i++){
      //   if (views[i].url !== urls[i]){
      //     views.pop(i);
      //   }
      // }
      const options = {
        url: "https://analyticsreporting.googleapis.com/v4/reports:batchGet",
        method: "POST",
        "Content-Type": "application/json",
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("access_token"),
        },
        data: {
          reportRequests: [
            {
              viewId: view,
              dateRanges: [
                {
                  startDate: "7daysago",
                  endDate: "today",
                },
              ],
              metrics: [
                {
                  expression: "ga:sessions",
                },
                {
                  expression: "ga:bounces",
                },
                {
                  expression: "ga:transactions",
                },
              ],
              dimensions: [{ name: "ga:date" }, { name: "ga:landingPagePath" }],
            },
          ],
        },
      };
      await axios(options).then((response) => {
        // console.log(response.data);
      });
  };
  useEffect(() => {
    fetchProject(id);
    fetchUrl();
    fetchGa();
  }, []);

//   const renderTable = () => {

//     return (
// <>
// <Table>
//             <TableHead>
//               <TableCell>URL</TableCell>
//               <TableCell>Date of Change</TableCell>
//               <TableCell>#</TableCell>
//               <TableCell>7 Days</TableCell>
//               <TableCell>14 Days</TableCell>
//               <TableCell>30 Days</TableCell>
//             </TableHead>
//             <TableBody>
//               {urls &&
//                 urls.map((url) => (
//                   <>
//                     <TableRow>
//                       <TableCell>{url.url}</TableCell>
//                       <TableCell>{url.pub_date}</TableCell>{" "}
//                       <TableCell>Sessions</TableCell>
//                       {sessions.map((item) => (
//                         <TableRow>
//                           <TableCell>{item}</TableCell>
//                         </TableRow>
//                       ))}
//                       </TableRow>
//                     <TableRow>
//                       <TableCell></TableCell>
//                       <TableCell></TableCell>
//                       <TableCell>Bounces</TableCell>
//                       {bounces.map((item) => (
//                         <TableRow>
//                           <TableCell>{item}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableRow>
//                     <TableRow>
//                       <TableCell></TableCell>
//                       <TableCell></TableCell>
//                       <TableCell>Transactions</TableCell>
//                       {transactions.map((item) => (
//                         <TableRow>
//                           <TableCell>{item}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableRow>
//                   </>
//                 ))}
//             </TableBody>
 
// </Table>
// </>
//     )
//   }

  return (
    <>
      {project && (
        <Box>
          <Typography variant="h4">Project: {project.project_name}</Typography>
          <Button
            variant="contained"
            onClick={(e) => handleCreateProjectFormOpen(e)}
          >
            Add URL
          </Button>
          <Button variant="contained" color="info">
            Update All
          </Button>
          <Table>
            <TableHead>
              <TableCell>URL</TableCell>
              <TableCell>Date of Change</TableCell>
              <TableCell>#</TableCell>
              <TableCell>7 Days</TableCell>
              <TableCell>14 Days</TableCell>
              <TableCell>30 Days</TableCell>
            </TableHead>
              {urls &&
                urls.map((url) => (
                  <>
                    <ReportTable url={url} />
                    {/* <TableRow>
                      <TableCell>{url.url}</TableCell>
                      <TableCell>{url.pub_date}</TableCell>{" "}
                      <TableCell>Sessions</TableCell>
                      
                      </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>Bounces</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>Transactions</TableCell>
                    
                    </TableRow> */}
                  </>
                ))}
          </Table>
          <Dialog open={dialogOpen} onClose={handleCreateProjectFormClose}>
            <DialogTitle>Add URL</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="URL"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleUrlChange(e)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Date of Change"
                    inputFormat="MM/DD/YYYY"
                    value={dateValue}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateProjectFormClose}>Cancel</Button>
              <Button onClick={handleCreateUrl}>Add Url</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default ProjectDashboard;
