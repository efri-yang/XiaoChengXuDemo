const CONFIG = require('../../../config')
const app = getApp()

Page({
  data: {
    name: '',
    list: [],
    page: 1,
    count: 0,
    scshadow: false,
    focus: false,
    loading: false,
    nomore: true,
    isset: false,
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
    
    wx.getStorage({
      key: 'add_new_biz',
      success: res => {
        this.scfocus()
        this.setData({
          count: 0,
          list: null,
          name: res.data.name,
          isset: true
        })
      },
      fail: res => {
        this.searchBiz(this.data.name, this.data.page)
      }
    })
  },

  //上拉加载
  onReachBottom: function () {
    this.setData({
      loading: true
    })

    this.searchBiz(this.data.name, this.data.page + 1)
  },

  scfocus: function () {
    this.setData({
      scshadow: true,
      focus: true
    })
  },

  scblur: function (e) {
    if (e.detail.value == '') {
      this.setData({
        scshadow: false
      })
    }
  },

  sctext: function (e) {
    this.setData({
      name: e.detail.value,
      count: 0,
      page: 1,
      isset: false
    })

    this.searchBiz(this.data.name.trim(), this.data.page)
  },

  searchBiz: function (keyword, page) {
    if (this.data.count > 0 && this.data.count < this.data.page * 20) {
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
          callback: 'xhb.search_biz',
          keyword: keyword,
          city_id: loc.cityId,
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
            count: res.data.data.count,
            list: list,
            page: page,
            loading: false,
          })

          if (page == 1) {
            wx.hideToast()
          }
        }
      })
    })
  },

  //选择
  addRec: function (e) {
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    var icon = e.currentTarget.dataset.icon
    var storage = wx.getStorageSync('add_biz')
    var obj = { id: id, name: name, icon: icon }

    for (let index in storage) {
      if (storage[index].id == id) {
        wx.navigateBack({})
        return
      }
    }
    
    wx.setStorage({
      key: 'add_biz',
      data: storage.length > 0 ? storage.concat(obj) : [obj],
      success: wx.redirectTo({
        url: '../recommend/list',
      })
    })
  }

})