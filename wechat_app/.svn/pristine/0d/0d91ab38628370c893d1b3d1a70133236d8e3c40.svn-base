const CONFIG = require('../../../config')
const app = getApp()
var userinfo = wx.getStorageSync('user_info')

Page({
  data: {
    count: 0,
    list: null,
    page: 1,
    loading: false,
    nomore: true,
    popshow: true,
    systemInfo: [],
  },

  onLoad: function () {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
    
    this.getList(this.data.page)
  },

  //上拉加载
  onReachBottom: function () {
    this.setData({
      loding: true
    })

    this.getList (this.data.page + 1)
  },

  getList: function (page) {
    var self = this

    if (this.data.count > 0 && this.data.count < this.data.page * 20) {
      this.setData({
        loading: false,
        nomore: false,
      })
      return
    }

    wx.request({
      url: CONFIG.api,
      data: {
        callback: 'xhb.my_biz',
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
      }
    })
  },

  invitePing: function (e) {
    app.showMsg('正在生成邀请...', 'loading')
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name == '' ? this.data.list[0].biz_name : e.currentTarget.dataset.name;
    
    wx.request({
      url: CONFIG.api,
      data: {
        callback: 'xhb.invite_ping',
        user_id: userinfo.user_id,
        biz_id: id
      },
      success: res => {
        setTimeout(function(){
          wx.navigateTo({
            url: '../bizs/invite?id=' + id + '&name=' + name,
          })
        }, 500)
      }
    })
  },

})
