const CONFIG = require('../../config')
const app = getApp()

Page({
  data: {
    count: 0,
    sort: 0,
    page: 1,
    cms: null,
    list: null,
    loading: false,
    nomore: true,
    twinkling: [],
    systemInfo: [],
    firstLoad: true
  },

  onLoad: function () {
    app.showMsg('加载中', 'loading', 500)

    this.setData({
      systemInfo: app.globalData.systemInfo
    })
  },

  onShow: function () {
    if (this.data.firstLoad) {
      this.setData({
        firstLoad: false,
        category: app.globalData.category
      })

      setTimeout(() => {
        this.getList(this.data.sort, this.data.page)
      }, 500);
    }
    else {
      this.getList(this.data.sort, this.data.page)
    }

    setTimeout(function () {
      var indexvideoContext = wx.createVideoContext('indexvideo');
      indexvideoContext.play();
    }, 500)
  },

  //切换推荐
  sortRecom: function () {
    this.setData({
      sort: 0,
      page: 1
    })

    this.getList(this.data.sort, this.data.page)
  },

  //切换最新
  sortNewest: function () {
    this.setData({
      sort: 1,
      page: 1
    })

    this.getList(this.data.sort, this.data.page)
  },

  //上拉加载
  onReachBottom: function () {
    this.setData({
      loding: true
    })

    this.getList(this.data.sort, this.data.page + 1)
  },

  //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    })

    this.getList(this.data.sort, this.data.page, true)
  },

  getList: function (sort, page, pull = false) {
    if (page > 1 && this.data.count > 0 && this.data.count < this.data.page * 20) {
      this.setData({
        loading: false,
        nomore: false,
      })

      return
    }

    wx.request({
      url: CONFIG.api,
      data: {
        callback: 'xhb.index',
        sort: sort,
        category_id: app.globalData.category.id,
        page: page
      },
      success: res => {
        if (res.data.data.count == 0) {
          var list = null
        } else {
          var list = page > 1 ? this.data.list.concat(res.data.data.list) : res.data.data.list
        }

        this.setData({
          count: res.data.data.count,
          list: list,
          page: page,
          sort: sort,
          loading: false,
          cms: res.data.data.cms ? res.data.data.cms : null,
        })

        if (this.data.cms == null && this.data.list == null) {
          var twinkling = [];
          for (var i = 0; i < 300; ++i) {
            var style = [
              {
                top: Math.floor(Math.random() * 400 + 1),
                left: Math.floor(Math.random() * 530 + 1),
                width: Math.floor(Math.random() * 10 + 1),
                duration: Math.floor(Math.random() * 10 + 5) / 10
              }
            ]
            twinkling = twinkling.concat(style);
          }
          this.setData({
            twinkling: twinkling
          })
        }

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
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: '分享你的品质好生活。',
      path: 'pages/index/index',
    }
  }
})
