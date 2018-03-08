import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link, Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Card, { CardActions, CardContent } from "material-ui/Card";
import LeftIcon from "material-ui-icons/KeyboardArrowLeft";
import Button from "material-ui/Button";
import grey from "material-ui/colors/grey";
import Layout from "../_Layout";
import Header from "../Tab/_Header";
import styles from "../../../styles/form";
import _isEmpty from "lodash/isEmpty";

class New extends Component {
  state = {
    success: false,
    name: "",
    nameError: ""
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
      this.setState({ nameError: "Account name must not be blank." });
      return;
    }

    this.props.account.createAccount(this.state.name).then(() => {
      this.setState({ success: true });
    });
  };

  render() {
    const current = this.props.account.currentAccount;
    if (this.state.success) {
      return <Redirect to={"/accounts/" + current.account} />;
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
        <Header title="Create new account" link="/" icon={LeftIcon} />

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
                onClick={this.handleCreateAccount}
              >
                Create
              </Button>
            </CardActions>
          </Card>

          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <Link to="/account/restore" style={{ color: grey["700"] }}>
              Restore from backup
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withStyles(styles)(inject("account")(observer(New)));
