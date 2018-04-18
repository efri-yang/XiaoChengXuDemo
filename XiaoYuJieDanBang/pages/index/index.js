
const app = getApp();


Page({
  data: {
    test:"cccc"
  },
  onLoad: function () {
    var that=this;
    app.getXyUserInfo(function(){
      that.setData({
        test:"cccccccc"
      })
    })
  }




})