
const app = getApp();


Page({
//   onShareAppMessage: function (res) {
//     return {
//       title: '你喜欢的才是好店',
//       path: '/pages/index/index',
//       imageUrl: "http://hdi.xiaoyu.com/images/wechatapp/common/common_haodian_share.jpg",
//       success: function (res) {
//         wx.showToast({
//           title: '转发成功！',
//           icon: 'success',
//           duration: 2000
//         })
//       },
//       fail: function (res) {
//         // 转发失败
//       }
//     }
//   },
//   data: {
//     isTblHeadFixed: false,
//     isNavAllShow: false,
//     isLoadingShow: true,
//     dataNav: "",
//     dataRank: "",
//     currentIndex: 0
//   },
//   onLoad: function (options) {
//     var that = this;
//     wx.request({
//       url: "https://m3.xiaoyu.com/welcome/wechatapp?callback=haodian.cates",
//       data: {},
//       method: 'GET',
//       header: {
//         'content-type': 'application/json' // 默认值
//       },
//       success: function (res) {
//         that.setData({
//           dataNav: res.data
//         });
//         that.ajaxGetRankList(that.data.dataNav.data.list[0]);
//       }
//     })
//   },


//  ajaxGetRankList: function (id) {
//     var that=this;
//     wx.request({
//       url: "https://m3.xiaoyu.com/welcome/wechatapp?callback=haodian.top50&cate=" + id,
//       method: 'GET',
//       header: {
//         'content-type': 'application/json' // 默认值
//       },
//       success: function (res) {
//         that.setData({
//           dataRank:res.data,
//           isLoadingShow:false
//         });
//       },
//       fail: function (res) {
       
//       }
//     })
//   },

//   navTap: function (e) {
//     var that = this;
//     var id = e.currentTarget.id;
//     //设置currentIndex
//     this.data.dataNav.data.list.forEach(function (v, k) {
//       if (id == v) {
//         that.setData({
//           currentIndex: k
//         });
//         return;
//       }
//     });
//     this.setData({
//       isNavAllShow: false,
//       isLoadingShow:true
//     })
//     //请求获取数据
//     this.ajaxGetRankList(id);

//   },
//   navMask:function(){
//     this.setData({
//       isNavAllShow: false
//     });
//   },

//   onPageScroll: function (res) {
//     if (res.scrollTop > 80) {
//       this.setData({
//         isTblHeadFixed: true
//       })
//     } else {
//       this.setData({
//         isTblHeadFixed: false
//       })
//     }
//   },
//   navMore: function () {
//     this.setData({
//       isNavAllShow: !this.data.isNavAllShow
//     })
//   }


})