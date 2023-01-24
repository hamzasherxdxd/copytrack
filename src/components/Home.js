import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProjectDashboard from "./ProjectDashboard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [emailNotification, setEmailNotification] = useState(false);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const fetchProjects = (e) => {
    axios.get("/api/project").then((response) => {
      setProjects(response.data.projects);
      console.log(projects);
    });
  };
  useEffect(() => {
    fetchProjects();
  }, [response]);

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };
  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };
  const handleCreateProjectFormOpen = (e) => {
    setDialogOpen(true);
  };
  const handleCreateProjectFormClose = (e) => {
    setDialogOpen(false);
  };
  const handleEmailNotificationChange = (e) => {
    setEmailNotification(e.target.checked);
  };
  const handleCreateProject = (e) => {
    const options = {
      url: "http://localhost:3000/api/project",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      withCredentials: true,
      data: {
        project_name: projectName,
        description: projectDescription,
        email_notification: emailNotification,
      },
    };
    axios(options).then((res) => {
      console.log(res.status);
      setResponse(res.status);
      setDialogOpen(false);
    });
  };

  const projectPage = (e, id) => {
    navigate(`/project/${id}`);
  }

  return (
    <Grid container spacing={2}>
      {projects.map((project) => (
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                {project.project_name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {project.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="small" onClick={(e) => projectPage(e, project.project_id)}>
                Dashboard
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Grid item xs={2}>
        <Button
          variant="outlined"
          size="small"
          onClick={(e) => handleCreateProjectFormOpen(e)}
        >
          Add New Project
        </Button>
      </Grid>
      <Dialog open={dialogOpen} onClose={handleCreateProjectFormClose}>
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleProjectNameChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Description"
            type="textarea"
            fullWidth
            variant="standard"
            onChange={(e) => handleProjectDescriptionChange(e)}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch onChange={(e) => handleEmailNotificationChange(e)} />
              }
              label="Email Notifications"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateProjectFormClose}>Cancel</Button>
          <Button onClick={handleCreateProject}>Create Project</Button>
        </DialogActions>
      </Dialog>
      {/* <Card variant="outlined">{card}</Card> */}
    </Grid>
  );
};

export default Home;
