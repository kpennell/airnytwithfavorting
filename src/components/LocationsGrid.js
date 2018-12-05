import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import LocationCard from "./LocationCard.js";
import Grid from "@material-ui/core/Grid";
import SubtitleSection from "../components/SubtitleSection.js";

import MapAndMarkers from "../components/MapAndMarkers.js";
import PaginationComponent from "./PaginationComponent.js";
import FlightTakeoff from "@material-ui/icons/FlightTakeoff";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import Place from "@material-ui/icons/Place";
import Collections from '@material-ui/icons/Collections';

import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    display: "block",
    overflow: "hidden"
  },
  mapDiv: {
    height: "100%",
    width: "65%",
    display: "inline-block",
    position: "sticky",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("sm")]: {
      zIndex: 2,
      position: "absolute",
      width: "100%",
    }
  },
  listGridDiv: {
    overflow: "auto",
    height: "85vh",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      position: "absolute",
      zIndex: 3,
      background:"white"
    },
    
  },
  parentDiv: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "block",
      overflow: "scroll",
      position:"relative"
    }
  },
  subTitleDiv: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    }
  },
  subtitle: {
    marginTop: "35px"
  },
  planeIcon: {
    color: "#F44436",
    marginTop: 15,
    marginRight: 15,
    fontSize: 35
  },
  paginationSection: {
    height: "100px",
    margin: 50,
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  fab:{
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    zIndex:5,
    position:"absolute",
    bottom:30,
    left:20,
    backgroundColor:theme.palette.secondary.main,
    color:"white"

  }
});

class LocationsGrid extends React.Component {
  state = {
    currentPage: 1,
    hoveredCardId: "",
    mobileMapShowing: false
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  setCardMarkerHover = location => {
    //console.log(location)
    this.setState({
      hoveredCardId: location.pageid
    });
  };

  resetCardMarkerHover = () => {
    this.setState({
      hoveredCardId: ""
    });
  };

  toggleMapAndListOnMobile = () => {
    this.setState({
      mobileMapShowing: !this.state.mobileMapShowing
    })
  }

  render() {
    const { locations, classes } = this.props;
    const { currentPage } = this.state;
    const resultsPerPage = 30;
    const pageCount = Math.ceil(locations.length / resultsPerPage);
    const total = Math.ceil(locations.length);
    const offset = (currentPage - 1) * resultsPerPage;
    const locationsSlicedDownOnPage = locations.slice(
      offset,
      offset + resultsPerPage
    );

    // console.log(this.props.favorites)

    return (
      <div className={classes.root}>
        <div className={classes.parentDiv}>
          <Grid
            container
            className={classes.listGridDiv}
            justify={this.props.mapShowing ? "flex-start" : "space-evenly"}
            spacing={0}>
            {locationsSlicedDownOnPage.length > 0 && (
              <div className={classes.subTitleDiv}>
                <FlightTakeoff
                  color="secondary"
                  className={classes.planeIcon}
                />
                <Typography
                  variant="subtitle1"
                  className={classes.subtitle}
                  gutterBottom>
                  Explore and Filter the New York Times recommended travel
                  destinations since 2011.
                </Typography>
              </div>
            )}
            {locationsSlicedDownOnPage.length === 0 && (
              <Typography
                variant="subtitle1"
                className={classes.subtitle}
                gutterBottom>
                No results found!
              </Typography>
            )}

            {locationsSlicedDownOnPage.map((location, index) => (
              <Grid key={index} item>
                <LocationCard
                  setCardMarkerHover={this.setCardMarkerHover}
                  resetCardMarkerHover={this.resetCardMarkerHover}
                  location={location}
                  favorites={this.props.favorites}
                  toggleLoginSignupModal={this.props.toggleLoginSignupModal}
                  user={this.props.user}
                />
              </Grid>
            ))}

            {total > 20 && (
              <div className={classes.paginationSection}>
                <PaginationComponent
                  total={total}
                  resultsPerPage={resultsPerPage}
                  pageCount={pageCount}
                  currentPage={currentPage}
                  handlePageChange={this.handlePageChange}
                  offset={offset}
                />
              </div>
            )}
          </Grid>

          {this.props.mapShowing && (
            <div className={classes.mapDiv} style={ this.state.mobileMapShowing ? {zIndex:4} : {zIndex:1}  }>
              <MapAndMarkers
                locations={locationsSlicedDownOnPage}
                hoveredCardId={this.state.hoveredCardId}
       
                favorites={this.props.favorites}
                  toggleLoginSignupModal={this.props.toggleLoginSignupModal}
                  user={this.props.user}
              />
            </div>
          )}

            <Button variant="fab" aria-label="Add" className={classes.fab} onClick={this.toggleMapAndListOnMobile}>
              {this.state.mobileMapShowing ? <Collections /> : <Place /> }
          
     
            </Button>
        </div>
      </div>
    );
  }
}

LocationsGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationsGrid);