const CONFIG = require('../../../config')
const app = getApp()

Page({

  data:{
    detail:{},
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })

    app.showMsg('加载中', 'loading', 5000)

    wx.request({
      url: CONFIG.api,
      data: {
        callback: "xhb.biz_article",
        id: parameter.id,
      },
      success: res => {
        this.setData({
          detail: res.data.data.detail
        })
        wx.hideToast();
      }
    })
  }
})