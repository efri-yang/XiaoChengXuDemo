//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
    loginCode: null,
    encryptedData: null,
    iv: null,
    server: 'https://wnworld.com/api/xiaochengxu'
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getSetting({
        success: res1 => {
          if (res1.authSetting['scope.userInfo']) {
            that.globalData.userInfo = res1.userInfo;
            that.globalData.iv = res1.iv;
            that.globalData.encryptedData = res1.encryptedData;
            typeof cb == "function" && cb(that.globalData.userInfo)
          } else {
            wx.getUserInfo({
              success: res2 => {
                if (res2)
                that.globalData.userInfo = res2.userInfo
                that.globalData.iv = res1.iv;
                that.globalData.encryptedData = res1.encryptedData;
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          }
        }
      })
    }
  },

  _getUserInfo: function (e){
    if (!!e.detail.userInfo) {
      //用户同意
        this.globalData.userInfo = e.detail.userInfo;
    }
  }
  

 
 
})