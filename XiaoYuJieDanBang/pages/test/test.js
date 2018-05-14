// pages/test/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allPages:"",
    dataList:[],
    loadMoreData:"加载数据...",
    currentPage:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this._getData();
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
  
  },

  
  lower:function(){
    if (this.data.currentPage == this.data.allPages) {
      this.setData({
        loadMoreData: '已经到顶'
      });
      return;
    }else{
      this.setData({
        currentPage: this.data.currentPage+1
      })
    }
    
    this._getData();
  },
  _getData:function(){
    var that=this;
   
    wx.request({
      url:"https://wnworld.com/api/JieDanBang/lower.php",
      data: {
        page: that.data.currentPage
      },
      success: function (res) {
        console.dir(res);
        that.setData({
          allPages: res.data.total,
          dataList:that.data.dataList.concat(res.data.list)
        })
      }
    })
  }
})