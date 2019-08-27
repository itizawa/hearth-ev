const getNow = () => {
  var now = new Date()
  var year = now.getFullYear()
  var mon = now.getMonth() + 1 // １を足すこと
  var day = now.getDate()
  var hour = now.getHours()
  var minutes = now.getMinutes()

  // 出力用
  var s = year + '/' + mon + '/' + day + ' ' + hour + ':' + minutes
  return s
}

export default getNow
