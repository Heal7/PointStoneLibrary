var noop = () => {}
var color = '#9866ff'
var UI = {
  alert(msg) {
    this.modal('消息', msg)
  },
  modal(title = '', content = '') {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      confirmColor: color
    })
  },
  dialog(title = '', confirm = noop) {
    wx.showModal({
      title: title,
      showCancel: true,
      confirmColor: color,
      cancelColor: color,
      success(res) {
        if (res.confirm) {
          confirm()
        }
      }
    })
  },
  showLoading(title = "请稍等") {
    wx.showLoading({
      title: title
    })
  },
  hideLoading() {
    wx.hideLoading()
  },
  successToast(title = "成功") {
    wx.showToast({
      title: title,
      icon: "success"
    })
  },
  showNavLoading() {
    wx.showNavigationBarLoading()
  },
  hideNavLoading() {
    wx.hideNavigationBarLoading()
  },
  error() {
    wx.getNetworkType({
      success: (res) => {
        if (res.networkType == 'none') {
          this.modal('网络错误', '请检查网络情况后重新进入。')
        } else {
          this.modal('错误', '请退出后重试。')
        }
      },
      fail: () => {
        this.modal('错误', '服务器错误。')
      }
    })
  }
}
module.exports = UI
