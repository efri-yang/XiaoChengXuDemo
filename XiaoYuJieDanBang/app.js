//app.js
App({
  onShow:function(){
    this.globalData.test="APP.onShow";
  },
  globalData: {
    server: "https://wnworld.com/api/JieDanBang/",
    sessionJdbId:"",
    xyUserInfo:"",//存放小鱼用户的信息
  }
})