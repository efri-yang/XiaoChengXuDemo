const CONFIG = require('../../../config')
const app = getApp()

Page({

  data: {
    id: 0,
    detail: {},
    userinfo: {},
    inviter: {},
    noTip: true,
    msg: '',
    url: '',
    open_type: '',
    button: '',
    icon: '',
    show: false,
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })

    app.showMsg('加载中', 'loading', 5000)

    var getDetail = (user_id) => {
      wx.request({
        url: CONFIG.api,
        data: {
          callback: 'xhb.bind_invitation',
          user_id: user_id,
          id: parameter.id
        },
        success: res => {
          if (res.data.data.status) {
            this.setData({
              id: parameter.id,
              inviter: res.data.data.inviter,
              detail: res.data.data.detail,
              show: true
            })
          } else {
            this.setData({
              id: parameter.id,
              noTip: false,
              msg: res.data.data.msg,
              url: res.data.data.url,
              open_type: res.data.data.open_type,
              button: res.data.data.button,
              icon: res.data.data.icon,
              show: true
            })
          }

          wx.hideToast()
        }
      })
    }

    app.getUserAuth(isAuth => {
      if (isAuth) {
        wx.checkSession({
          success: res => {
            wx.getStorage({
              key: 'user_info',
              success: res => {
                this.setData({
                  userinfo: res.data
                })
                getDetail(res.data.user_id)
              },
              fail: res => {
                app.login(isLogin => {
                  if (isLogin) {
                    wx.getStorage({
                      key: 'user_info',
                      success: res => {
                        this.setData({
                          userinfo: res.data
                        })
                        getDetail(res.data.user_id)
                      },
                    })
                  }
                })
              }
            })
          },
          fail: res => {
            app.login(isLogin => {
              if (isLogin) {
                wx.getStorage({
                  key: 'user_info',
                  success: res => {
                    this.setData({
                      userinfo: res.data
                    })
                    getDetail(res.data.user_id)
                  },
                })
              }
            })
          }
        })
      }
    })
  }

})