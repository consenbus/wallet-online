import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";

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

class Create extends Component {
  state = { success: false };

  handleCreateAccount() {
    this.props.account
      .createAccount("Default account", "I'm_a_Password")
      .then(() => {
        this.setState({ success: true });
      });
  }

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

        <h2>Create account</h2>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="full-width"
            label="Account name"
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
            placeholder=""
            helperText=""
            fullWidth
            margin="normal"
          />

          <TextField
            id="password"
            label="Password"
            placeholder=""
            type="password"
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
            autoComplete="current-password"
            margin="normal"
            fullWidth
          />
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
            onClick={this.handleCreateAccount.bind(this)}
          >
            Create new account
          </Button>
        </div>
      </Layout>
    );
  }
}

export default inject("account")(observer(withStyles(styles)(Create)));
