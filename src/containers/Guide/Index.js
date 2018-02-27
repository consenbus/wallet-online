import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import teal from "material-ui/colors/teal";

import Layout from "./_Layout";
import logo from "../../assets/img/logo-white.svg";

class Index extends Component {
  render() {
    return (
      <Layout>
        <img
          src={logo}
          style={{
            marginTop: "5rem",
            width: "150px",
            height: "auto"
          }}
        />

        <div style={{ marginTop: "5rem" }}>
          <Typography variant="title" color="inherit">
            CONSENBUS
          </Typography>
          <p style={{ marginTop: "1rem" }}>
            <span>Take control of your money,</span>
            <br />
            <span>get started with consenbus.</span>
          </p>
        </div>

        <div style={{ marginTop: "10rem" }}>
          <Button
            variant="raised"
            color="secondary"
            size="large"
            fullWidth
            component={Link}
            to="/guide/create"
            style={{
              color: "white",
              backgroundColor: teal["A700"]
            }}
          >
            Get started
          </Button>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Link to="/" style={{ color: "white" }}>
            Restore from backup
          </Link>
        </div>
      </Layout>
    );
  }
}

export default Index;
