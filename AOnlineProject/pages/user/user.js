//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    denglu:"",
    hasUserInfo: false
  },
  onLoad: function () {
    var that=this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }

    wx.login({
      success:res=>{
        console.dir(res.code);
        that.data.denglu="哈哈，我登录了"
      }
    })
  },
 
  //点击获取头像的时候回去执行这个函数（不管是允许还是拒绝，允许就会返回用户微信的基本信息，拒绝就是undefinded）
  getUserInfo: function (e) {
    if (!!e.detail.userInfo){
      //如果用户选择允许
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
    }else{
      //如果用户选择拒绝
     
    }
   
   
    
  }

 
})

