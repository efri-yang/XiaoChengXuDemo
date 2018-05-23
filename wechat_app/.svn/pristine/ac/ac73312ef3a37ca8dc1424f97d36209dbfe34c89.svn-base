const CONFIG = require('../../../config')
const app = getApp()
var userinfo = wx.getStorageSync('user_info')

Page({
  data: {
    userinfo:null,
    count: 0,
    page: 1,
    list: null,
    loading: false,
    nomore: true,
    systemInfo: [],
  },

  onLoad: function () {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
  },

  onShow: function () {
    this.setData({
      userinfo:userinfo
    })

    this.getList(this.data.page)
  },

  //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    })

    this.getList(this.data.page, true)
  },

  //上拉加载
  onReachBottom: function () {
    this.setData({
      loding: true
    })

    this.getList(this.data.page + 1)
  },

  getList: function (page, pull = false) {
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

    wx.request({
      url: CONFIG.api,
      data: {
        callback: 'xhb.my_invitation',
        user_id: userinfo.user_id,
        page: page
      },
      success: res => {
        if (!res.data.data.count) {
          var list = null
        } else {
          var list = page > 1 ? this.data.list.concat(res.data.data.list) : res.data.data.list
        }

        this.setData({
          count: res.data.data.count,
          list: list,
          page: page,
          loading: false,
        })

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
  }

})
