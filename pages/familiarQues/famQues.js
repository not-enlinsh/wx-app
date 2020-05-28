// pages/familiarQues/famQues.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions:[
      { ques: "如何在乐行万家小程序里购买年卡", ans:"在个人中心点击购买年卡-进入商品详情-点击购买-填写收货地址-购买成功-客服会第一时间为您", },
      { ques: "如何在乐行万家小程序里购买年卡", ans: "在个人中心点击购买年卡-进入商品详情-点击购买-填写收货地址-购买成功-客服会第一时间为您", },
      { ques: "如何在乐行万家小程序里购买年卡", ans: "在个人中心点击购买年卡-进入商品详情-点击购买-填写收货地址-购买成功-客服会第一时间为您", },
      { ques: "如何在乐行万家小程序里购买年卡", ans: "在个人中心点击购买年卡-进入商品详情-点击购买-填写收货地址-购买成功-客服会第一时间为您", },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    wx.request({
      url: host + 'xcx/Article/article_list/cid/2',
      data: '',
      method: 'POST',
      dataType: 'json',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data.data;
        console.log(data);
        
        that.setData({
          questions: data
        })
      }
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