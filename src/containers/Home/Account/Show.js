import React, { Component } from "react";
import { Link } from "react-router-dom";
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

const styles = {
  avatar: {},
  pinkAvatar: {
    color: "#fff",
    backgroundColor: pink[500]
  },
  greenAvatar: {
    color: "#fff",
    backgroundColor: green[500]
  }
};

class Show extends Component {
  render() {
    const { classes } = this.props;
    const action = props => (
      <IconButton color="inherit" component={Link} to={"/"}>
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
          <Typography variant="display2" color="inherit">
            28,943 BUS
          </Typography>
          <Typography variant="subheading" color="inherit">
            34.00 USD
          </Typography>
        </div>

        <List>
          <ListItem>
            <Avatar className={classes.greenAvatar}>
              <AddCircleOutlineIcon />
            </Avatar>
            <ListItemText primary="bus_xxxxxxxx" secondary="10,003 BUS" />
          </ListItem>
          <ListItem>
            <Avatar className={classes.pinkAvatar}>
              <RemoveCircleOutlineIcon />
            </Avatar>
            <ListItemText primary="bus_xxxxxxxx" secondary="10,003 BUS" />
          </ListItem>
          <ListItem>
            <Avatar className={classes.greenAvatar}>
              <AddCircleOutlineIcon />
            </Avatar>
            <ListItemText primary="bus_xxxxxxxx" secondary="10,003 BUS" />
          </ListItem>
        </List>
      </Layout>
    );
  }
}

export default withStyles(styles)(Show);
