import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import react, { useContext } from "react";
import { UserContext } from "../App";

const drawerWidth = 240;

const Account = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      <h1>
        {" "}
        Logged in as
        <span style={{ textTransform: "uppercase" }}>
          {" "}
          {userContext.username}
        </span>
      </h1>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Button>Dashboard</Button>
          <br />
          <Button>API Connection</Button>
          <br />
          <Button>Profile</Button>
        </Grid>
        <Grid item xs={8}>

        </Grid>
      </Grid>
    </>
  );
};

export default Account;
