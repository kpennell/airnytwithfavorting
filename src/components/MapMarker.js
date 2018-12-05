import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Place from "@material-ui/icons/Place";
import Clear from "@material-ui/icons/Clear";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Launch from "@material-ui/icons/Launch";
import FavoritingButton from "./FavoritingButton.js";

import CardCarousel from "./CardCarousel.js";

import classNames from 'classnames';

const styles = theme => ({
  tooltips: { 
    position: "relative", 
    display: "inline",
  },
  tooltips_span: {
    position: "absolute",
    width: "100px",
    minHeight:"30px",
    textOverflow: "ellipsis",
    color: "#262626",
    background: "#FFFFFF",
    border: ".5px solid #BFBFBF",
    fontSize:"12px",
    fontWeight:600,
    // height: "30px",
    // lineHeight: "30px",
    textTransform:"uppercase",
    textAlign: "center",
    visibility: "visible",
    padding:"4px 4px",
    borderRadius: "2px",
      display: "flex",
  justifyContent: "center",
  alignItems: "center",
    top: "-50px",
    right: "-50px",
    "&:before":{
      content: "''",
      position: "absolute",
      top: "100%",
      left: "50%",
      marginLeft: "-12px",
      width: "0",
      height: "0",
      // borderTop: "4px solid #BFBFBF",
      // borderRight: "4px solid transparent",
      // borderLeft: "4px solid transparent",
    },
    "&:after":{
    content: "''",
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: "-4px",
    width: "0",
    height: "0",
    borderTop: "8px solid #FFFFFF",
    borderRight: "8px solid transparent",
    borderLeft: "8px solid transparent"
    },
  },
  hover_tooltips_span: {
    visibility: "visible",
    opacity: "0.7",
    bottom: "30px",
    left: "50%",
    marginLeft: "-76px",

  },
  niftyHoverBackground:{
    backgroundColor:theme.palette.primary.dark,
    color:"white",
    border:"none",
    zIndex:10,
    "&:after":{
    content: "''",
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: "-4px",
    width: "0",
    height: "0",
    borderTop: "8px solid #7E1541",
    borderRight: "8px solid transparent",
    borderLeft: "8px solid transparent"
    },
  },
  markerParent:{
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
},
cardParent:{
  top: "-299px",
  position: "absolute",
  left: "-139px",
  zIndex:20,
  "display": "flex",
  "justifyContent": "center",
  "alignItems": "center",
 
   "&:before":{
      content: "''",
      position: "absolute",
      top: "100%",
      left: "50%",
      marginLeft: "-12px",
      width: "0",
      height: "0",
      // borderTop: "4px solid #BFBFBF",
      // borderRight: "4px solid transparent",
      // borderLeft: "4px solid transparent",
    },
    "&:after":{
    content: "''",
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: "-4px",
    width: "0",
    height: "0",
    borderTop: "8px solid #FFFFFF",
    borderRight: "8px solid transparent",
    borderLeft: "8px solid transparent"
    },

},
card: {
    width: 260,

    boxShadow: "none",
    margin: "0px 5px",
    zIndex:10
  },
  media: {
    height: 220,
    objectFit: "cover",
    borderRadius: 5
  },

  cardContentArea: {
    padding: "4px 0px",
    "&:last-child": {
      padding: "5px 10px"
    },
    marginBottom: 5
  },
  year: {
    backgroundColor: "#A61D55",
    borderRadius: "3.2px",
    color: "white",
    padding: "0 4px"
  },
  yearArea: {
    textTransform: "uppercase",
    color: "#A61D55",
    fontWeight: 600,
    fontSize: 12,
    lineHeight: "16px",
    paddingTop: 4
  },
  launchicon: {
    fontSize: 12
  },
  articleLink: {
    textDecoration: "none",
    color: "#A61D55"
  },
  CarouselDiv: {
    height: 190,
    objectFit: "cover",
    borderRadius: 5,
    position: "relative"
  },
  CardCarouselImage: {
    position: "relative"
  },
  favoriteButtonStyle: {
    color: "#ff616b",

    width: 35,
    height: 35,
    marginTop: 0,
    marginRight: 4,
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      width: 35,
      height: 35
    },
    position: "absolute",
    zIndex: 1,
    right: "10px",
    top: "15px"
  },
  emptyFavoriteButtonStyle: {
    color: "#f5f5f5",
    width: 35,
    height: 35,
    marginTop: 0,
    marginRight: 4,
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      width: 35,
      height: 35
    },
    position: "absolute",
    zIndex: "1",
    right: "10px",
    top: "15px"
  },
  closeButton:{
    color: "#f5f5f5",
    width: 35,
    height: 35,
    position: "absolute",
    zIndex: "1",
    left: "10px",
    top: "15px",
    zIndex:50

  }
});

class MapMarker extends React.Component {

  markerClickInChild = () => {
    this
      .props
      .handleMarkerClick( this.props.pageid );
  }

  closeAllMarkers = () => {
    this.props.closeAllMarkers();
  }

  render() {
    const { classes, pageid, hoveredCardId, clickedMarker, location } = this.props;

    if(pageid == hoveredCardId){

      return (
      <div className={classes.markerParent}>

      <span className={classNames(classes.tooltips_span, classes.niftyHoverBackground)}>{this.props.name}</span>
  
      </div>
      )

    }
    else if (pageid == clickedMarker) {
      return (
      <div className={classes.cardParent}>
      <Card
        className={classes.card}
       >
        <div className={classes.CarouselDiv}>
          <CardCarousel
            location={location}
            className={classes.CardCarouselImage}
          />
          <FavoritingButton {...this.props} location={location} />
          <Clear className={classes.closeButton} onClick={this.closeAllMarkers} />
        </div>

        <CardContent className={classes.cardContentArea}>
          <Typography noWrap className={classes.yearArea} component="p">
            Featured in: <span className={classes.year}>{location.year}</span> ·{" "}
            <a
              href={location.article_link}
              className={classes.articleLink}
              target="_blank">
              Original Article <Launch className={classes.launchicon} />
            </a>
          </Typography>

          <Typography variant="h6" component="h2">
            {location.location_name}
          </Typography>
          <div className={classes.snippet_area}>
            <Typography className={classes.snippet_text} noWrap component="p">
              {location.clean_snippet}
            </Typography>
            <Typography component="p">
              <a
                href={location.url}
                style={{
                  textDecoration: "none",
                  color: "#008489",
                  fontWeight: 600,
                  fontSize: 12
                }}
                className={classes.articleLink}
                target="_blank">
                Learn More
              </a>
            </Typography>
          </div>
        </CardContent>
      </Card>
  
      </div>
    );

    }
    else {
       return (
      <div className={classes.markerParent} onClick={this.markerClickInChild}>

      <span className={classes.tooltips_span}>{this.props.name}</span>
  
      </div>
      )
    }

    
  }
}

MapMarker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MapMarker);