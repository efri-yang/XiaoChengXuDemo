const CONFIG = require('../../../config')
const app = getApp()

Page({

  data: {
    detail: {},
    list: {},
    checked: [],
    userinfo: {},
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })

    app.showMsg('加载中', 'loading', 5000)

    wx.request({
      url: CONFIG.api,
      data: {
        callback: 'xhb.bd_detail',
        bd_id: parameter.bdId,
      },
      success: res => {
        this.setData({
          detail: res.data.data.detail,
          list: res.data.data.detail.list === undefined ? null : res.data.data.detail.list,
        })

        wx.hideToast()
      }
    })
  },

  onShow: function () {
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

  formSubmit: function (e) {
    if (this.data.checked.length > 0) {
      wx.request({
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: CONFIG.api,
        data: {
          callback: 'xhb.vote',
          user_id: this.data.userinfo.user_id,
          bd_id: this.data.detail.id,
          biz_ids: this.data.checked,
        },
        success: res => {
          if (res.data.errCode != 0) {
            app.showMsg(res.data.errMessage)
          }
          else {
            app.showMsg('打榜成功', 'success')
            setTimeout(() => {
              wx.redirectTo({
                url: '../listdet/listdet?bdId=' + this.data.detail.id
              })
            }, 500)
          }
        }
      })
    }
    else {
      app.showMsg('请至少选择一个好店')
    }
  },

  formReset: function () {
    var list = this.data.detail.list;
    for (var i in list) {
      list[i].checked = false;
    }
    this.setData({
      list: list
    })
  },

  checkboxChange: function (e) {
    var checked = []
    var list = this.data.detail.list
    var value = e.detail.value

    if (value.length < 4) {
      for (var i in list) {
        list[i].checked = false
        list[i].disabled = false
        for (var j in value) {
          if (list[i].id == value[j]) {
            list[i].checked = true;
            checked = checked.concat(value[j])
          }
        }
      }
    }

    if (value.length == 3) {
      for (var i in list) {
        list[i].disabled = true
        for (var j in value) {
          if (list[i].id == value[j]) {
            list[i].disabled = false;
          }
        }
      }
    }
    
    this.setData({
      list: list,
      checked: checked
    })
  }
  
})