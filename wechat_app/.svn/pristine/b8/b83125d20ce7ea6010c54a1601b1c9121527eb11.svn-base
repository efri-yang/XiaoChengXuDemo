const CONFIG = require('../../config')
const app = getApp()

Page({

  data: {
    userinfo: null,
    count: 0,
    list: {},
    page: 1,
    loading: false,
    nomore: true,
    identity: null,
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })

    app.showMsg('加载中', 'loading', 5000)

    this.getOther(parameter.userId, this.data.page)
  },

  getOther: function (user_id, page) {
    if (page > 1 && this.data.count > 0 && this.data.count < this.data.page * 20) {
      this.setData({
        loading: false,
        nomore: false,
      })

      return
    }
    app.getLocation(loc => {
      wx.request({
        url: CONFIG.api,
        data: {
          callback: 'xhb.others',
          user_id: user_id,
          lat: loc.latitude,
          lng: loc.longitude,
          page: page
        },
        success: res => {
          if (!res.data.data.count) {
            var list = null
          } else {
            var list = page > 1 ? this.data.list.concat(res.data.data.list) : res.data.data.list
          }

          this.setData({
            list: list,
            userinfo: res.data.data.user_info,
            identity: res.data.data.identity ? res.data.data.identity : null,
            count: res.data.data.count,
            page: page,
            loading: false,
          });

          setTimeout(function () {
            if (page == 1) {
              wx.hideToast()
            }
          }, 500)
        }
      })
    })
  },

  // onReachBottom: function () {
  //   this.setData({
  //     loading: true
  //   })

  //   this.getOther(this.data.userinfo.user_id, this.data.page + 1)
  // },

})