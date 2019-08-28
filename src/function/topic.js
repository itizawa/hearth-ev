import firebase from 'firebase/app'

/**
 * トピック関するfunction
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
