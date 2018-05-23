const CONFIG = require('../../../config')
const app = getApp()
var userinfo = wx.getStorageSync('user_info')

Page({
  data: {
    id: 0,
    showType: true,
    formData: {
      inviteeType: 1,
      name: '',
      identity: '',
      content: '',
      systemInfo: [],
    },
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
    
    wx.request({
      url: CONFIG.api,
      data: {
        callback: 'xhb.invitation_detail',
        id: parameter.id,
      },
      success: res => {
        this.setData({
          id: parameter.id,
          showType: (res.data.data.detail.user_id == userinfo.user_id && userinfo.group == 1 && res.data.data.detail.bd_type == 1) ? true : false,
          formData: wx.getStorageSync('invitee_data'),
        })
      }
    })
  },

  onUnload: function () {
    wx.setStorageSync('invitee_data', this.data.formData)
  },

  nameText: function (e) {
    this.setData({
      formData: {
        inviteeType: this.data.formData.inviteeType,
        name: e.detail.value,
        identity: this.data.formData.identity,
        content: this.data.formData.content,
      }
    })
  },

  identityText: function (e) {
    this.setData({
      formData: {
        inviteeType: this.data.formData.inviteeType,
        name: this.data.formData.name,
        identity: e.detail.value,
        content: this.data.formData.content,
      }
    })
  },

  contentText: function (e) {
    this.setData({
      formData: {
        inviteeType: this.data.formData.inviteeType,
        name: this.data.formData.name,
        identity: this.data.formData.identity,
        content: e.detail.value,
      }
    })
  },

  radioChange: function (e) {
    this.setData({
      formData: {
        inviteeType: e.detail.value,
        name: this.data.formData.name,
        identity: this.data.formData.identity,
        content: this.data.formData.content,
      }
    })
  },

  formSubmit: function (e) {
    var formData = e.detail.value

    formData.callback = 'xhb.add_invitee'
    formData.user_id = userinfo.user_id
    formData.id = this.data.id
    if (formData.inviteeType === undefined) {
      formData.inviteeType = 1
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
          this.setData({
            formData: {
              inviteeType: 1,
              name: '',
              identity: '',
              content: ''
            }
          })

          app.showMsg('保存成功', 'success')
          setTimeout(function () {
            wx.redirectTo({
              url: '../invite/preview?id=' + res.data.data.id
            })
          }, 1000)
        }
        else {
          app.showMsg(res.data.errMessage)
        }
      }
    })
  }

})