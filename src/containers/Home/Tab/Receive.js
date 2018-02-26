import React, { Component } from "react";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "material-ui/Snackbar";

import Layout from "../_Layout";
import Header from "./_Header";

class Receive extends Component {
  state = {
    value: "",
    copied: false,
    visible: false
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ visible: false });
  };

  render() {
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
          <QRCode value="http://facebook.github.io/react/" size={256} />

          <CopyToClipboard
            text={this.state.value}
            onCopy={() => {
              this.setState({ copied: true, visible: true });
              window.setTimeout(() => this.setState({ visible: false }), 2000);
            }}
          >
            <span className="ellipsis" style={{ marginTop: "30px" }}>
              xrb_3hnoeimynrdeahtfe5np78cmzu1pomh8xsm8abosze6ezyx1wwz8b8te4j5x
            </span>
          </CopyToClipboard>

          {this.state.visible && (
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={this.state.visible}
              onClose={this.handleClose}
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

export default Receive;
