const CONFIG = require('../../../config')
const app = getApp()

Page({
  data: {
    recBiz: null,
    systemInfo: [],
    bdId: 0,
  },

  onLoad: function (parameter) {
    this.setData({
      bdId: parameter.bdId !== undefined ? parameter.bdId : 0,
      systemInfo: app.globalData.systemInfo
    })

    if (parameter.bdId > 0) {
      wx.request({
        url: CONFIG.api,
        data: {
          callback: 'xhb.bd_detail',
          bd_id: parameter.bdId,
        },
        success: res => {
          this.setData({
            user_id: res.data.data.detail.user_id, 
            recBiz: res.data.data.detail.list === undefined ? [] : res.data.data.detail.list,
          })
          wx.setStorageSync('add_biz', this.data.recBiz)
          wx.setStorageSync('edit_bd', {
            bdId: this.data.bdId,
            user_id: this.data.user_id, 
          })
        }
      })
    }
  },

  onShow: function () {
    wx.getStorage({
      key: 'add_biz',
      success: res => {
        if (res.data != undefined) {
          this.setData({
            recBiz: res.data
          })
        }
      }
    })

    wx.getStorage({
      key: 'edit_bd',
      success: res => {
        if (res.data != undefined) {
          this.setData({
            bdId: res.data.bdId,
            user_id: res.data.user_id,
          })
        }
      }
    })
  },

  onUnload: function () {
    wx.removeStorageSync('add_biz')
    wx.removeStorageSync('edit_biz')
  },

  //下移商家
  downwardSt: function (e) {
    var index = e.currentTarget.dataset.index;
    var recBiz = this.data.recBiz;

    if (index < recBiz.length - 1) {
      var temp = recBiz[index];
      recBiz[index] = recBiz[index + 1];
      recBiz[index + 1] = temp;
      this.setData({
        recBiz: recBiz
      })
    }

    wx.setStorage({
      key: "add_biz",
      data: this.data.recBiz
    })
  },

  //上移商家
  upwardSt: function (e) {
    var index = e.currentTarget.dataset.index;
    var recBiz = this.data.recBiz;

    if (index > 0) {
      var temp = recBiz[index];
      recBiz[index] = recBiz[index - 1];
      recBiz[index - 1] = temp;
      this.setData({
        recBiz: recBiz
      })
    }

    wx.setStorage({
      key: "add_biz",
      data: this.data.recBiz
    })
  },

  //删除商家
  deleteSt: function (e) {
    var index = e.currentTarget.dataset.index;
    var recBiz = this.data.recBiz;

    recBiz.splice(index, 1);
    this.setData({
      recBiz: recBiz
    })

    wx.setStorage({
      key: "add_biz",
      data: this.data.recBiz
    })
  },

  finish: function () {
    if (this.data.bdId > 0) {
      var recBiz = this.data.recBiz
      var formData = {}

      formData.biz_ids = []
      formData.callback = 'xhb.edit_bd_biz'
      formData.user_id = this.data.user_id
      formData.bd_id = this.data.bdId

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
            wx.removeStorageSync('edit_bd')

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
    else {
      var modeData = wx.getStorageSync('recommend_mode')
      if (modeData.mode != 'receive') {
        var key = 'create_rec_biz'
        var url = modeData.id > 0 ? '../create/edit?bdId=' + modeData.id : '../create/create'
      }
      else {
        var key = 'receive_rec_biz'
        var url = '../receive/creator?id=' + modeData.id
      }

      wx.setStorage({
        key: key,
        data: this.data.recBiz !== undefined ? this.data.recBiz : [],
        success: res => {
          wx.redirectTo({
            url: url
          })
        }
      })
    }
  }

})