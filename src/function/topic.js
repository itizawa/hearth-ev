import firebase from "firebase/app"

import getNow from './getNow'

/**
 * トピックに関するfunction
 */

/**
 * topic作成ボタンを押した時の処理
 */
export const createNewTopic = (topicText) => {
  const data = {
    topic_name: topicText,
    comments: 0,
    update_at: getNow(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }
  console.log(data)
}