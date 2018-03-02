import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import _map from "lodash/map";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "material-ui/Snackbar";
import Button from "material-ui/Button";
import Menu, { MenuItem } from "material-ui/Menu";
import DownIcon from "material-ui-icons/KeyboardArrowDown";
import teal from "material-ui/colors/teal";

import Layout from "../_Layout";
import Header from "./_Header";

class Receive extends Component {
  state = {
    value: "",
    copied: false,
    visible: false,
    anchorEl: null
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ visible: false });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeAccount = account => () => {
    this.props.account.changeCurrentAccount(account);
    this.setState({ anchorEl: null });
  };

  render() {
    const account = this.props.account.currentAccount;
    return (
      <Layout active="receive">
        <Header title="Receive" />

        <div
          style={{
            textAlign: "center",
            verticalAlign: "middle",
            marginTop: "50px"
          }}
        >
          <QRCode value={account.account || "null"} size={256} />

          {/* account selector */}
          <div style={{ marginTop: "30px" }}>
            <Button
              aria-owns={this.state.anchorEl ? "simple-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              {account.name} <DownIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              {_map(this.props.account.accounts, a => {
                return (
                  <MenuItem
                    key={a.account}
                    onClick={this.handleChangeAccount(a.account)}
                  >
                    {a.name || "null"}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>

          {/* account address */}
          <div style={{ marginTop: "10px" }}>
            <CopyToClipboard
              text={account.account}
              onCopy={() => {
                this.setState({ copied: true, visible: true });
                window.setTimeout(
                  () => this.setState({ visible: false }),
                  2000
                );
              }}
            >
              <span className="ellipsis" style={{ color: teal["A700"] }}>
                {account.account || "null"}
              </span>
            </CopyToClipboard>
          </div>

          {this.state.visible && (
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={this.state.visible}
              onClose={this.handleSnackbarClose}
              SnackbarContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">Copied.</span>}
            />
          )}
        </div>
      </Layout>
    );
  }
}

export default inject("account")(observer(Receive));
