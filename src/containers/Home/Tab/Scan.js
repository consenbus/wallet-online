import React, { Component } from "react";
import QrReader from "react-qr-reader";
import Layout from "../_Layout";
import Header from "./_Header";

class Scan extends Component {
  state = {
    delay: 300,
    result: "No result"
  };

  handleScan(data) {
    if (data) {
      this.setState({
        result: data
      });
    }
  }

  handleError(err) {
    console.error(err);
  }

  render() {
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
