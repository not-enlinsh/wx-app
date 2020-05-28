// pages/yearJqList/yearJqList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex2: 0,
    list1: [],
    list2: [],
    host: app.globalData.host

  },
  titleClick2: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex2: e.currentTarget.dataset.idx
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var host = app.globalData.host;

    wx.request({
      url: host + 'xcx/index/goods_list',
      data: '',
      method: 'POST',
      dataType: 'json',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data.data;
        // console.log(2, data);
        that.setData({
          list1: data
        })
      }
    })
    var wz = wx.getStorageSync('wz') || []
    wx.request({
      url: host + 'xcx/index/goods_list',
      data: { lat: wz.latitude, lng: wz.longitude },
      method: 'POST',
      dataType: 'json',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data.data;
        // console.log(2, data);
        that.setData({
          list2: data
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