//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        wx.login({
            success: res => {
                wx.request({
                    url: this.globalData.server + "/login",
                    data: {
                        code: res.code
                    },
                    success: function(res) {
                      
                    }
                })
            }
        })
    },
    globalData: {
        userInfo: null,
        loginCode: null,
        encryptedData: null,
        iv: null,
        server: 'https://wnworld.com/api/xiaochengxu'
    }




})