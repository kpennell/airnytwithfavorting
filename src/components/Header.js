import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Explore from "@material-ui/icons/Explore";
import Button from "@material-ui/core/Button";

import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import DropDownMenu from "./DropDownMenu.js";

const styles = theme => ({
  header: {
    height: "80px",
    color: "#484848",
    backgroundColor: "white",
    boxShadow: "none",
    borderBottom: "1px solid #e2e2e2"
  },
  mainIcon: {
    fontSize: "40px",
    color: "#f44336"
  },
  toolbar: {
    height: "80px",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "space-between"
    },
    display: "flex",
    alignItems: "center",
    justifyContent:"space-between"


  },
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent:"space-between"
  },
  root: {
    width: "100%"
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  magnifyingGlass: {
    fontWeight: 800,
    color: "black"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px",
    position: "relative",
    borderRadius: "4px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(235, 235, 235)",
    borderRadius: "4px",

    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 20,
      width: "auto"
    }
  },
  searchIcon: {
    width: "50px",
    height: "100%",
    position: "absolute",

    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: "12px",
    paddingRight: "8px",
    paddingBottom: "12px",
    paddingLeft: "50px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 350
    },
    "&::placeholder": {
      color: "#484848 !important",
      opacity:100,
      fontWeight: 700
    }
  },
  menubuttons: {
    fontWeight: 600
  },
  menuItems:{

     [theme.breakpoints.down('sm')]: {
      display:"none"
    },
  },
  dropdownMenu:{
    [theme.breakpoints.up('md')]: {
      display:"none"
    },

  },
  headerGrid:{
    [theme.breakpoints.down('sm')]: {
      width:"90%"
    },

  },
   avatar: {

    width: 30,
    height: 30,
    border: "2px solid #e2e2e2"
  },
});

class Header extends React.Component {
  state = {
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { user, classes, handleSearch } = this.props;
     const { anchorEl } = this.state;
    const open = Boolean(anchorEl);


   // console.log(user)

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.header}>
          <Toolbar className={classes.toolbar}>
            <Grid justify="space-between" className={classes.headerGrid} container spacing={8}>
              <Grid item className={classes.grid}>
                <Explore className={classes.mainIcon} />
                <div className={classes.dropdownMenu}>
                <DropDownMenu {...this.props} />

                </div>

                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon className={classes.magnifyingGlass} />
                  </div>
                  <InputBase
                    placeholder="Filter Places..."
                    type="search"
                     onChange={handleSearch}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
              </Grid>


              <Grid item className={classes.menuItems}>
                <div style={{display:"inline"}}>

                  <Button color="inherit" onClick={this.props.toggleDrawer}>
                    Help
                  </Button>

                  {user === null && 
                  <div style={{display:"inline"}}>
                  <Button color="inherit" onClick={this.props.toggleLoginSignupModal}>
                    Sign Up
                  </Button>

                  <Button color="inherit" onClick={this.props.toggleLoginSignupModal}>
                    Log in
                  </Button>
                  </div>
                    }

                  </div>


                  {user && (
              <div style={{display:"inline"}}>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
          
                  <Avatar alt="user pic" src={user.photoURL} className={classes.avatar} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
               
                  <MenuItem onClick={this.props.logOut}>Log Out</MenuItem>
                </Menu>
              </div>
            )}
               
            
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);