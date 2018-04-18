
const app = getApp();


Page({
  data: {
    test: app.globalData.test
  },
  onLoad: function () {
    if (!app.globalData.xyUserInfo) {
      

      
    }
    console.dir(app.globalData.xyUserInfo);
    this.setData({
      xyUserInfo: app.globalData.xyUserInfo
    })
  }




})