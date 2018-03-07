import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";
import _isEmpty from "lodash/isEmpty";

import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import teal from "material-ui/colors/teal";
import LeftIcon from "material-ui-icons/KeyboardArrowLeft";

import Layout from "./_Layout";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    //width: 200
  },
  menu: {
    width: 200
  },
  textFieldRoot: {
    padding: 0,
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  textFieldInput: {
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    padding: "10px 5px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  textFieldFormLabel: {
    color: theme.palette.common.white,
    fontSize: 18
  }
});

class Restore extends Component {
  state = {
    success: false,
    name: "",
    nameError: "",
    seed: "",
    seedError: "",
    password: "",
    passwordError: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      [name + "Error"]: ""
    });
  };

  handleCreateAccount = e => {
    e.preventDefault();
    if (this.state.name === "") {
      this.setState({ nameError: "Name must not be blank." });
      return;
    }

    if (this.state.seed === "") {
      this.setState({ seedError: "Seed must not be blank." });
      return;
    }

    /*
    if (this.state.password === "") {
      this.setState({ passwordError: "Password must not be blank." });
      return;
    }
    */

    this.props.account
      .restoreAccount(this.state.name, this.state.seed)
      .then(() => {
        this.setState({ success: true });
      });
  };

  render() {
    if (this.state.success) {
      return <Redirect to="/guide/backup" />;
    }

    const { classes } = this.props;

    const inputProps = {
      disableUnderline: true,
      classes: {
        root: classes.textFieldRoot,
        input: classes.textFieldInput
      }
    };

    const inputLabelProps = {
      shrink: true,
      className: classes.textFieldFormLabel
    };

    return (
      <Layout>
        <p style={{ textAlign: "left" }}>
          <IconButton color="inherit" component={Link} to={"/guide"}>
            <LeftIcon />
          </IconButton>
        </p>

        <h2>Restore from backup</h2>
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={this.handleCreateAccount}
        >
          <TextField
            id="full-width"
            label="Account name"
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
            placeholder=""
            fullWidth
            margin="normal"
            helperText={this.state.nameError}
            error={!_isEmpty(this.state.nameError)}
            onChange={this.handleChange("name")}
            value={this.state.name}
          />

          <TextField
            label="Seed"
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
            placeholder=""
            fullWidth
            margin="normal"
            helperText={this.state.seedError}
            error={!_isEmpty(this.state.seedError)}
            onChange={this.handleChange("seed")}
            value={this.state.seed}
          />

          {/*
          <TextField
            id="password"
            label="Password"
            placeholder=""
            helperText={this.state.passwordError}
            type="password"
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
            autoComplete="current-password"
            margin="normal"
            fullWidth
            error={!_isEmpty(this.state.passwordError)}
            onChange={this.handleChange("password")}
          />
          */}
        </form>

        <div style={{ marginTop: "1rem" }}>
          <Button
            variant="raised"
            color="secondary"
            size="large"
            fullWidth
            style={{
              color: "white",
              backgroundColor: teal["A700"]
            }}
            onClick={this.handleCreateAccount}
          >
            Create new account
          </Button>
        </div>
      </Layout>
    );
  }
}

export default withStyles(styles)(inject("account")(observer(Restore)));
