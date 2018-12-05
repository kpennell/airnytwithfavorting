import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker.js";

// import Marker from "./Marker/Marker.js";

const createMapOptions = () => {
  return {
    fullscreenControl: false,
    mapTypeControl: false,
    panControl: false,
    streetViewControl: false,
    zoomControl: "true",
    gestureHandling: "greedy"
  };
};

const styles = theme => ({});

class MapAndMarkers extends React.Component {
  state = {
    clickedMarker: null
  };

  static defaultProps = {
    center: {
      lat: 30,
      lng: -30
    },
    zoom: 0
  };

  openMarkerPopup = key => {
    this.setState({
      clickedMarker: key
    });
  };

  closeAllMarkers = () => {
    this.setState({
      clickedMarker: null
    });
  };

  render() {
    const { classes, locations, hoveredCardId, pageid } = this.props;

    let MapMarkers = locations.map((location, index) => {
      // remove repetetive props from
      return (
        <MapMarker
          location={location}
          key={location.pageid}
          lat={location.lat}
          lng={location.lng}
          name={location.location_name}
          pageid={location.pageid}
          hoveredCardId={hoveredCardId}
          clickedMarker={this.state.clickedMarker}
          handleMarkerClick={this.openMarkerPopup}
          closeAllMarkers={this.closeAllMarkers}
          favorites={this.props.favorites}
          toggleLoginSignupModal={this.props.toggleLoginSignupModal}
          user={this.props.user}
        />
      );
    });

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSfissaI7BPpXln_Jzl_tIUVH1f775C7GXM",
            v: "3.31"
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={50}
          options={createMapOptions}>
          {MapMarkers}
        </GoogleMapReact>
      </div>
    );
  }
}

MapAndMarkers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MapAndMarkers);