var formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var formatTime = (date) => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

var serialize = (obj) => {
  var key, result = []
  for (key in obj) {
    result.push(key + '=' + obj[key])
  }
  return result.join('&')
}

var changeTime = (date) => {
  var year = date.slice(0, 4)
  var month = date.slice(5, 7)
  var day = date.slice(8, 10)
  var time = year + '年' + month + '月' + day + '日'
  return time
}


module.exports = {
  formatTime: formatTime,
  serialize: serialize,
  changeTime: changeTime
}
