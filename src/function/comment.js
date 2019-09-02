import firebase from 'firebase/app'

import getNow from './getNow'

/**
 * コメントに関するfunction
 */

/**
 * コメントデータを取得するためのfunction
 * @return {comments} コメントデータを返す
 */
export const fetchCommentData = async () => {

  console.log('here is function')

  return topics
}

/**
 * コメントを投稿したときの処理
 * @param [Object] userData 現在のユーザーデータ
 * @param [Object] topicData トピック
 * @param [Object] cardData カードデータ
 * @param [String] commentText コメント
 */
export const createNewComment = async (userData, topicData, cardData, commentText) => {

  const db = firebase.firestore()

  const ref = await db.collection('Comments').add({
    creator: userData.displayName,
    creator_id: userData.uid,
    creator_img: userData.photoURL,
    text: commentText,
    like: [],
    create_at: getNow(),
    topic_name: topicData.topic_name,
    topic_id: topicData.topic_id,
    card_id: cardData.card_id || '',
    card_name: cardData.card_name || '',
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })

  await db.collection('Comments').doc(ref.id).set({ comment_id: ref.id }, { merge: true })
  await db.collection('Users').doc(userData.uid).update('comments', firebase.firestore.FieldValue.increment(1))

  // timestampを事前に取得
  const time_data = { update_at: await getNow(), timestamp: await firebase.firestore.FieldValue.serverTimestamp() }

  // カードについてのコメントはカード以下にcommentのカウントを+1
  if (cardData.card_id) {
    db.collection('Cards').doc(cardData.card_id).update('comments', firebase.firestore.FieldValue.increment(1))
    db.collection('Cards').doc(cardData.card_id).set(time_data, { merge: true })
  }

  // トピックについてのコメントはカード以下にcommentのカウントを+1
  if (topicData.topic_id) {
    db.collection('Topics').doc(topicData.topic_id).update('comments', firebase.firestore.FieldValue.increment(1))
    db.collection('Topics').doc(topicData.topic_id).set(time_data, { merge: true })
  }

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

  firebase.firestore().collection('Comments').doc(comment_id).update({
    like: firebase.firestore.FieldValue.arrayUnion(user_id)
  })

  firebase.firestore().collection('Users').doc(creator_id).update(
    'acquired', firebase.firestore.FieldValue.increment(1)
  )
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

  firebase.firestore().collection('Comments').doc(comment_id).update({
    like: firebase.firestore.FieldValue.arrayRemove(user_id)
  })

  firebase.firestore().collection('Users').doc(creator_id).update(
    'acquired', firebase.firestore.FieldValue.increment(-1)
  )
}
