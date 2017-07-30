// pages/me/me.js
const api = require('../../utils/api.js')
const UI = require('../../utils/ui.js')
const utils = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    name: '',
    userID: '',
    userInfo:''
  },
  onLoad(){
    var that = this;
     app.getUserInfo(function(userInfo){
        that.setData({
          userInfo:userInfo,
        })
        wx.setStorageSync('userInfo', that.data.userInfo);
      })
  },
  onShow() {
    this.setData({
      name: app.globalData.user.name,
      userID: app.globalData.user.userID
    })
  },
  showBorrowing(e) {
    wx.navigateTo({
      url: '/pages/me/borrowing/borrowing'
    })
  },
  showRecord(e) {
    wx.navigateTo({
      url: '/pages/me/record/record'
    })
  },

  addBook() {
    api.getUserInfo(this.data.userID)
      .then((res) => {
        if (res.attributes.isAdmin) {
          wx.scanCode({
            success: (res) => {
              var isbn = res.result
              api.getBookInfo(isbn)
                .then((res) => {
                  var info = {
                    title: res.subtitle ? (res.title + ':' + res.subtitle) : res.title,
                    isbn: isbn,
                    author: res.author.join(','),
                    publisher: res.publisher,
                    summary: res.summary,
                    pubdate: res.pubdate
                  }
                  wx.navigateTo({
                    url: '/pages/me/addbook/addbook?' + utils.serialize(info)
                  })
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
        } else {
          UI.alert('扫码入库只对管理员开放。')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  bindLogout() {
    wx.clearStorageSync()
    wx.redirectTo({
      url: '/pages/checkin/checkin'
    })
  }
})
