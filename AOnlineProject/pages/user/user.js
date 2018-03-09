//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('view.open-type.getUserInfo'),
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      console.dir("asdfasdfasdf");
    }
  },
  //点击获取头像的时候回去执行这个函数（不管是允许还是拒绝，允许就会返回用户微信的基本信息，拒绝就是undefinded）
  getUserInfo: function (e) {
    if (!!e.detail.userInfo){
      //如果用户选择允许
      console.dir("允许用户用户信息");
    }else{
      //如果用户选择拒绝
      console.dir("拒绝用户用户信息");
    }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

 
})

