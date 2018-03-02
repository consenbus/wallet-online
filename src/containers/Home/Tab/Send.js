import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/Menu/MenuItem";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Layout from "../_Layout";
import Header from "./_Header";
import styles from "../../../styles/form";
import _isEmpty from "lodash/isEmpty";

const units = [
  { label: "GBUS", value: "GBUS" },
  { label: "MBUS", value: "MBUS" },
  { label: "kBUS", value: "kBUS" },
  { label: "BUS", value: "BUS" },
  { label: "mBUS", value: "mBUS" },
  { label: "uBUS", value: "uBUS" },
  { label: "nBUS", value: "nBUS" }
];

class Send extends Component {
  state = {
    success: false,
    account: "",
    accountError: "",
    amount: "",
    amountError: "",
    unit: "BUS",
    unitErro: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      [name + "Error"]: ""
    });
  };

  handleSend = e => {
    e.preventDefault();
    if (this.state.account === "") {
      this.setState({ accountError: "Recipient address must not be blank." });
      return;
    }

    if (this.state.amount === "") {
      this.setState({ amountError: "Amount must not be blank." });
      return;
    }

    this.props.account
      .sendAccountBlocks(this.state.account, this.state.amount)
      .then(() => {
        this.setState({ success: true });
      });
  };

  render() {
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
      <Layout active="send">
        <Header title="Send" />

        <div style={{ padding: 20 }}>
          <Card>
            <CardContent>
              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={this.handleSend}
              >
                <TextField
                  id="full-width"
                  label="Recipient"
                  InputProps={inputProps}
                  InputLabelProps={inputLabelProps}
                  placeholder="Recipient address"
                  margin="normal"
                  fullWidth
                  helperText={this.state.accountError}
                  error={!_isEmpty(this.state.accountError)}
                  value={this.state.account}
                  onChange={this.handleChange("account")}
                />

                <TextField
                  id="number"
                  label="Amount"
                  value={this.state.amount}
                  onChange={this.handleChange("amount")}
                  type="number"
                  className={classes.textField}
                  InputProps={inputProps}
                  InputLabelProps={inputLabelProps}
                  margin="normal"
                  helperText={this.state.amountError}
                  error={!_isEmpty(this.state.amountError)}
                  value={this.state.amount}
                  onChange={this.handleChange("amount")}
                />

                <TextField
                  id="select-unit"
                  select
                  label="Unit"
                  value={this.state.unit}
                  onChange={this.handleChange("unit")}
                  helperText=""
                  margin="normal"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.textFieldUnit
                  }}
                  InputLabelProps={inputLabelProps}
                >
                  {units.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                {/*
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  InputProps={inputProps}
                  InputLabelProps={inputLabelProps}
                  autoComplete="current-password"
                  margin="normal"
                  fullWidth
                />
                */}
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
                onClick={this.handleSend}
              >
                Send
              </Button>
            </CardActions>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default withStyles(styles)(inject("account")(observer(Send)));
