import firebase from 'firebase/app'; //必須
import 'firebase/firestore';
import { firebaseConfig } from './config';
import 'firebase/auth';
import 'firebase/database';
import "firebase/storage";

firebase.initializeApp(firebaseConfig);

export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const db = firebase.firestore();
export const database = firebase.database();
export default firebase;