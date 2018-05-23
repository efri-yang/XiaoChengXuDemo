const CONFIG = require('../../../config')
const app = getApp()
var WxParse = require('../../../wxParse/wxParse.js');

Page({

  data: {
    list: null,
    rule: '',
    rule_1:'',
    rule_2: '',
    rule_3: '',
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
        callback: 'xhb.bd_rule',
        bd_id: parameter.bdId,
      },
      success: res => {
        
        this.setData({
          list: res.data.data.list,
          rule: res.data.data.rule,
          rule_3: res.data.data.rule_3,
        })
        WxParse.wxParse('rule_1', 'html', res.data.data.rule_1, this, 1)
        WxParse.wxParse('rule_2', 'html', res.data.data.rule_2, this, 1)
        wx.hideToast()
      }
    })
  }

})