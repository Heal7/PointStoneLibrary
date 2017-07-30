//app.js
const AV = require('./libs/av-weapp-min.js');
AV.init({
  appId: '6DK6lc6AWkwIQzVUnnehp4x0-gzGzoHsz',
  appKey: '8f86BcbEIdwpvG3TqbcwBqVc',
});

App({
  globalData: {
    user: null,
    tags: [
      '所有', '其他' , '产品','设计', '前端','安卓' , 'iOS' , '后台开发' , '硬件' , '编程语言' , '算法' , '计算机体系' , '网络' , '云计算',  '大数据' , '机器学习'
    ]
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
})
