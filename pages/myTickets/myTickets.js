// pages/myTickets/myTickets.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    id: "",
    stype:["待使用","已使用"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    wx.request({
      url: host + 'xcx/Virtual/vr_code_list',
      data: {  },
      method: 'POST',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data.data;

        console.log(data)
        that.setData({
          list: data
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