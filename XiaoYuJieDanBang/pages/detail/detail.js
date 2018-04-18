
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      step:"",
      customerInfo:"",
      orderInfo:"",
      decorateInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取页面传递过来的id,然后动过id获取订单详情
    console.dir(options);
    wx.request({
      url:app.globalData.server+"detail.php",
      data: options,
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        console.dir(res);
        that.setData({
          step:res.data.step,
          customerInfo:res.data.customerInfo,
          orderInfo:res.data.orderInfo,
          decorateInfo: res.data.decorateInfo
        })
      }
    })
   
  },

  makeCallPhone:function(){
    var that=this;
    wx.makePhoneCall({
      phoneNumber: that.data.customerInfo.phone //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})