import firebase from 'firebase/app'

/**
 * コメントに関するfunction
 */

/**
 * コメントを投稿したときの処理
 * @param {*} comment_id 
 * @param {*} user_id 
 * @param {*} creator_id 
 */
export const createNewComment = () => {
  console.log('here is function')
}

/**
 * likeボタンを押した時の処理
 * コメントにuser_idの追加
 * user獲得数を+1
 * @param [String] comment_id コメントのid
 * @param [String] user_id 現在のユーザーのid
 * @param [String] creator_id コメント作成者のid
 */
export const addToLikeList = (comment_id, user_id, creator_id) => {
  firebase
    .firestore()
    .collection('Comments')
    .doc(comment_id)
    .update({
      like: firebase.firestore.FieldValue.arrayUnion(user_id)
    })
  firebase
    .firestore()
    .collection('Users')
    .doc(creator_id)
    .update('acquired', firebase.firestore.FieldValue.increment(1))
}

/**
 * likeボタンを取り消した時の処理
 * コメントからuser_idを削除する
 * user獲得数を-1
 * @param [String] comment_id コメントのid
 * @param [String] user_id 現在のユーザーのid
 * @param [String] creator_id コメント作成者のid
 */
export const removeFromLikeList = (comment_id, user_id, creator_id) => {
  firebase
    .firestore()
    .collection('Comments')
    .doc(comment_id)
    .update({
      like: firebase.firestore.FieldValue.arrayRemove(user_id)
    })
  firebase
    .firestore()
    .collection('Users')
    .doc(creator_id)
    .update('acquired', firebase.firestore.FieldValue.increment(-1))
}
