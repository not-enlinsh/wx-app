// pages/myFavorite/myFavorite.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    currentTabIndex: 0,
    host : app.globalData.host,
    list:[]
  },
  //tab选项函数
  onTabItemTap: function (e) {
    this.setData({
      //拿到当前索引并动态改变
      currentTabIndex: e.target.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options;
    var that = this;
    var host = app.globalData.host;
    wx.request({
      url: host + 'xcx/User/collect_list',
      data: '',
      method: 'POST',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data.data;
        
        that.setData({
          list : data
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