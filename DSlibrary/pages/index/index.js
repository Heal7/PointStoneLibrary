//index.js
const api = require('../../utils/api.js')
const UI = require('../../utils/ui.js')
var app = getApp()

Page({
  data: {
    books: [],
    tags: app.globalData.tags,
    tagShow: false,
    showEmpty: false,
    defaultInputValue: ""
  },
  onShow() {
    this.getDefaultBooks()
    this.setData({
      defaultInputValue: "",
      tagShow: false
    })
  },
  renderBook(books) {
    this.setData({
      books: books,
      showEmpty: !books.length,
      tagShow: false
    })
  },
  getDefaultBooks() {
    api.getDefaultBooks()
      .then((res) => {
        this.renderBook(res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  input(e) {
    var name = e.detail.value
    api.searchBooksByName(name)
      .then((res) => {
        this.renderBook(res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  scan() {
    wx.scanCode({
      success: (res) => {
        api.searchBooksByISBN(res.result)
          .then((res) => {
            this.renderBook(res)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      fail(err) {
        console.log(err)
        UI.alert('未识别条形码。')
      }
    })
  },

  toggleTag() {
    this.setData({
      tagShow: !this.data.tagShow,
      defaultInputValue: ""
    })
  },

  tagName(e) {
    var tag = e.target.dataset.tagname
    if (tag == '所有') {
      this.getDefaultBooks()
    } else {
      api.searchBooksByTag(tag)
        .then((res) => {
          this.renderBook(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    this.toggleTag()
  },

  showDetail(e) {
    var bookID = e.currentTarget.dataset.bookid
    wx.navigateTo({
      url: '/pages/index/detail/detail?bookID=' + bookID
    })
  }
})
