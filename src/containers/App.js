import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Header from "../components/Header.js";
import FilterBar from "./FilterBar.js";
import LocationsGrid from "../components/LocationsGrid.js";
import MapAndMarkers from "../components/MapAndMarkers.js";
import bucketlistjson from "../data/bucketlist.json";
import { withStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import LoginSignupModal from "../components/LoginSignupModal.js";
import HelpDrawer from "../components/HelpDrawer.js";


const matchChipsAndTags = function(chips, year) {
  return chips.some(function(chip) {
    return year === chip.label && chip.showing === true;
  });
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff8e8c",
      main: "#484848",
      dark: "#7E1541",
      contrastText: "#fff"
    },
    secondary: {
      light: "#008489",
      main: "#ff5a5f",
      dark: "#004e5a",
      contrastText: "#000"
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    textTransform: "none",
    color: "#484848",
    button: {
      textTransform: "none"
    },
    subtitle1: {
      fontWeight: 600,
      color: "#484848",
      fontSize: 14
    },
    h6: {
      fontSize: 16,
      fontWeight: 600,
      color: "#484848"
    }
  }
});

const styles = {
  planeIcon: {
    color: "#F44436",
    marginTop: 15,
    marginRight: 15,
    fontSize: 35
  },
  mapDiv: {
    height: "82vh",
    width: "70%",
    display: "inline-block",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  superParentDiv: {
    padding: "0px 0px 0px 30px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px"
    }
  }
};

class App extends Component {
  state = {
    locations: bucketlistjson,
    years: [
      {
        key: 0,
        label: 2011,
        showing: true
      },
      {
        key: 1,
        label: 2012,
        showing: true
      },
      {
        key: 2,
        label: 2013,
        showing: true
      },
      {
        key: 3,
        label: 2014,
        showing: true
      },
      {
        key: 4,
        label: 2015,
        showing: true
      },
      {
        key: 5,
        label: 2016,
        showing: true
      },
      {
        key: 6,
        label: 2017,
        showing: true
      },
      {
        key: 7,
        label: 2018,
        showing: true
      }
    ],
    mapShowing: true,
    filterValue: "",
    favorites: [],
    LoginSignupModalOpen: false,
    user: null,
    drawerOpen: false
  };

   componentDidMount = () => {
    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //   if (firebaseUser) {
    //     this.setState({
    //       user: firebaseUser
    //     });
    //   }
    // });

   //   console.log('test')

    firebase.auth().onAuthStateChanged(firebaseUser => {

      
      if (firebaseUser) {
       // console.log(firebaseUser);
        // there is a user logged in
        firebase
          .database()
          .ref("users/" + firebaseUser.uid + "/favorites")
          .on("value", snapshot => {
            let newFavorites = [];
            snapshot.forEach(function(favorite) {
              newFavorites.push({
                id: favorite.key,
                ...favorite.val()
              });
            });
            this.setState({
              user:firebaseUser,
              favorites: newFavorites
            });
          });
      }
    });
  };

  toggleLoginSignupModal = () => {
    //console.log('yes')
    this.setState({ LoginSignupModalOpen: !this.state.LoginSignupModalOpen });
  };

  toggleChipProperty = key => event => {
    let newyears = this.state.years.map(el => {
      if (el.key === key)
        return Object.assign({}, el, { showing: !el.showing });
      return el;
    });

    this.setState({ years: newyears });
  };

  handleSearch = e => {
    this.setState({ filterValue: e.target.value });
  };

  clearAllChips = () => {
    let newyears = this.state.years.map(el => {
      return Object.assign({}, el, { showing: false });
    });

    this.setState({ years: newyears });
  };

  selectAllChips = () => {
    let newyears = this.state.years.map(el => {
      return Object.assign({}, el, { showing: true });
    });

    this.setState({ years: newyears });
  };

  toggleMapShowing = () => {
    this.setState({ mapShowing: !this.state.mapShowing });
  };

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  };

 

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ user: null });
      });
  };

  render() {
    //console.log(this.state.user);

    const { classes } = this.props;

    let locationsOrderedByYear = this.state.locations.sort(function(a, b) {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    });

    let textfilteredlocations = locationsOrderedByYear.filter(location =>
      location.location_name
        .toLowerCase()
        .includes(this.state.filterValue.toLowerCase())
    );

    let filteredlocations = textfilteredlocations.filter(location =>
      matchChipsAndTags(this.state.years, location.year)
    );

    // );

    // console.log(filteredlocations)

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.superParentDiv}>
          <div>
            <Header
              handleSearch={this.handleSearch}
              filterValue={this.state.filterValue}
              user={this.state.user}
              logOut={this.logOut}
              toggleLoginSignupModal={this.toggleLoginSignupModal}
              toggleDrawer={this.toggleDrawer}
            />
          </div>
          <div>
            <FilterBar
              years={this.state.years}
              toggleChipProperty={this.toggleChipProperty}
              clearAllChips={this.clearAllChips}
              selectAllChips={this.selectAllChips}
              toggleMapShowing={this.toggleMapShowing}
              mapShowing={this.state.mapShowing}
            />
          </div>

          <div
            style={{
              marginTop: "21vh",
              height: "79vh",
              display: "flex",
              justifyContent: "space-between"
            }}>
            <LocationsGrid
              locations={filteredlocations}
              mapShowing={this.state.mapShowing}
              favorites={this.state.favorites}
              user={this.state.user}
              toggleLoginSignupModal={this.toggleLoginSignupModal}
            />
          </div>
          <LoginSignupModal
            open={this.state.LoginSignupModalOpen}
            toggleLoginSignupModal={this.toggleLoginSignupModal}
            uiConfig={this.props.uiConfig}
          />
          <HelpDrawer toggleDrawer={this.toggleDrawer} open={this.state.drawerOpen} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);