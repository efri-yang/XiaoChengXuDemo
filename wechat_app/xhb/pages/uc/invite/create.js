const CONFIG = require('../../../config')
const app = getApp()
var userinfo = wx.getStorageSync('user_info')

Page({

  data: {
    formData: {
      title: '',
      type: 1,
      content: ''
    },
    cates: [],
    cover: '',
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
  },
  
  onShow: function () {
    wx.getStorage({
      key: 'invite_cates',
      success: res => {
        this.setData({
          cates: res.data
        })
      }
    })

    wx.getStorage({
      key: 'invite_form_data',
      success: res => {
        this.setData({
          formData: res.data
        })
      }
    })

    wx.getStorage({
      key: 'invite_cover',
      success: res => {
        this.setData({
          cover: res.data,
        })
      },
      fail: res => {
        this.setData({
          cover: CONFIG.defaultAddPic,
        })
      }
    })
  },

  onHide: function () {
    wx.setStorageSync('invite_form_data', this.data.formData)
  },

  onUnload: function () {
    wx.setStorageSync('invite_form_data', this.data.formData)
  },

  titleText: function (e) {
    this.setData({
      formData: {
        type: this.data.formData.type,
        title: e.detail.value,
        content: this.data.formData.content,
      }
    })
  },

  contentText: function (e) {
    this.setData({
      formData: {
        type: this.data.formData.type,
        title: this.data.formData.title,
        content: e.detail.value,
      }
    })
  },

  radioChange: function (e) {
    this.setData({
      formData: {
        type: e.detail.value,
        title: this.data.formData.title,
        content: this.data.formData.content,
      }
    })
  },

  formSubmit: function (e) {
    var formData = e.detail.value
    var cates = wx.getStorageSync('invite_cates')

    formData.cate_ids = []
    formData.callback = 'xhb.invite_bd'
    formData.user_id = userinfo.user_id
    formData.cover = wx.getStorageSync('invite_cover')

    for (let index in cates) {
      formData.cate_ids = formData.cate_ids.concat(cates[index].id)
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
              title: '',
              type: 1,
              content: ''
            },
            cates: [],
            cover: CONFIG.defaultAddPic,
          })
          
          wx.removeStorageSync('invite_cates')
          wx.removeStorageSync('invite_cover')

          app.showMsg('保存成功', 'success')
          setTimeout(function () {
            wx.redirectTo({
              url: '../invite/addInvitee?id=' + res.data.data.id
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