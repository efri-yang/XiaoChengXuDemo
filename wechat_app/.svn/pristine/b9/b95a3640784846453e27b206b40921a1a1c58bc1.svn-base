const CONFIG = require('../../../config')
const app = getApp()

Page({

  data: {
    id: 0,
    detail: null,
    inviter: null,
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
    
    wx.request({
      url: CONFIG.api,
      data: {
        callback: 'xhb.invitation_detail',
        id: parameter.id,
      },
      success: res => {
        this.setData({
          id: parameter.id,
          detail: res.data.data.detail,
          inviter: res.data.data.inviter
        })
      }
    })
  },

  onShareAppMessage: function () {
    var path = this.data.detail.type == 1 ? 'creator' : 'transfer'

    return {
      title: '因为你喜欢的才上榜',
      path: '/pages/uc/receive/' + path + '?id=' + this.data.id
    }
  }
})