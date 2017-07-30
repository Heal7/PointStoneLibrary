// pages/index/detail/detail.js
const api = require('../../../utils/api.js')
const UI = require('../../../utils/ui.js')
var app = getApp()
var maxSummaryLength = 200
Page({
  data: {
    book: {},
    bookID: '',
    userID: '',
    name: ''
  },
  onLoad(options) {
    this.data.bookID = options.bookID
    api.searchBookById(this.data.bookID)
      .then((res) => {
        this.renderBook(res)
      })
      .catch((err) => {
        console.log(err)
      })
    this.setData({
      userID: app.globalData.user.userID,
      name: app.globalData.user.name
    })
  },
  renderBook(book) {
    var summary = book.attributes.info.summary.replace(/[\r\n]/g, "")
    if (summary.length > maxSummaryLength) {
      book.attributes.info.summary = summary.slice(0, maxSummaryLength) + '......'
    }
    this.setData({
      book: book.attributes
    })
  },
  borrow() {
    api.borrow(this.data.name, this.data.userID, this.data.bookID)
      .then(() => {
        UI.successToast('借书成功。')
        return api.searchBookById(this.data.bookID)
      })
      .then((res) => {
        this.renderBook(res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  returnBook() {
    api.returnBook(this.data.userID, this.data.book.title, this.data.book.borrowDate, this.data.bookID)
      .then(() => {
        UI.successToast('还书成功。')
        return api.searchBookById(this.data.bookID)
      })
      .then((res) => {
        this.renderBook(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
