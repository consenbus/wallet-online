import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/Menu/MenuItem";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Layout from "../_Layout";
import Header from "./_Header";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    //marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
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
    // borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    padding: "5px",
    // fontSize: 16,
    // padding: "10px 12px",
    width: "calc(100% - 24px)",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  textFieldUnit: {
    padding: "6px"
  },
  textFieldFormLabel: {
    fontSize: 18
  }
});

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
    address: "",
    amount: "",
    unit: "BUS"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
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
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="full-width"
                  label="Recipient"
                  InputProps={inputProps}
                  InputLabelProps={inputLabelProps}
                  placeholder="Recipient address"
                  helperText=""
                  fullWidth
                  margin="normal"
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

export default withStyles(styles)(Send);
