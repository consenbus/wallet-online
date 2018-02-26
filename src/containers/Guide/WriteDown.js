import React, { Component } from "react";
import { Link } from "react-router-dom";
import Layout from "./_Layout";

import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import teal from "material-ui/colors/teal";
import LeftIcon from "material-ui-icons/KeyboardArrowLeft";

class WriteDown extends Component {
  render() {
    return (
      <Layout>
        <p style={{ textAlign: "left" }}>
          <IconButton
            color="inherit"
            component={Link}
            to={"/guide/no-screenshot"}
          >
            <LeftIcon />
          </IconButton>
        </p>

        <p style={{ marginTop: "1rem" }}>
          Please carefully write down this 64 character seed.
        </p>

        <div style={{ marginTop: "30%" }}>
          <p className="ellipsis" style={{ color: teal["A700"] }}>
            637C182CF33A84D142E34A0263536FD1EAD7DC3327D77D106987E39DD3A865B9
          </p>
        </div>

        <p style={{ marginTop: "30%" }}>
          Be sure to store your seed in a secure place. If this app is deleted,
          or your device stolen, the seed is the only way to recreate the
          wallet.
        </p>

        <div style={{ marginTop: "1rem" }}>
          <Button
            variant="raised"
            color="secondary"
            size="large"
            fullWidth
            component={Link}
            to="/guide/done"
            style={{
              color: "white",
              backgroundColor: teal["A700"]
            }}
          >
            I've written it down
          </Button>
        </div>
      </Layout>
    );
  }
}

export default WriteDown;
