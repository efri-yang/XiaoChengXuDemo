const CONFIG = require('./config')

var statusBarHeight, system, version;
App({

  globalData: {
    category: {
      id: 0,
      name: '全部榜单'
    },
    scene: 1001,
    systemInfo: {
      statusBarHeight: 20,
      device: 0,
      version: 0,
    },
  },

  onLaunch() {
    wx.getSystemInfo({
      success: function (res) {
        version = res.version.replace(/\./g, "").slice(0, 2);
        statusBarHeight = res.statusBarHeight;
        system = res.system;
      }
    }),

      this.globalData.systemInfo.version = version;
    this.globalData.systemInfo.statusBarHeight = statusBarHeight;
    var bIsIos = system.match(/iOS/i) == "iOS";
    var bIsAndroid = system.match(/Android/i) == "Android";
    if (bIsIos) {
      this.globalData.systemInfo.device = 1
    }
    if (bIsAndroid) {
      this.globalData.systemInfo.device = 2
    }

    var QQMapWX = require('/utils/qqmap-wx-jssdk.min.js')
    var map = new QQMapWX({ key: CONFIG.mapKey })

    this.getLocation(function (loc) {
      map.reverseGeocoder({
        location: {
          latitude: loc.latitude,
          longitude: loc.longitude
        },
        success: function (loc) {
          wx.setStorageSync('location', {
            latitude: loc.result.location.lat,
            longitude: loc.result.location.lng,
            city: loc.result.ad_info.city,
            cityId: loc.result.ad_info.city_code.slice(3),
          })
        }
      })
    })
  },

  onShow: function (options) {
    this.globalData.scene = options.scene
  },

  getLocation: function (callback) {
    wx.authorize({
      scope: 'scope.userLocation',
      success: function () {
        wx.getLocation({
          type: 'gcj02',
          //altitude: true,
          success: res => {
            callback(res)
          }
        })
      },
      fail: function () {
        wx.showModal({
          title: '温馨提示',
          content: '您拒绝授权后将无法正常获取信息\n点击确定重新获取授权',
          success: res => {
            if (res.confirm) {
              wx.openSetting({
                success: res => {
                  if (res.authSetting['scope.userLocation']) {
                    wx.getLocation({
                      type: 'gcj02',
                      altitude: true,
                      success: res => {
                        callback(res)
                      }
                    })
                  }
                }
              })
            }
          },
          fail: callback({
            latitude: '24.479510',
            longitude: '118.089480'
          })
        })
      }
    })
  },

  login: function (callback) {
    wx.getStorage({
      key: 'session_id',
      success: res => {
        wx.request({
          url: CONFIG.api,
          data: {
            callback: 'xhb.logout',
            session_id: res.data
          },
          success: res => {
            wx.removeStorageSync('session_id');
            wx.removeStorageSync('user_info');
          }
        })
      },
      fail: function () {
        wx.login({
          success: res => {
            if (res.code) {
              wx.request({
                url: CONFIG.api,
                data: {
                  callback: 'xhb.login',
                  code: res.code,
                },
                success: res => {
                  if (res.data.data.session_id) {
                    wx.setStorageSync('session_id', res.data.data.session_id);

                    if (!res.data.data.user_info) {
                      wx.getUserInfo({
                        success: res => {
                          wx.request({
                            method: 'POST',
                            header: {
                              'content-type': 'application/x-www-form-urlencoded'
                            },
                            url: CONFIG.api,
                            data: {
                              callback: 'xhb.new_user',
                              session_id: wx.getStorageSync('session_id'),
                              encryptedData: res.encryptedData,
                              iv: res.iv,
                            },
                            success: res => {
                              wx.setStorage({
                                key: 'user_info',
                                data: res.data.data.user_info,
                                success: res => {
                                  callback(true)
                                }
                              })
                            }
                          })
                        },
                      })
                    } else {
                      wx.setStorageSync('user_info', res.data.data.user_info)
                      callback(true)
                    }
                  }
                },
                fail: function (err) {
                  callback(false)
                }
              })
            } else {
              callback(false)
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },

  getUserAuth: function (callback) {
    wx.authorize({
      scope: 'scope.userInfo',
      success: function () {
        callback(true)
      },
      fail: function () {
        wx.showModal({
          title: '温馨提示',
          content: '您拒绝授权后无法使用该功能\n点击确定重新获取授权',
          success: res => {
            if (res.confirm) {
              wx.openSetting()
            }
            else {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          }
        })
      }
    })
  },

  showMsg: function (msg, icon = 'none', duration = 1500) {
    wx.showToast({
      title: msg,
      icon: icon,
      duration: duration
    })
  },

})