const CONFIG = require('../../../config')
const app = getApp()

Page({

  data: {
    id: 0,
    detail: {},
    userinfo: {},
    inviter: {},
    recBiz: {},
    current: 0,
    noTip: true,
    msg:'',
    url: '',
    open_type: '',
    button:'',
    icon:'',
    show:false,
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
            var recBiz = wx.getStorageSync('receive_rec_biz')

            this.setData({
              id: parameter.id,
              inviter: res.data.data.inviter,
              detail: res.data.data.detail,
              recBiz: recBiz,
              current: recBiz.length > 0 ? 1 : 0,
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
                  userinfo:res.data
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
  },

  onUnload: function () {
    wx.removeStorageSync('receive_rec_biz')
  },

  addRecommend: function () {
    wx.setStorage({
      key: 'add_biz',
      data: this.data.recBiz,
      success: res => {
        wx.setStorage({
          key: 'recommend_mode',
          data: {
            mode: 'receive',
            id: this.data.id
          },
          success: res => {
            if (this.data.recBiz.length > 0) {
              wx.navigateTo({
                url: '../recommend/list',
              })
            } else {
              wx.navigateTo({
                url: '../recommend/add',
              })
            }
          }
        })
      }
    })
  },

  //提交表单
  submitForm: function () {
    var recBiz = wx.getStorageSync('receive_rec_biz')
    var formData = {}

    formData.biz_ids = []
    formData.id = this.data.detail.id
    formData.user_id = this.data.userinfo.user_id
    formData.callback = 'xhb.invite_create'

    for (let index in recBiz) {
      if (recBiz[index].id == 0) {
        var newshop = recBiz[index].lat + '|' + recBiz[index].lng + '|' + recBiz[index].name + '|' + recBiz[index].address + '|' + recBiz[index].county_id
        formData.biz_ids = formData.biz_ids.concat(newshop)
      }
      else {
        formData.biz_ids = formData.biz_ids.concat(recBiz[index].id)
      }
    }

    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: CONFIG.api,
      data: formData,
      success: res => {
        if (res.data.errCode == 0) {
          wx.redirectTo({
            url: '../receive/success?bdId=' + res.data.data.id,
          })
        }
        else {
          app.showMsg(res.data.errMessage)
        }
      }
    })
  }

})