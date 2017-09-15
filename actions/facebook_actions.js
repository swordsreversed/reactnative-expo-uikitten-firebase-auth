// import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
// import { emailChanged, passwordChanged, signupUser } from '../actions';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_STATUS_CHANGED
} from './types';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  // let token = await AsyncStorage.getItem('fb_token');

  // if (token) {
    // Dispatch an action saying FB login is done
    // dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  // } else {
    // Start up FB Login process
    doFacebookLogin(dispatch);
  // }
};


const doFacebookLogin = async dispatch => {

  let { type, token } = await Facebook.logInWithReadPermissionsAsync('284060508740218', {
    permissions: ['public_profile', 'email']
  });

  dispatch({
    type: LOGIN_STATUS_CHANGED,
    payload: 'checking'
  });

  console.log(credential);
  if (type === 'cancel') {
    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'loginfailed'
    });
    return (dispatch({ type: FACEBOOK_LOGIN_FAIL }));
  }

  var credential = firebase.auth.FacebookAuthProvider.credential(token);
  console.log(token);

  try {
    await firebase.auth().signInWithCredential(credential);
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'notloggedin'
    });
  }
  // await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
