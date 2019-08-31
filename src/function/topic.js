import firebase from "firebase/app"

import getNow from './getNow'

/**
 * トピックに関するfunction
 */

/**
 * topic作成ボタンを押した時の処理
 */
export const createNewTopic = async (topicText) => {

  const ref = await firebase.firestore().collection('Topics').add({
    topic_name: topicText,
    comments: 0,
    update_at: getNow(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })

  // IDを登録する
  await firebase.firestore().collection('Topics')
    .doc(ref.id)
    .set({ topic_id: ref.id }, { merge: true })

}