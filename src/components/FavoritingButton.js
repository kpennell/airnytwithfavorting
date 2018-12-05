import React, { Component } from "react";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import firebase from "firebase";
import { auth, googleprovider } from "../index.js";

export default class FavoritingButton extends Component {


  addToFavorites = location => {

//    console.log('addToFavorites')

    if (!this.props.user) {
      this.props.toggleLoginSignupModal();
    } else {
      let userId = this.props.user.uid;
      let favoritesPath = "users/" + userId + "/favorites";
      firebase
        .database()
        .ref(favoritesPath)
        .push(location);
      //}
    }
  };

  removeFromFavorites = location => {

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        firebase
          .database()
          .ref("users/" + firebaseUser.uid + "/favorites")
          .once("value", snapshot => {
            snapshot.forEach(function(favorite) {
              if (location.pageid === favorite.val().pageid) {
                let favoriteId = favorite.key;
                let favoritesRef = firebase
                  .database()
                  .ref(
                    "users/" + firebaseUser.uid + `/favorites/${favoriteId}`
                  );
                favoritesRef.remove();
              }
            });
          });
      }
    });
  };

  // signin = () => {
  //   auth.signInWithPopup(googleprovider).then(result => {
  //     const user = result.user;
  //     this.setState({
  //       user: user
  //     });
  //   });
  // };

  render() {
    const { favorites, location, classes } = this.props;

    //console.log(this.props.user)

    if (
      favorites.filter(favorite => favorite.pageid === location.pageid)
        .length > 0
    ) {
      return (
        <Favorite
          className={classes.favoriteButtonStyle}
          onClick={() => this.removeFromFavorites(location)}
        />
      );
    } else {
      return (
        <FavoriteBorder
          className={classes.emptyFavoriteButtonStyle}
          onClick={() => this.addToFavorites(location)}
        />
      );
    }
  }
}