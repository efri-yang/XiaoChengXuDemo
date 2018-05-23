const CONFIG = require('../../../config')
const app = getApp()

Page({
  
  data: {
    count: 0,
    list: null,
    page: 1,
    loading: false,
    nomore: true,
    bizId: 0,
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })

    this.getElse(parameter.bizId, this.data.page)
    this.setData({
      bizId: parameter.bizId
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    })

    this.getElse(this.data.bizId,this.data.page, true) 
  },

  //上拉加载
  onReachBottom: function () {
    this.setData({
      loading: true
    })

    this.getElse(this.data.bizId, this.data.page + 1)
  },

  getElse: function (bizId, page, pull = false) {
    var userinfo = wx.getStorageSync('user_info')

    if (page > 1 && this.data.count > 0 && this.data.count < this.data.page * 20) {
      this.setData({
        loading: false,
        nomore: false,
      })

      return
    }

    if (page == 1) {
      app.showMsg('加载中', 'loading', 5000)
    }

    app.getLocation(loc => {
      wx.request({
        url: CONFIG.api,
        data: {
          callback: "xhb.else_biz",
          biz_id: bizId,
          lat: loc.latitude,
          lng: loc.longitude,
          page: page
        },
        success: res => {
          if (!res.data.data.count) {
            var list = null
          } else {
            var list = page > 1 ? self.data.list.concat(res.data.data.list) : res.data.data.list
          }

          this.setData({
            list: list,
            count: res.data.data.count,
            page: page,
            loading: false,
          });

          setTimeout(function () {
            if (page == 1) {
              wx.hideToast()
            }
            if (pull === true) {
              wx.stopPullDownRefresh()
            }
          }, 500)
        }
      })
    })
  }
})