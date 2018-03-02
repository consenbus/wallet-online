import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import _map from "lodash/map";

import { withStyles } from "material-ui/styles";
import pink from "material-ui/colors/pink";
import green from "material-ui/colors/green";
import blue from "material-ui/colors/blue";

import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import List, { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import EditIcon from "material-ui-icons/Edit";
import LeftIcon from "material-ui-icons/KeyboardArrowLeft";
import AddCircleOutlineIcon from "material-ui-icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "material-ui-icons/RemoveCircleOutline";

import Layout from "../_Layout";
import Header from "../Tab/_Header";
import converter from "../../../utils/converter";

const styles = {
  avatar: {},
  pinkAvatar: {
    color: "#fff",
    backgroundColor: pink[500],
    marginRight: "10px"
  },
  greenAvatar: {
    color: "#fff",
    backgroundColor: green[500],
    marginRight: "10px"
  }
};

class Show extends Component {
  componentWillMount() {
    const account = this.props.match.params.account;
    this.props.account.getAccountBalance(account);
    this.props.account.getAccountHistory(account);
  }

  render() {
    const { classes, account } = this.props;
    const addr = this.props.match.params.account;
    const current = account.currentAccount;
    const history = account.currentHistory;
    const action = props => (
      <IconButton
        color="inherit"
        component={Link}
        to={`/accounts/${addr}/edit`}
      >
        <EditIcon />
      </IconButton>
    );

    return (
      <Layout active="">
        <Header
          title="Default account"
          link="/"
          icon={LeftIcon}
          action={action}
        />
        <div
          style={{
            backgroundColor: blue["A700"],
            color: "white",
            textAlign: "center",
            paddingTop: "50px",
            paddingBottom: "50px"
          }}
        >
          <Typography variant="display1" color="inherit">
            <span className="ellipsis">
              {converter.unit(current.balance || 0, "raw", "NANO")} BUS
            </span>
          </Typography>
          <Typography variant="subheading" color="inherit">
            <span className="ellipsis">{addr}</span>
          </Typography>
        </div>

        <List>
          {_map(history.history, h => (
            <ListItem key={h.hash}>
              {h.type === "receive" ? (
                <Avatar className={classes.greenAvatar}>
                  <AddCircleOutlineIcon />
                </Avatar>
              ) : (
                <Avatar className={classes.pinkAvatar}>
                  <RemoveCircleOutlineIcon />
                </Avatar>
              )}
              <span style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                <ListItemText
                  primary={h.account}
                  secondary={
                    converter.unit(h.amount || 0, "raw", "NANO") + " BUS"
                  }
                />
              </span>
            </ListItem>
          ))}
        </List>
      </Layout>
    );
  }
}

export default withStyles(styles)(inject("account")(observer(Show)));
