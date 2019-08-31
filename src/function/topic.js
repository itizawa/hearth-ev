import firebase from "firebase/app"

import getNow from './getNow'

/**
 * トピックに関するfunction
 */


/**
 * ホットトピックデータを取得するためのfunction
 * @return {topics} 新しい順に3つのトピックを返す
 */
export const fetchHotTopicData = () => {
  var topics = []
  firebase.firestore().collection('Topics')
    .orderBy('timestamp', 'desc')
    .limit(3)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        topics.push(doc.data())
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err)
    })
  return topics
}

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
