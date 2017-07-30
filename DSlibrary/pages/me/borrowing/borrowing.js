// pages/me/borrowing/borrowing.js
const api = require('../../../utils/api.js')
const util = require('../../../utils/util.js')
var app = getApp()

Page({
  data: {
    myBooks: [],
    showEmpty: false
  },
  onShow() {
    var userID = app.globalData.user.userID
    api.getBorrowingBooks(userID)
      .then((res) => {
        res.forEach((book) => {
          book.data.borrowPeriod = Math.floor((new Date() - book.data.borrowDate) / (1000 * 60 * 60 * 24))
          book.data.borrowDate = util.formatTime(book.data.borrowDate)
        })
        this.setData({
          myBooks: res,
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
