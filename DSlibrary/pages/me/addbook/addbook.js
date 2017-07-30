// pages/storage/storage.js
const api = require('../../../utils/api.js')
const utils = require('../../../utils/util.js')
const UI = require('../../../utils/ui.js')
var app = getApp()

Page({
  data: {
    info: {
      title: '',
      author: '',
      isbn: '',
      pubdate: '',
      publisher: '',
      summary: ''
    },
    tags: app.globalData.tags,
    index: 0,

  },
  onLoad(options) {
    this.setData({
      info: options
    })
  },
  choseTag(e) {
    var index = Number(e.detail.value)
    this.setData({
      index: index
    })
  },
  confirmAddBook() {
    var obj = {
      isbn: this.data.info.isbn,
      title: this.data.info.title,
      info: {
        author: this.data.info.author,
        publisher: this.data.info.publisher,
        pubdate: this.data.info.pubdate,
        summary: this.data.info.summary
      },
      tag: this.data.tags[this.data.index]
    }
    api.addBook(obj)
      .then(() => {
        wx.navigateBack({
          delta: 1
        })
        UI.successToast('添加成功')
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
