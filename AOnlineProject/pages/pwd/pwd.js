// pages/pwd/pwd.js

import CryptoJS from "../../utils/aes.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  encrypt: function (str, key, iv) {
    //密钥16位
    //密钥16位
    var key = CryptoJS.enc.Utf8.parse(key);
    //加密向量16位
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(str, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    

  },
  formSubmit:function(e){
    var timestamp = new Date().getTime().toString() + "WZH";
    //加密密钥16位
    var encrypt_key = timestamp;
    //加密向量16位
    var iv = 'ZZWBKJ_ZHIHUAWEI';

    var encrypt_string = '{"password":"123456"}';
   
    var encrypted_string = this.encrypt(encrypt_string, encrypt_key, iv);
    console.dir(encrypted_string);


    wx.request({
      url: 'https://wnworld.com/api/JiaJiaDai/pwd.php',
      method: "POST",
      data: {
        "pwd": encrypted_string
      },
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})