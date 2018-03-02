import React, { Component } from "react";
import { Link } from "react-router-dom";
import Layout from "./_Layout";
import Term from "./_Term";
import { withStyles } from "material-ui/styles";

import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import teal from "material-ui/colors/teal";
import grey from "material-ui/colors/grey";
import Checkbox from "material-ui/Checkbox";
// import Modal from "material-ui/Modal";
import Dialog from "material-ui/Dialog";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import LeftIcon from "material-ui-icons/KeyboardArrowLeft";
import CloseIcon from "material-ui-icons/Close";

const styles = {
  appBar: {
    position: "relative"
  }
};

class Done extends Component {
  state = {
    checkedA: false,
    checkedB: false,
    checkedC: false,
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    const enabled =
      this.state.checkedA && this.state.checkedB && this.state.checkedC;

    return (
      <Layout>
        <p style={{ textAlign: "left" }}>
          <IconButton color="inherit" component={Link} to={"/guide/write-down"}>
            <LeftIcon />
          </IconButton>
        </p>

        <h2>Almost done! Let's review.</h2>
        <p style={{ marginTop: "1rem" }}>
          Consenbus is different – it cannot be safely held with a bank or web
          service.
        </p>

        <div style={{ marginTop: "30%", textAlign: "left" }}>
          <p>
            <label>
              <Checkbox
                color="primary"
                checked={this.state.checkedA}
                onChange={this.handleChange("checkedA")}
                value="checkedA"
                style={{ color: "white" }}
              />
              I understand that my funds are held securely on this device, not
              by a company.
            </label>
          </p>

          <p>
            <label>
              <Checkbox
                color="primary"
                checked={this.state.checkedB}
                onChange={this.handleChange("checkedB")}
                value="checkedB"
                style={{ color: "white" }}
              />
              I understand that if this app is moved to another device or
              deleted, my bus coin can only be recovered with the backup phrase.
            </label>
          </p>
        </div>

        <p style={{ marginTop: "30%", textAlign: "left" }}>
          <label>
            <Checkbox
              color="primary"
              checked={this.state.checkedC}
              onChange={this.handleChange("checkedC")}
              value="checkedC"
              style={{ color: "white" }}
            />
            I have read, understood, and agree to the{" "}
            <span onClick={this.handleOpen}>Terms of Use</span>
          </label>
        </p>

        <div style={{ marginTop: "1rem" }}>
          <Button
            disabled={!enabled}
            variant="raised"
            color="secondary"
            size="large"
            fullWidth
            component={Link}
            to="/"
            style={{
              color: "white",
              backgroundColor: enabled ? teal["A700"] : grey["700"]
            }}
          >
            Confirm & Finish
          </Button>
        </div>

        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          style={{ backgroundColor: "white" }}
        >
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{ padding: "20px" }}>
            <Term />
          </div>
        </Dialog>
      </Layout>
    );
  }
}

export default withStyles(styles)(Done);
