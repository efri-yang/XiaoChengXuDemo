const CONFIG = require('../../../config')
const app = getApp()

Page({

  data: {
    viewtype: 1,
    isCollection: false,
    SwitchIsOn: false,
    likeNum: 0,
    detail: {},
    ifvote: 0,
    userinfo: {
      user_id: 0,
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

    this.getDetail(parameter.bdId)
    this.getUser()
  },

  onShow: function () {
    if (this.data.ifvote == 1) {
      this.getDetail(this.data.detail.id)
    }

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

  tapSwitch: function () {
    if (this.data.SwitchIsOn) {
      this.setData({
        SwitchIsOn: false,
        viewtype: 1
      })
    } else {
      this.setData({
        SwitchIsOn: true,
        viewtype: 2
      })
    }
  },

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
        type: 1
      },
      success: res => {
        if (res.data.errCode != 0) {
          app.showMsg(res.data.errMessage)
        }
        else {
          if (this.data.isCollection) {
            this.setData({
              isCollection: false,
              likeNum: this.data.likeNum - 1
            })
          } else {
            this.setData({
              isCollection: true,
              likeNum: this.data.likeNum + 1
            })
          }
        }
      }
    })
  },

  getDetail: function (bdId) {
    app.getLocation(loc => {
      wx.request({
        url: CONFIG.api,
        data: {
          callback: 'xhb.bd_detail',
          bd_id: bdId,
          user_id: this.data.userinfo.user_id,
          lat: loc.latitude,
          lng: loc.longitude,
          hit: 1,
          track: 1
        },
        success: res => {
          this.setData({
            detail: res.data.data.detail,
            isCollection: res.data.data.detail.is_collected ? true : false,
            likeNum: res.data.data.detail.like_num,
            ifvote: res.data.data.detail.ifvote,
            show: true
          })

          wx.hideToast()
        }
      })
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

  turnTo: function (e) {
    if (e.currentTarget.dataset.voted == 0) {
      wx.navigateTo({
        url: '../listdet/optlist?bdId=' + this.data.detail.id,
      })
    }
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: '分享你的品质好生活。',
      path: 'pages/bangdan/listdet/listdet?bdId=' + this.data.detail.id,
      success: res => {
        app.getLocation(loc => {
          wx.request({
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            url: CONFIG.api,
            data: {
              callback: "xhb.share_track",
              bd_id: this.data.detail.id,
              user_id: this.data.userinfo.user_id,
              lat: loc.latitude,
              lng: loc.longitude,
            }
          })
        })

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