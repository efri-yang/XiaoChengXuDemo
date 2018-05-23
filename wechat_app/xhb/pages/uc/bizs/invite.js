const CONFIG = require('../../../config')
const app = getApp()
var userinfo = wx.getStorageSync('user_info')

Page({

  data: {
    canvasHidden: true,
    imagePath: '',
    bizId: 0,
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })

    app.showMsg('加载中', 'loading', 5000)

    var self = this
    self.setData({
      bizId: parameter.id
    })

    wx.downloadFile({
      url: CONFIG.qrcode + 'ping_' + userinfo.user_id + '_' + parameter.id + '.png',
      success: res => {
        if (res.statusCode === 200) {

          self.setData({
            canvasHidden: false,
          })

          var avatar = wx.getStorageSync('avatar_temp_path')
          var qrcode = res.tempFilePath
          var bg = "../../../img/2.png"
          var nickName = userinfo.nickname
          var name = parameter.name
          var message = '       我只有10张邀请卡，所以邀请您和这城市的另外9名红人为我代言！'
          var context = wx.createCanvasContext('inviteCreate')

          context.drawImage(avatar, 89, 330, 20, 20)
          context.drawImage(qrcode, 147.5, 475, 80, 80)
          context.drawImage(bg, 0, 0, 375, 667)
          context.setFontSize(14)
          context.setFillStyle("#000")
          context.setTextAlign('left')
          context.fillText(nickName, 114, 350)
          context.setFontSize(13)
          context.setFillStyle("#fff")
          context.setTextAlign('center')
          context.fillText(name, 187.5, 285)
          context.setFontSize(14)
          context.setFillStyle("#000")
          context.setTextAlign('left')

          var lastSubStrIndex = 0;
          var dTextWidth = 0;
          var lineHeight = 20;
          var initX = 89;
          var initY = 380;

          for (var i = 0; i < message.length; i++) {
            dTextWidth += context.measureText(message[i]).width;
            if (dTextWidth > 285 - initX) {
              context.fillText(message.substring(lastSubStrIndex, i), initX, initY);
              initY += lineHeight;
              dTextWidth = 0;
              lastSubStrIndex = i;
            }

            if (i == message.length - 1) {
              context.fillText(message.substring(lastSubStrIndex, i + 1), initX, initY);
            }
          }

          context.draw(false, function (e) {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              canvasId: 'inviteCreate',
              success: function (res) {
                self.setData({
                  imagePath: res.tempFilePath,
                  canvasHidden: true
                })
                wx.hideToast()
              }, fail: (err) => {
                console.log(err)
              }
            })
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  saveImageToPhotosAlbum: function () {
    var self = this
    wx.saveImageToPhotosAlbum({
      filePath: self.data.imagePath,
      success: res => {
        app.showMsg('已保存至系统相册', 'success')
      },
      fail: res => {
        wx.showModal({
          title: '温馨提示',
          content: '您拒绝了授权,无法进行保存。点击确定重新获取授权。',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({})
            }
          }
        })
      }
    })
  },

  previewImg: function (e) {
    var img = this.data.imagePath
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },

  onShareAppMessage() {
    return {
      title: '我只有10张邀请卡，所以邀请您和这城市的另外9名红人为我代言！',
      path: 'pages/invitebiz/invitebiz?scene=' + encodeURIComponent('userId=' + userinfo.user_id + '&bizId=' + this.data.bizId),
    }
  }

})