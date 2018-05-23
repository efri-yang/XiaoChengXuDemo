//app.js
App({
  //微信上面关闭删除后，进来就会触发这个事件，如果只是关闭没有删除小程序，那么不会触发该事件
  onLaunch:function(){
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        var name = 'iPhone X'
        if (res.model.indexOf(name) > -1) {
          that.globalData.isIpx = true
        }
      }
    })
  },
  //每次关闭后在进来（不管有没有删除都会触发这个事件）
  onShow:function(){
    this.globalData.sessionJdbUkey = wx.getStorageSync('sessionJdbUkey');
    this.globalData.sessionJdbBrandId = wx.getStorageSync('sessionJdbBrandId');
    this.globalData.sessionJdbUnionid = wx.getStorageSync('sessionJdbUnionid');
    // this.isLogin();
  },

  isLogin: function (status){
    var that=this;
    if (status && status=="0"){
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }else{
      if (!this.globalData.sessionJdbUkey) {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    }
  },

  clearStorage:function(callback){
    wx.removeStorage({ key: 'sessionJdbUkey'});
    wx.removeStorage({ key: 'sessionJdbBrandId'});
    wx.removeStorage({ key: 'sessionJdbUnionid' });
    this.globalData.sessionJdbUkey ="";
    this.globalData.sessionJdbBrandId ="";
    this.globalData.sessionJdbUnionid = "";
    !!callback && callback();
  },
  
  
  globalData: {
    server: "https://m3.xiaoyu.com/",
    sessionJdbUserInfo:"",//存放小鱼用户的信息
    sessionJdbUkey: "nQa0zRTP7KaBbak5mHcBD4ftu+on8Xg+IIUpkZOm8A3VwzQkFaxEuaxw0XHqXDWlT2Tk0uQH/m5EkTk+mYP6tA==",
    sessionJdbBrandId:838,
    sessionJdbUnionid:""
    // sessionJdbUkey: "SwDKsfcimRSBEV6uDKDv86whONhccusgFFzN8D/oC9aCd8+XYlq7HTpSIev4Oi7ep+34mfu8uoyv6IocqCTdag==",
    // sessionJdbBrandId:784
    // sessionJdbUkey: "mpJ7FUTslDm0MhS6Wiy1oUR8wKd1AmX26ZEuVnbnfsE55SurNKXSETw6jgkgQJr/KG+z1063jzCf2x+adUp1CQ==",
    // sessionJdbBrandId: 838
  }
})