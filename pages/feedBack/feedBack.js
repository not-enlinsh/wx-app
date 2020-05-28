// pages/feedBack/feedBack.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastArea:100, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // 计算剩余字数的函数
  getDataBindTap: function(e) {
    var information = e.detail.value;//输入的内容
    var value = e.detail.value.length;//输入内容的长度
    var lastArea = 100 - value;//剩余字数
    var that = this;
    that.setData({
      information: information,
      lastArea: lastArea
    })
  },


})