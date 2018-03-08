import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import _map from "lodash/map";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
// import MenuItem from "material-ui/Menu/MenuItem";
import Menu, { MenuItem } from "material-ui/Menu";
import DownIcon from "material-ui-icons/KeyboardArrowDown";
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
    unitErro: "",
    anchorEl: null
  };

  handleChangeForm = name => event => {
    this.setState({
      [name]: event.target.value,
      [name + "Error"]: ""
    });
  };

  handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeMenu = account => () => {
    this.props.account.changeCurrentAccount(account);
    this.setState({ anchorEl: null });
  };

  // TODO
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

    const account = this.props.account.currentAccount;
    const toAccountAddress = this.state.account;
    this.props.account
      .send(account, this.state.amount, toAccountAddress)
      .then(() => {
        this.setState({ success: true });
      });
  };

  render() {
    const { classes } = this.props;
    const account = this.props.account.currentAccount;
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

        {/* account selector */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Button
            aria-owns={this.state.anchorEl ? "simple-menu" : null}
            aria-haspopup="true"
            onClick={this.handleClickMenu}
          >
            {account.name} <DownIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleCloseMenu}
          >
            {_map(this.props.account.accounts, a => {
              return (
                <MenuItem
                  key={a.account}
                  onClick={this.handleChangeMenu(a.account)}
                >
                  {a.name || "null"}
                </MenuItem>
              );
            })}
          </Menu>
        </div>

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
                  onChange={this.handleChangeForm("account")}
                />

                <TextField
                  id="number"
                  label="Amount"
                  type="number"
                  className={classes.textField}
                  InputProps={inputProps}
                  InputLabelProps={inputLabelProps}
                  margin="normal"
                  helperText={this.state.amountError}
                  error={!_isEmpty(this.state.amountError)}
                  value={this.state.amount}
                  onChange={this.handleChangeForm("amount")}
                />

                <TextField
                  id="select-unit"
                  select
                  label="Unit"
                  value={this.state.unit}
                  onChange={this.handleChangeForm("unit")}
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
