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
    bdId: 0,
    cates: [],
    cover: '',
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
    
    wx.request({
      url: CONFIG.api,
      data: {
        callback: 'xhb.bd_detail',
        simple:1,
        bd_id: parameter.id,
      },
      success: res => {
        this.setData({
          bdId: parameter.id,
          formData: {
            title: res.data.data.detail.title,
            type: res.data.data.detail.type,
            content: res.data.data.detail.profile
          },
          cover: res.data.data.detail.cover,
          cates: res.data.data.detail.cates,
        })

        wx.setStorageSync('invite_cover', this.data.cover)
        wx.setStorageSync('invite_cates', this.data.cates)
      }
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
    wx.removeStorageSync('invite_form_data')
    wx.removeStorageSync('invite_cates')
    wx.removeStorageSync('invite_cover')
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
    var cates = this.data.cates

    formData.cate_ids = []
    formData.callback = 'xhb.edit_bd'
    formData.user_id = userinfo.user_id
    formData.bd_id = this.data.bdId
    formData.cover = this.data.cover
    formData.simple = 1

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

          app.showMsg('保存成功', 'success')
          setTimeout(function () {
            wx.redirectTo({
              url: '../invitation/invitation'
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