//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that=this;
    wx.login({
        success:res=>{
          this.globalData.loginCode=res.code
         
          wx.request({
            url:this.globalData.server+"/getSession.php",
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },

            data:{
              code:res.code
            },
            success:function(res){
                if(!!res){
                  
                  console.dir(res.data);
                }
            }
          })
        }
    })
  },
  
  globalData: {
    test: "xxxxx",
    userInfo: null,
    loginCode: null,
    encryptedData: null,
    iv: null,
    server: "https://wnworld.com/api/xiaochengxu"
  }
})



// // 登录
// wx.login({
//   success: res => {
//     this.globalData.loginCode = res.code;
//     // 发送 res.code 到后台换取 openId, sessionKey, unionId

//     wx.getUserInfo({
//       success: res => {
//         this.globalData.userInfo = res.userInfo
//         this.globalData.iv = res.iv
//         this.globalData.encryptedData = res.encryptedData
//       }
//     })
//   }
// })
// // 获取用户信息
// wx.getSetting({
//   success: res => {
//     if (res.authSetting['scope.userInfo']) {
//       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//       wx.getUserInfo({
//         success: res => {
//           // 可以将 res 发送给后台解码出 unionId
//           this.globalData.userInfo = res.userInfo

//           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//           // 所以此处加入 callback 以防止这种情况
//           if (this.userInfoReadyCallback) {
//             this.userInfoReadyCallback(res)
//           }
//         }
//       })
//     }
//   }
// })