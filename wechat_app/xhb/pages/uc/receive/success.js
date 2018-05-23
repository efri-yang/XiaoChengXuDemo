const app = getApp()

Page({

  data: {
    bdId: 0,
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      bdId: parameter.bdId,
      systemInfo: app.globalData.systemInfo
    })
  }

})