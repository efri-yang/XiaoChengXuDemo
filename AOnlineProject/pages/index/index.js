//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  onLoad: function () {
   
  },
  getUserInfo: function (e) {
    if (!!e.detail.userInfo){
      console.dir(e.detail);
      app.globalData.userInfo = e.detail.userInfo;
    }
    
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  
})

