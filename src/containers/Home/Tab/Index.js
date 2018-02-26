import React, { Component } from "react";
import { Link } from "react-router-dom";

import List, { ListItem, ListItemText } from "material-ui/List";
import Card, { CardHeader, CardContent } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import AddIcon from "material-ui-icons/Add";
import WalletIcon from "material-ui-icons/AccountBalanceWallet";

import Layout from "../_Layout";
import Header from "./_Header";

class Index extends Component {
  render() {
    const { classes } = this.props;
    const action = (
      <IconButton>
        <AddIcon />
      </IconButton>
    );

    return (
      <Layout active="home">
        <Header />

        <div style={{ padding: 20 }}>
          <Card>
            <CardHeader
              action={action}
              title="My account"
              subheader="Total 2 account"
            />
            <Divider />

            <List>
              <ListItem component={Link} to="/accounts/a">
                <Avatar>
                  <WalletIcon />
                </Avatar>
                <ListItemText primary="Default account" secondary="199 BUS" />
              </ListItem>
              <ListItem component={Link} to="/accounts/b">
                <Avatar>
                  <WalletIcon />
                </Avatar>
                <ListItemText primary="Work wallet" secondary="0.12 BUS" />
              </ListItem>
            </List>
          </Card>
          <Link to="/guide">Guide</Link>
        </div>
      </Layout>
    );
  }
}

export default Index;
