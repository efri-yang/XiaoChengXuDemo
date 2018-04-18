
const app = getApp();


Page({
  data: {
    test:"",
    xyUserInfo:"",
    orderCount:"",
    orderNew:""
  },
  onLoad: function () {
    var that=this;
    if (!!app.globalData.xyUserInfo){
      this.setData({
        test:"ninininnonon",
        xyUserInfo: app.globalData.xyUserInfo
      })
    }

    wx.request({
      url:app.globalData.server+"/order1.php",
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success:function(res){
        that.setData({
          orderCount:res.data.orderCount,
          orderNew: res.data.orderNew
        })
      }
    })
    
  },
  //拨打电话
  makeCallPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '18559160494' //仅为示例，并非真实的电话号码
    })
  }




})