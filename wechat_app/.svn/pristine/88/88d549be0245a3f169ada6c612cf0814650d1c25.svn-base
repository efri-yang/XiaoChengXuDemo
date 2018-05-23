const CONFIG = require('../../../config')
const app = getApp()
var userinfo = wx.getStorageSync('user_info')

Page({
  data: {
    bdId: 0,
    formData: {
      title: '',
      content: ''
    },
    cates: [],
    bizs: [],
    cover: '',
    type: 0,
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
        bd_id: parameter.bdId,
      },
      success: res => {
        this.setData({
          bdId: parameter.bdId,
          formData: {
            title: res.data.data.detail.title,
            content: res.data.data.detail.profile,
          },
          type: res.data.data.detail.type,
          bizs: res.data.data.detail.list === undefined ? null : res.data.data.detail.list,
          cover: res.data.data.detail.cover,
          cates: res.data.data.detail.cates,
        })

        wx.setStorageSync('create_cover', this.data.cover)
        wx.setStorageSync('create_cates', this.data.cates)

        var modeData = wx.getStorageSync('recommend_mode')
        if (modeData.id != this.data.bdId) {
          var create_rec_biz = []
          for (let index in this.data.bizs) {
            var obj = { id: this.data.bizs[index].id, name: this.data.bizs[index].name }
            create_rec_biz.push(obj)
          }
          this.setData({
            bizs: create_rec_biz
          })
        }
        else {
          wx.getStorage({
            key: 'create_rec_biz',
            success: res => {
              this.setData({
                bizs: res.data
              })
            }
          })
        }
      }
    })
  },

  onShow: function () {
    wx.getStorage({
      key: 'create_cates',
      success: res => {
        this.setData({
          cates: res.data
        })
      }
    })

    wx.getStorage({
      key: 'create_rec_biz',
      success: res => {
        this.setData({
          bizs: res.data
        })
      }
    })

    wx.getStorage({
      key: 'create_form_data',
      success: res => {
        this.setData({
          formData: res.data
        })
      }
    })

    wx.getStorage({
      key: 'create_cover',
      success: res => {
        this.setData({
          cover: res.data,
        })
      },
      fail: res => {
        this.setData({
          cover: this.data.cover,
        })
      }
    })
  },

  onHide: function () {
    wx.setStorageSync('create_form_data', this.data.formData)
  },

  onUnload: function () {
    wx.removeStorageSync('create_form_data')
    wx.removeStorageSync('create_cates')
    wx.removeStorageSync('create_cover')
    wx.removeStorageSync('create_rec_biz')
  },

  addRecommend: function () {
    wx.setStorage({
      key: 'add_biz',
      data: this.data.bizs,
      success: res => {
        wx.setStorage({
          key: 'recommend_mode',
          data: {
            mode: 'create',
            id: this.data.bdId
          },
          success: res => {
            wx.navigateTo({
              url: '../recommend/list',
            })
          }
        })
      }
    })
  },

  titleText: function (e) {
    this.setData({
      formData: {
        title: e.detail.value,
        content: this.data.formData.content,
      }
    })
  },

  contentText: function (e) {
    this.setData({
      formData: {
        title: this.data.formData.title,
        content: e.detail.value
      }
    })
  },

  formSubmit: function (e) {
    var formData = e.detail.value
    var cates = this.data.cates
    var recBiz = this.data.bizs

    formData.cate_ids = []
    formData.biz_ids = []
    formData.callback = 'xhb.edit_bd'
    formData.user_id = userinfo.user_id
    formData.bd_id = this.data.bdId
    formData.cover = this.data.cover

    for (let index in recBiz) {
      if (recBiz[index].id == 0) {
        var newshop = recBiz[index].lat + '|' + recBiz[index].lng + '|' + recBiz[index].name + '|' + recBiz[index].address + '|' + recBiz[index].county_id
        formData.biz_ids = formData.biz_ids.concat(newshop)
      }
      else {
        formData.biz_ids = formData.biz_ids.concat(recBiz[index].id)
      }
    }

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
              content: ''
            },
            cates: [],
            bizs: [],
            cover: CONFIG.defaultAddPic,
          })

          app.showMsg('保存成功', 'success')
          setTimeout(function () {
            wx.redirectTo({
              url: '../creation/creation',
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