import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import QrReader from "react-qr-reader";
import Layout from "../_Layout";
import Header from "./_Header";

class Scan extends Component {
  state = {
    success: false,
    delay: 300,
    result: "No result"
  };

  handleScan(data) {
    if (data) {
      const i = data.indexOf("xrb_");
      this.setState({
        result: data,
        success: i !== -1
      });
    }
  }

  handleError(err) {
    console.error(err);
  }

  render() {
    if (this.state.success) {
      return <Redirect to={`/accounts/${this.state.result}`} />;
    }

    return (
      <Layout active="scan">
        <Header title="Scan QR code" />

        <div style={{ textAlign: "center" }}>
          <div>
            <QrReader
              delay={this.state.delay}
              onError={this.handleError.bind(this)}
              onScan={this.handleScan.bind(this)}
            />
          </div>
          <p>{this.state.result}</p>
        </div>
      </Layout>
    );
  }
}

export default Scan;
