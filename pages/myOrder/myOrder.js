// pages/myOrder/myOrder.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    currentTabIndex:0,
    host: app.globalData.host,
    page: 1
  },
  //tab选项函数
  onTabItemTap:function(e){
    this.setData({
      //拿到当前索引并动态改变
      currentTabIndex:e.target.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({ title: '加载中…' })
    var that = this;
    var host = app.globalData.host;
    var page = that.data.page;
    var list = that.data.list;
    wx.request({
      url: host + 'xcx/order/order_list',
      data: { page: page},
      method: 'POST',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data.data;

        console.log(data[0])
        if(page == 1){
          that.setData({
            list: data
          })
        }else{
          list = list.concat(data)
          that.setData({
            list: list
          })
        }
      },
      complete(){
        wx.hideLoading();
      }
    })
  },
  toUrl:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/reserveDetail/reserveDetail?id=' + id,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
        someEvent: function (data) {
          console.log(data)
        }

      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
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
    var that = this;
    that.setData({
      page: 1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var page = that.data.page+1
    that.setData({
      page: page
    })
    that.onLoad();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})