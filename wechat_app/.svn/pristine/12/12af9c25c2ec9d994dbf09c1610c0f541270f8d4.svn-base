const CONFIG = require('../../../config')
const app = getApp()
var userinfo = wx.getStorageSync('user_info')

Page({
  data: {
    formData: {
      title: '',
      content: ''
    },
    cates: [],
    bizs: [],
    cover: '',
    systemInfo: [],
  },

  onLoad: function () {
    this.setData({
      systemInfo: app.globalData.systemInfo
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
          cover: CONFIG.defaultAddPic,
        })
      }
    })
  },

  onHide: function () {
    wx.setStorageSync('create_form_data', this.data.formData)
  },

  onUnload: function () {
    wx.setStorageSync('create_form_data', this.data.formData)
  },

  titleText: function (e) {
    this.setData({
      formData: {
        title: e.detail.value,
        content: this.data.formData.content,
      }
    })
  },

  //介绍字数提示
  contentText: function (e) {
    this.setData({
      formData: {
        title: this.data.formData.title,
        content: e.detail.value
      }
    })
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
            id: 0
          },
          success: res => {
            if (this.data.bizs.length > 0){
              wx.navigateTo({
                url: '../recommend/list',
              })
            }else{
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
  formSubmit: function (e) {
    var formData = e.detail.value
    var recBiz = wx.getStorageSync('create_rec_biz')
    var cates = wx.getStorageSync('create_cates')
    
    formData.cate_ids = []
    formData.biz_ids = []
    formData.callback = 'xhb.create_bd'
    formData.user_id = userinfo.user_id
    formData.cover = wx.getStorageSync('create_cover')

    for (let index in cates) {
      formData.cate_ids = formData.cate_ids.concat(cates[index].id)
    }

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
          this.setData({
            formData: {
              title: '',
              content: ''
            },
            cates: [],
            bizs: [],
            cover: CONFIG.defaultAddPic,
          })

          wx.removeStorageSync('create_cates')
          wx.removeStorageSync('create_cover')
          wx.removeStorageSync('create_rec_biz')

          app.showMsg('创建成功', 'success')
          setTimeout(function () {
            wx.switchTab({
              url: '../../mine/mine'
            })
          }, 500)
        }
        else {
          app.showMsg(res.data.errMessage)
        }
      }
    })
  },

})