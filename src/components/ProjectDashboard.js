import {
  Typography,
  Button,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDashboard = () => {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [urls, setUrls] = useState([]);
  const fetchProject = (id) => {
    axios
      .get(`/api/project/${id}`)
      .then((response) => {
        console.log(response.data);
        setProject(response.data.project);
      })
      .catch((err) => console.log(err.message));
  };
  const fetchUrl = () => {
    axios.get(`/api/project/${id}/url`).then((response) => {
      console.log(response.data.url);
      setUrls(response.data.url);
    });
  };
  useEffect(() => {
    fetchProject(id);
    fetchUrl();
  }, []);

  return (
    <>
      {project && (
        <Box>
          <Typography variant="h4">Project: {project.project_name}</Typography>
          <Button variant="contained">Add URL</Button>
          <Button variant="contained" color="info">
            Update All
          </Button>
          <Table>
            <TableHead>
              <TableCell>URL</TableCell>
              <TableCell>Date of Change</TableCell>
            </TableHead>
            <TableBody>
              {urls &&
                urls.map((url) => (
                  <TableRow>
                    <TableCell>{url.url}</TableCell>
                    <TableCell>{url.pub_date}</TableCell>{" "}
                  </TableRow>
                ))} 
            </TableBody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default ProjectDashboard;
