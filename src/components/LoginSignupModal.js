import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    // width: "55%",
    backgroundColor: "white",
    boxShadow: 5,
    padding: 0,
    borderRadius: "5px",
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "99%"
    }
  },
  media: {
    height: 0,
    paddingTop: "55.25%", // 16:9,
    opacity: ".75",
    "&:hover": {
      opacity: "1"
    }
  },
  overallContainer: {
    padding: "5%"
  },
  pos: {
    marginBottom: "5px"
  },
  card: {
    padding: 0
  },
  playArrow: {
    position: "absolute",
    fontSize: "50px",
    color: "white",
    fontSize: "60px",
    top: "50%",
    bottom: "50%",
    transform: "translate(136%, -110%)",
    opacity: ".75"
  },
  cardContent: {
    padding: "0px",
    "&:lastChild": {
      padding: 0
    }
  },
  title: {
    fontSize: "1.55rem"
  },
  subtitle: {
    color: "#a8a8a8"
  },
  chips: {
    backgroundColor: "#4054B2",
    color: "white",
    height: "20px",
    margin: "0px 2px"
  },
  textStuff: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

class LoginSignupModal extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.toggleLoginSignupModal}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid container className={classes.overallContainer}>
              <Grid item xs={5} className={classes.textStuff}>
                <Typography align="center" variant="headline">
                  Please Sign Up or In
                </Typography>
                <Typography align="center" variant="subheading">
                  (To save your favorites)
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <StyledFirebaseAuth
                  uiConfig={this.props.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(LoginSignupModal);