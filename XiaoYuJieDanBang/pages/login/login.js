import WxValidate from '../../static/js/plugin/WxValidate'
const app = getApp();
Page({
  data: {
    validateMsg: false,
    submiting:false
  },
  onLoad: function () {
    this._initValidate();
  },
  formSubmit: function (e) {
    var that=this;
    const params = e.detail.value;
    
    //按钮禁用
    this.setData({
      submiting:true
    });

    //表单验证
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.setData({
        validateMsg: error.msg,
        submiting:false
      })
      return false
    } else {
      //验证通过进行后端请求
      wx.request({
        url: app.globalData.server +"login.php",
        data: params,
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (res) {
          // 成功返回{error:0,userInfo:{uid:10,avatar:"",nickname:"",}}
          that.setData({
            submiting: false
          })
          if(res.data.error){
            that.setData({
              validateMsg: res.data.msg
            })
          }else{
             //动态全局赋值
            app.globalData.xyUserInfo=res.data.XyUserInfo;
            //本地存储id
          
            wx.setStorage({
              key: "sessionJdbUserInfo",
              data: res.data.XyUserInfo
            });

            //跳转到相关页面
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }
         
        }
      });
    }
  },
  //账号输入框事件
  bindInputTap: function () {
    this.setData({
      validateMsg: false
    })
  },
  //初始化验证插件
  _initValidate() {
    const rules = {
      username: {
        required: true
      },
      password: {
        required: true
      }
    }

    const messages = {
      username: {
        required: "请输入账号"
      },
      password: {
        required: "请输入密码"
      }
    }

    this.WxValidate = new WxValidate(rules, messages);
  }
})