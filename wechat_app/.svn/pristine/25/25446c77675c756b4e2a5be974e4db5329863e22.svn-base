const CONFIG = require('../../../config')
const app = getApp()
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js')
var map = new QQMapWX({ key: CONFIG.mapKey })
var ldtime, temporary

Page({
  data: {
    keyword: '',
    scshadow: true,
    focus: true,
    map_width: 380,
    map_height: 380,
    storelist: [],
    loading: true,
    scflag: false,
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      keyword: parameter.keyword,
      systemInfo: app.globalData.systemInfo
    })

    wx.setNavigationBarTitle({
      title: '地图'
    })

    this.setLocation(this.data.keyword)

    // 动态设置map的宽和高
    wx.getSystemInfo({
      success: res => {
        this.setData({
          map_width: res.windowWidth,
          map_height: res.windowHeight * 0.4,
          controls: [{
            id: 1,
            iconPath: '../../../img/ic_location.png',
            position: {
              left: res.windowWidth / 2 - 22,
              top: res.windowHeight * 0.4 / 2 - 40,
              width: 40,
              height: 40
            },
            clickable: true
          }]
        })
      }
    })

    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1000)
  },

  //获取中间点的经纬度，并mark出来
  getLngLat: function () {
    var self = this
    self.mapCtx = wx.createMapContext("map4select")
    self.mapCtx.getCenterLocation({
      success: res => {
        map.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            map.getSuggestion({
              keyword: res.result.address,
              success: res => {
                var storelist = res.data
                if (self.data.storelist == '') {
                  self.clearsetloading();
                  self.setloading();
                  for (var i = 0; i < storelist.length; i++) {
                    if (i == 0) {
                      storelist[i].check = true
                      app.globalData.store_location = {
                        latitude: storelist[i].location.lat,
                        longitude: storelist[i].location.lng
                      }
                    } else {
                      storelist[i].check = false
                    }
                  };
                  self.setData({
                    storelist: storelist,
                    latitude: storelist[0].location.lat,
                    longitude: storelist[0].location.lng,
                  })
                } else {
                  if (res.count > 0) {
                    if (storelist[0].id !== self.data.storelist[0].id) {
                      if (that.data.scflag) {
                        temporary = storelist[0].id;
                        self.setData({
                          scflag: false
                        })
                      } else if (temporary !== storelist[0].id) {
                        self.clearsetloading();
                        self.setloading();
                        for (var i = 0; i < storelist.length; i++) {
                          if (i == 0) {
                            storelist[i].check = true
                          } else {
                            storelist[i].check = false
                          }
                        };
                        that.setData({
                          storelist: storelist
                        })
                      }
                    }
                  }
                }
              }
            })
          }
        })
      }
    })
  },

  // 定时显示数据
  setloading() {
    ldtime = setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1000)
  },

  // 清除定时
  clearsetloading() {
    this.setData({
      loading: true
    })
    clearTimeout(ldtime)
  },

  regionchange(e) {
    if (!this.data.loading) {
      if (e.type == 'end') {
        this.getLngLat()
      }
    }
  },

  //点击列表选择
  choiceadd(e) {
    var storelist = this.data.storelist
    var name, clatitude, clongitude, address, county_id
    var storage = wx.getStorageSync('add_biz')

    for (var i = 0; i < storelist.length; i++) {
      if (storelist[i].id == e.currentTarget.dataset.id) {
        storelist[i].check = true
        clatitude = storelist[i].location.lat
        clongitude = storelist[i].location.lng
        name = storelist[i].title
        address = storelist[i].address
        county_id = storelist[i].adcode
      } else {
        storelist[i].check = false
      }
    }

    var newBiz = {
      id: 0,
      storelist: storelist,
      name: name,
      lat: clatitude,
      lng: clongitude,
      address: address,
      county_id: county_id
    }

    for (let index in storage) {
      if (storage[index].name == newBiz.name) {
        wx.redirectTo({
          url: '../recommend/list'
        })
        return
      }
    }

    wx.setStorage({
      key: 'add_biz',
      data: storage.length > 0 ? storage.concat(newBiz) : [newBiz],
      success: res => {
        wx.redirectTo({
          url: '../recommend/list'
        })
      }
    })
  },

  //点击聚焦
  scfocus: function () {
    this.setData({
      scshadow: true,
      focus: true
    })
  },

  //点击聚焦
  scblur: function (e) {
    if (e.detail.value == '') {
      this.setData({
        scshadow: false
      })
    }
  },

  scsbm: function (e) {
    this.setLocation(e.detail.value)
  },

  setLocation: function (keyword) {
    var self = this
    var storageLocation = wx.getStorageSync('location')

    app.getLocation(function (location) {
      location.city = storageLocation.city

      map.getSuggestion({
        keyword: keyword,
        region: location.city,
        region_fix: 0,
        location: {
          latitude: location.latitude,
          longitude: location.longitude
        },
        success: res => {
          if (res.count == 0) {
            self.setData({
              latitude: location.latitude,
              longitude: location.longitude
            })
          } else {
            var storelist = res.data
            for (let i in storelist) {
              storelist[i].check = !i ? true : false
            }
            self.setData({
              storelist: storelist,
              latitude: storelist[0].location.lat,
              longitude: storelist[0].location.lng,
            })
          }
        },
        fail: res => {
          self.setData({
            latitude: location.latitude,
            longitude: location.longitude
          })
        }
      })
    })
  }

})
