import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import LogoIcon from "mdi-material-ui/Blur";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 0
  }
};

class Header extends Component {
  render() {
    const { classes, icon, title, link, action } = this.props;
    const MyIcon = icon || LogoIcon;
    const MyAction = action;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              component={Link}
              to={link || "/"}
            >
              <MyIcon />
            </IconButton>
            <Typography
              variant="subheading"
              color="inherit"
              className={classes.flex}
            >
              {title || "CONSENBUS"}
            </Typography>
            {MyAction && <MyAction />}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
