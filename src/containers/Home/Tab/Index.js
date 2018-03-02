import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

import List, { ListItem, ListItemText } from "material-ui/List";
import Card, { CardHeader } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import AddIcon from "material-ui-icons/Add";
import WalletIcon from "material-ui-icons/AccountBalanceWallet";

import Layout from "../_Layout";
import Header from "./_Header";
import _map from "lodash/map";

class Index extends Component {
  render() {
    const { account } = this.props;
    const accounts = account.accounts;

    const action = (
      <IconButton component={Link} to="/account/new">
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
              subheader={`Total ${accounts.length || 0} account`}
            />
            <Divider />

            <List>
              {_map(accounts, a => (
                <ListItem
                  key={a.account}
                  component={Link}
                  to={`/accounts/${a.account || "null"}`}
                >
                  <Avatar>
                    <WalletIcon />
                  </Avatar>
                  <ListItemText
                    style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                    primary={a.name || "Default account"}
                    secondary={a.account}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default inject("account")(observer(Index));
