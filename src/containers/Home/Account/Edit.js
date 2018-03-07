import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import LeftIcon from "material-ui-icons/KeyboardArrowLeft";
import Button from "material-ui/Button";
import red from "material-ui/colors/red";
import Layout from "../_Layout";
import Header from "../Tab/_Header";
import styles from "../../../styles/form";
import _isEmpty from "lodash/isEmpty";

class Edit extends Component {
  state = {
    success: false,
    deleted: false,
    confirm: false,
    name: "",
    nameError: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      [name + "Error"]: ""
    });
  };

  handleEditAccount = e => {
    e.preventDefault();
    if (this.state.name === "") {
      this.setState({ nameError: "Account name must not be blank." });
      return;
    }

    const accountParam = this.props.match.params.account;
    this.props.account.updateAccount(accountParam, this.state.name);
    this.setState({ success: true });
  };

  handleDeleteAccount = e => {
    e.preventDefault();
    const accountParam = this.props.match.params.account;
    this.props.account.deleteAccount(accountParam);
    this.setState({ deleted: true });
  };

  handleConfirmOpen = () => {
    this.setState({ confirm: true });
  };

  handleConfirmClose = () => {
    this.setState({ confirm: false });
  };

  componentWillMount() {
    const account = this.props.match.params.account;
    this.props.account.changeCurrentAccount(account);
    this.setState({ name: this.props.account.currentAccount.name || "null" });
  }

  render() {
    const accountParam = this.props.match.params.account;
    if (this.state.success) {
      return <Redirect to={"/accounts/" + accountParam} />;
    }

    if (this.state.deleted) {
      return <Redirect to="/" />;
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
      <Layout active="">
        <Header title="Edit account" link="/" icon={LeftIcon} />

        <div style={{ padding: 20 }}>
          <Card>
            <CardContent>
              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                method="post"
                onSubmit={this.handleCreateAccount}
              >
                <TextField
                  id="full-width"
                  label="Account name"
                  InputProps={inputProps}
                  InputLabelProps={inputLabelProps}
                  placeholder=""
                  helperText={this.state.nameError}
                  fullWidth
                  value={this.state.name}
                  error={!_isEmpty(this.state.nameError)}
                  margin="normal"
                  onChange={this.handleChange("name")}
                />
              </form>
            </CardContent>
            <CardActions>
              <Button
                variant="raised"
                color="secondary"
                fullWidth
                style={{
                  margin: "0 12px 20px 12px",
                  color: "white"
                }}
                onClick={this.handleEditAccount}
              >
                Update
              </Button>
            </CardActions>
          </Card>

          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <Button
              style={{ color: red["700"] }}
              onClick={this.handleConfirmOpen}
            >
              Delete this account
            </Button>
            <Dialog
              open={this.state.confirm}
              onClose={this.handleConfirmClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Do you want to delete this account?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  THIS ACTION CANNOT BE REVERSED
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleConfirmClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={this.handleDeleteAccount}
                  style={{ color: red["700"] }}
                  color="primary"
                  autoFocus
                >
                  Yes, I'm Sure
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withStyles(styles)(inject("account")(observer(Edit)));
