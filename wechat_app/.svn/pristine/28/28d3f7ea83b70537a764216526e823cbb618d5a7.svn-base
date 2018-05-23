const CONFIG = require('../../../config')
const app = getApp()

Page({
  data: {
    cate: null,
    checked: [],
    type: '',
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })

    this.setData({
      type: parameter.type
    })

    wx.request({
      url: CONFIG.api,
      data: {
        callback: 'xhb.category'
      },
      success: res => {
        var checked = []
        var cate = res.data.data
        wx.getStorage({
          key: this.data.type + '_cates',
          success: res => {
            for (let index in res.data) {
              checked = checked.concat(res.data[index].id)
            }
            this.setSort(cate, checked)
          },
          fail: this.setSort(cate, checked)
        })
      }
    })
  },

  checkboxChange: function (e) {
    this.setSort(this.data.cate, e.detail.value)
  },

  setSort: function (cate, value) {
    var checked = []

    if (value.length < 4) {
      for (var index in cate) {
        var sub = cate[index].sub

        for (var i in sub) {
          sub[i].checked = false
          sub[i].disabled = false

          for (var j in value) {
            if (sub[i].id == value[j]) {
              sub[i].checked = true;
              checked = checked.concat(sub[i])
            }
          }
        }
      }
    }

    if (value.length == 3) {
      for (var index in cate) {
        var sub = cate[index].sub

        for (var i in sub) {
          sub[i].disabled = true

          for (var j in value) {
            if (sub[i].id == value[j]) {
              sub[i].disabled = false;
            }
          }
        }
      }
    }

    this.setData({
      cate: cate,
      checked: checked
    })
  },

  resetsort: function () {
    var cate = this.data.cate

    for (var index in cate) {
      var sub = cate[index].sub

      for (var i in sub) {
        sub[i].checked = false
        sub[i].disabled = false
      }
    }

    this.setData({
      cate: cate,
      checked: []
    })
  },

  submitsort: function () {
    if (this.data.checked.length > 0) {
      wx.setStorage({
        key: this.data.type + '_cates',
        data: this.data.checked,
        success: wx.navigateBack()
      })
    }
    else {
      app.showMsg('请至少选择一个分类')
    }
  }

})