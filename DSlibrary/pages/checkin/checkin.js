// pages/login/login.js
const api = require('../../utils/api.js')
const UI = require('../../utils/ui.js')
var app = getApp()

Page({
  data: {
    name: '',
    phone: ''
  },
  onShow() {
    var v = wx.getStorageSync('v1.0')
    if (!v) {
      wx.clearStorageSync()
    }
    var user = wx.getStorageSync('user')
    if (user) {
      app.globalData.user = user
      this.toIndex()
    }
  },
  nameInput(e) {
    this.data.name = e.detail.value
  },
  phoneInput(e) {
    this.data.phone = e.detail.value
  },
  checkIn() {
    var name = this.data.name,
      phone = this.data.phone
    if (name == '' || phone == '') {
      UI.alert('姓名或手机号码不能为空。')
      return
    } else if (!/^1[3|4|5|7|8][0-9]{9}$/.test(phone)) {
      UI.alert('手机号码格式错误。')
      return
    }
    api.checkIn(name, phone)
      .then((res) => {
        app.globalData.user = {
          name: name,
          phone: phone,
          userID: res.id
        }
        wx.setStorageSync('user', {
          name: name,
          phone: phone,
          userID: res.id
        })
        wx.setStorageSync('v1.0', true)
        this.toIndex()
      })
      .catch((err) => {
        console.log(err)
      })
  },
  toIndex() {
    wx.switchTab({
      url: '../../pages/index/index'
    })
  }
})
