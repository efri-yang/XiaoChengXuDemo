import WeCropper from '../../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
const CONFIG = require('../../config')
const app = getApp()

Page({

  data: {
    type: '',
    canvasshow: true,
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      // scale: 1,
      // zoom: 5,
      cut: {
        x: (width - 335) / 2,
        y: (height - 124) / 2,
        width: 335,
        height: 124
      }
    },
    systemInfo: [],
  },

  onLoad: function (parameter) {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })

    this.setData({
      type: parameter.type,
    })

    const { cropperOpt } = this.data

    new WeCropper(cropperOpt).updateCanvas()

    wx.chooseImage({
      count: 1,
      success: res => {
        const src = res.tempFilePaths[0]
        this.wecropper.pushOrign(src);
        this.setData({
          canvasshow: false
        })
      },
      fail: res => {
        wx.navigateBack()
      }
    })
  },

  touchStart(e) {
    this.wecropper.touchStart(e)
  },

  touchMove(e) {
    this.wecropper.touchMove(e)
  },

  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },

  getCropperImage() {
    this.wecropper.getCropperImage((src) => {
      if (src) {
        app.showMsg('上传中', 'loading', 10000)

        wx.uploadFile({
          url: CONFIG.api,
          filePath: src,
          name: 'cover',
          formData: {
            callback: 'xhb.upload'
          },
          success: res => {
            this.setData({
              uploadshow: false
            })

            wx.setStorageSync(this.data.type + '_cover', JSON.parse(res.data))

            wx.hideToast()
            app.showMsg('上传成功', 'success')

            setTimeout(function () {
              wx.navigateBack()
            }, 500)
          }
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  }

})