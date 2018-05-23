const CONFIG = require('../../../config')
const app = getApp()

Page({

  data: {
    title: '',
    latitude: 0.0,
    longitude: 0.0,
    markers: null,
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })

    app.getLocation(loc => {
      wx.request({
        url: CONFIG.api,
        data: {
          callback: "xhb.biz_detail",
          biz_id: parameter.bizId,
        },
        success: res => {
          var lat = res.data.data.detail.lat == undefined ? res.data.data.detail.position.lat : res.data.data.detail.lat
          var lng = res.data.data.detail.lng == undefined ? res.data.data.detail.position.lng : res.data.data.detail.lng
          var address = res.data.data.detail.address == undefined ? res.data.data.detail.position.address : res.data.data.detail.address

          this.setData({
            title: res.data.data.detail.name,
            latitude: lat,
            longitude: lng,
            markers: [{
              latitude: lat,
              longitude: lng,
              callout: {
                content: address,
                color: "#fff",
                fontSize: "14",
                borderRadius: "5",
                bgColor: "#ea6771",
                padding: "5",
                display: "ALWAYS"
              }
            }]
          });

          wx.setNavigationBarTitle({
            title: res.data.data.detail.name,
          })
        }
      })
    })
  },

})