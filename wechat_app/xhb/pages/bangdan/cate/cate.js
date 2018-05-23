const CONFIG = require('../../../config')
const app = getApp()

Page({
  data: {
    cates: null,
    currentId: 0,
    systemInfo: [],
  },

  onLoad: function () {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
  },

  onShow: function () {
    wx.request({
      url: CONFIG.api,
      data: {
        callback: 'xhb.category'
      },
      success: res => {
        this.setData({
          cates: res.data.data,
          currentId: app.globalData.category.id
        })
      }
    })
  },

  getCurrentId: function (e) {
    app.globalData.category = {
      id: e.currentTarget.dataset.id,
      name: e.currentTarget.dataset.name
    }

    wx.switchTab({
      url: '../../index/index',
    })
  }
  
})