const CONFIG = require('../../../config')
const app = getApp()
var userinfo = wx.getStorageSync('user_info')

Page({
  data: {
    id: 0,
    detail:{},
    formData: {
      inviteeType: 1,
      name: '',
      identity: '',
    },
    contentLength : 500,
    textareafocus:false,
    systemInfo: [],
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
          detail: res.data.data.detail,
          contentLength: 500 - res.data.data.detail.message.length
        })
      }
    })
  },

  onUnload: function () {
    wx.setStorageSync('invitee_data', this.data.formData)
  },

  focusStyle: function () {
    this.setData({
      textareafocus: true
    })
  },

  nameText: function (e) {
    this.setData({
      formData: {
        inviteeType: this.data.formData.inviteeType,
        name: e.detail.value,
        identity: this.data.formData.identity,
      }
    })
  },

  identityText: function (e) {
    this.setData({
      formData: {
        inviteeType: this.data.formData.inviteeType,
        name: this.data.formData.name,
        identity: e.detail.value,
      }
    })
  },

  contentText: function (e) {
    this.setData({
      formData: {
        inviteeType: this.data.formData.inviteeType,
        name: this.data.formData.name,
        identity: this.data.formData.identity,
      },
      contentLength: 500 - e.detail.value.length
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
          setTimeout(() => {
            wx.redirectTo({
              url: '../receive/preview?id=' + res.data.data.id
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