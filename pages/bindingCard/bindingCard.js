// pages/bindingCard/bindingCard.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false
  },

  // 外面的弹窗
  bindingCard: function () {
    this.setData({
      showModal: true,
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function () {
  },

  // 弹出层里面的弹窗
  ok: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  formSubmit: function (e) {
    //head_pic

    var that = this;
    var host = app.globalData.host;

    console.log(e.detail.value);
    var codehead = e.detail.value.codeend;
    var codeend = e.detail.value.codeend;
    if (codehead.length!=4){
      wx.showToast({
        title: '前4位请输入4位数字',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (codeend.length != 4) {
      wx.showToast({
        title: '后4位请输入4位数字',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: host + 'xcx/user/nianka',
      data: e.detail.value,
      dataType: 'json',
      method: 'POST',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data;
        
        if (data.code==0){
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 3000
          });
        }else{
          that.setData({
            showModal: true,
          })
        }

      }
    })
  },
  tohis:function(){
    wx.navigateBack({
      delta:1
    })
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

  }
})