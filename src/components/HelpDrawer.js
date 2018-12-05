import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Close from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  drawer: {
    width: 250,
    [theme.breakpoints.up('sm')]: {
      width: 350
    },
  },

  fullList: {
    width: "auto"
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height:60
  },
  content:{
     display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100

  },
  farRightToggleButton:{
    position: "absolute",
    right: 2
  }
});

class HelpDrawer extends React.Component {
  render() {
    const { classes, open } = this.props;

    return (
      <div>
        <Drawer
          anchor="right"
          open={this.props.open}
          onClose={this.props.toggleDrawer}
          classes={{
                paper: classes.drawer,
              }}

          >
          <div className={classes.toolbar}>
            <Typography variant="h6" component="h2">
              AirNYT Help
            </Typography>
              <IconButton onClick={this.props.toggleDrawer} className={classes.farRightToggleButton}>
                <Close />
               </IconButton>
             
          </div>

          <Divider />
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.toggleDrawer}
            className={classes.content}
            onKeyDown={this.props.toggleDrawer}>
            
            Content goes here
          </div>
        </Drawer>
      </div>
    );
  }
}

HelpDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HelpDrawer);