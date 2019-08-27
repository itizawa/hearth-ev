import firebase from "firebase/app";

/**
 * コメントに関するfunction
 */


/**
 * likeボタンを押した時の処理
 */
const addToLikeList = (comment_id, user_id, creator_id) => {
  firebase
    .firestore()
    .collection("Comments")
    .doc(comment_id)
    .update({
      like: firebase.firestore.FieldValue.arrayUnion(user_id)
    });
  firebase
    .firestore()
    .collection("Users")
    .doc(creator_id)
    .update("acquired", firebase.firestore.FieldValue.increment(1));
};

export default addToLikeList;
