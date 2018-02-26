import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import Card from "material-ui/Card";
import RightIcon from "material-ui-icons/KeyboardArrowRight";
import Layout from "../_Layout";
import Header from "./_Header";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});
class Setting extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { classes } = this.props;
    return (
      <Layout active="setting">
        <Header title="Settings" />
        <div style={{ padding: 20 }}>
          <Card>
            <List component="nav">
              <ListItem button>
                <ListItemText primary="Language" />
                <RightIcon />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Help & Support" />
                <RightIcon />
              </ListItem>
            </List>
            <Divider />
            <List component="nav">
              <ListItem button>
                <ListItemText primary="Security Preferences" />
                <RightIcon />
              </ListItem>
            </List>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default withStyles(styles)(Setting);
