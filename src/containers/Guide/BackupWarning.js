import React, { Component } from "react";
import backupWarningImage from "../../assets/img/backup/backup-warning.svg";
import { Link } from "react-router-dom";

import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import teal from "material-ui/colors/teal";
import LeftIcon from "material-ui-icons/KeyboardArrowLeft";

import Layout from "./_Layout";

class BackupWarning extends Component {
  render() {
    return (
      <Layout>
        <p style={{ textAlign: "left" }}>
          <IconButton color="inherit" component={Link} to={"/guide/backup"}>
            <LeftIcon />
          </IconButton>
        </p>

        <h2>Are you being watched?</h2>
        <p style={{ marginTop: "1rem" }}>
          Now is a perfect time to assess your surroundings. Nearby windows?
          Hidden cameras? Shoulder-spies?
        </p>

        <div style={{ marginTop: "20%" }}>
          <img
            src={backupWarningImage}
            style={{
              marginTop: "5rem",
              width: "150px",
              height: "auto"
            }}
          />
        </div>

        <p style={{ marginTop: "20%" }}>
          Anyone with your backup seed can access or spend your bus coin.
        </p>

        <div style={{ marginTop: "1rem" }}>
          <Button
            variant="raised"
            color="secondary"
            size="large"
            fullWidth
            component={Link}
            to="/guide/no-screenshot"
            style={{
              color: "white",
              backgroundColor: teal["A700"]
            }}
          >
            Got it
          </Button>
        </div>
      </Layout>
    );
  }
}

export default BackupWarning;
