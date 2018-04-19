
const app = getApp();
var order = ['orderall', 'orderxdd', 'orderylf', 'orderysj', 'orderyqy','orderysx']

Page({
    data:{
      toView:"",
      dataList:""
    },
    
    onLoad:function(options){
        this.setData({
          toView:options.toView
        })
    },
    navTap:function(event){
      console.dir(event);
      var that=this;
      this.setData({
        toView: event.currentTarget.id
      });
      //服务端请求数据(发送用户id和订单的类型)
      wx.request({
        url: app.globalData.server + "/order1.php",
        data: {"uid": app.globalData.sessionJdbId, "orderid": that.data.toView},
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (res) {
          console.dir(res.data);
          that.setData({
            dataList: res.data.list
          })
        }
      })
    }
           
               


               
    
   
    

})