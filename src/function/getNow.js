const getNow = () => {
  const now = new Date()
  const year = now.getFullYear()
  const mon = now.getMonth() + 1 // １を足すこと
  const day = now.getDate()
  const hour = now.getHours()
  const minutes = now.getMinutes()

  // 出力用
  const s = year + '/' + mon + '/' + day + ' ' + hour + ':' + minutes
  return s
}

export default getNow
