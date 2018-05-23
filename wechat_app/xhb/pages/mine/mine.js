const CONFIG = require('../../config')
const app = getApp()

Page({

  data: {
    userinfo: null,
    biz_num: 0,
    invitation_num: 0,
    identity: null,
    popHide: true,
    systemInfo: [],
  },

  onLoad: function () {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
    
    app.showMsg('加载中', 'loading', 5000)
  },

  onShow: function () {
    app.getUserAuth(isAuth => {
      if (isAuth) {
        wx.checkSession({
          success: res => {
            wx.getStorage({
              key: 'user_info',
              success: res => {
                this.getMine()
              },
              fail: res => {
                app.login(isLogin => {
                  if (isLogin) {
                    this.getMine()
                  }
                })
              }
            })    
          },
          fail: res => {
            app.login(isLogin => {
              if (isLogin) {
                this.getMine()
              }
            })
          }
        })
      }
    })
  },

  getMine: function () {
    wx.getUserInfo({
      success: res => {
        var headimg = res.userInfo.avatarUrl

        wx.getStorage({
          key: 'user_info',
          success: res => {
            var user_info = res.data
            if (headimg == user_info.headimg) {
              headimg = ''
            }

            wx.request({
              url: CONFIG.api,
              data: {
                callback: 'xhb.mine',
                user_id: user_info.user_id,
                headimg: headimg,
              },
              success: res => {
                this.setData({
                  userinfo: res.data.data.user_info,
                  biz_num: res.data.data.biz_num,
                  invitation_num: res.data.data.invitation_num,
                  identity: res.data.data.identity ? res.data.data.identity : null,
                })

                wx.setStorageSync('user_info', this.data.userinfo)
                wx.hideToast()
              }
            })
          },
        })
      },
    })
  },

  editAuth: function () {
    this.setData({
      popHide: false
    })
  },

  formSubmit: function (e) {
    var formData = e.detail.value

    formData.user_id = this.data.userinfo.user_id
    formData.callback = 'xhb.set_identity'

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
          this.getMine()
          this.setData({
            popHide: true
          })
        }
        else {
          app.showMsg(res.data.errMessage)
        }
      }
    })
  },

  formReset: function () {
    this.setData({
      popHide: true
    })
  },

  goToUrl: function () {
    if (this.data.userinfo.group == 1) {
      var url = this.data.invitation_num > 0 ? '../uc/invitation/invitation' : '../uc/invite/create'
    }
    if (this.data.userinfo.group == 2) {
      var url = '../uc/invitation/invitation'
    }

    wx.navigateTo({
      url: url
    })
  }

})