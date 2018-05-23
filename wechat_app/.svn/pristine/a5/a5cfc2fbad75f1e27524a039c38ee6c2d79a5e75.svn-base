const CONFIG = require('../../../config')
const app = getApp()

Page({

  data: {
    detail: {},
    currentitem: 1,
    isCollection: false,
    bdAll: false,
    articleAll: false,
    showBdText: '其他热门榜单',
    showArticleText: '更多推文',
    favText: '',
    popshow: true,
    posName: '',
    popUser: 0,
    now_num: 0,
    userinfo: {
      user_id: 0
    },
    homeIcon: false,
    show: false,
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })

    app.showMsg('加载中', 'loading', 5000)
    this.getDetail(parameter.bizId)
    this.getUser()
  },

  onShow: function () {
    if (app.globalData.scene == 1007 || app.globalData.scene == 1008) {
      this.setData({
        homeIcon: true
      })

      app.globalData.scene = 1001
    }
  },

  doLogin: function () {
    app.getUserAuth(isAuth => {
      if (isAuth) {
        wx.checkSession({
          success: res => {
            this.getUser()
          },
          fail: res => {
            app.login(isLogin => {
              if (isLogin) {
                this.getUser()
              }
            })
          }
        })
      }
    })
  },

  getDetail: function (bizId) {
    app.getLocation(loc => {
      wx.request({
        url: CONFIG.api,
        data: {
          callback: "xhb.biz_detail",
          biz_id: bizId,
          user_id: this.data.userinfo.user_id,
          lat: loc.latitude,
          lng: loc.longitude,
          track: 1,
        },
        success: res => {
          this.setData({
            detail: res.data.data.detail,
            isCollection: res.data.data.detail.is_collected,
            favText: "(" + res.data.data.detail.fav_num + "人想去)",
            num: res.data.data.detail.fav_num,
            show: true,
          });

          wx.setNavigationBarTitle({
            title: res.data.data.detail.name,
          })

          wx.hideToast();
        }
      })
    })
  },

  swiperChange: function (e) {
    var index = e.detail.current + 1;
    this.setData({
      currentitem: index
    });
  },

  phonecall: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.detail.contact
    })
  },

  //收藏
  collectionOpt: function () {
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: CONFIG.api,
      data: {
        callback: 'xhb.set_fav',
        user_id: this.data.userinfo.user_id,
        target_id: this.data.detail.id,
        type: 2
      },
      success: res => {
        if (res.data.errCode != 0) {
          app.showMsg(res.data.errMessage)
        }
        else {
          if (this.data.isCollection) {
            this.setData({
              isCollection: false,
              num: this.data.num - 1,
              favText: "(" + (this.data.num - 1) + "人想去)"
            })
          } else {
            this.setData({
              isCollection: true,
              num: this.data.num + 1,
              favText: "(" + (this.data.num + 1) + "人想去)"
            })
          }
        }
      }
    })
  },

  showBdList: function () {
    if (this.data.bdAll) {
      this.setData({
        bdAll: false,
        showBdText: '其他热门榜单'
      })
    } else {
      this.setData({
        bdAll: true,
        showBdText: '收起'
      })
    }
  },

  showArticleList: function () {
    if (this.data.articleAll) {
      this.setData({
        articleAll: false,
        showArticleText: '更多推文'
      })
    } else {
      this.setData({
        articleAll: true,
        showArticleText: '收起'
      })
    }
  },

  addDresserTitle: function (e) {
    var user_id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name

    this.setData({
      popName: name,
      popshow: false,
      popUser: user_id
    })
  },

  formReset: function () {
    this.setData({
      popshow: true
    })
  },

  formSubmit: function (e) {
    var formData = e.detail.value

    formData.biz_id = this.data.detail.id
    formData.callback = 'xhb.set_label'

    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: CONFIG.api,
      data: formData,
      success: res => {
        if (res.data.errCode == 0) {
          app.showMsg('设置成功', 'success')
          this.getDetail(formData.biz_id)
          this.setData({
            popshow: true
          })
        }
        else {
          app.showMsg(res.data.errMessage)
        }
      }
    })
  },

  getUser: function () {
    wx.getStorage({
      key: 'user_info',
      success: res => {
        this.setData({
          userinfo: res.data,
        })
      },
    })
  },

  onShareAppMessage: function () {
    return {
      title: '分享你的品质好生活。',
      path: 'pages/bangdan/bizdet/bizdet?bizId=' + this.data.detail.id,
      success: function (res) {
        app.globalData.scene = 1001
        this.setData({
          homeIcon: false
        })
      },
      fail: function (res) {
        app.globalData.scene = 1001
        this.setData({
          homeIcon: false
        })
      }
    }
  }
})