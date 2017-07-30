const api = require('../../../utils/api.js')
const util = require('../../../utils/util.js')
var app = getApp()

Page({
  data: {
    records: [],
    showEmpty: false
  },
  onShow() {
    var userID = app.globalData.user.userID
    api.getRecords(userID)
      .then((res) => {
        res.forEach((book) => {
          book.borrowDate = util.formatTime(book.borrowDate)
          book.returnDate = util.formatTime(book.returnDate)
        })
        this.setData({
          records: res,
          showEmpty: !res.length
        })
      })
  },
  showDetail(e) {
    var bookID = e.currentTarget.dataset.bookid
    wx.navigateTo({
      url: '/pages/index/detail/detail?bookID=' + bookID
    })
  }
})
