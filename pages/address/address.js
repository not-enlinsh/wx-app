// pages/address/address.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var host = app.globalData.host;

    wx.request({
      url: host + 'xcx/user/address_list',
      data: '',
      dataType: 'json',
      method: 'GET',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data;
        console.log(data);
      }
    })
  },

  formSubmit: function (e) {

    var that = this;
    var host = app.globalData.host;

    console.log(e.detail.value);
    var data = e.detail.value;

    if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(data.consignee))) {

      wx.showToast({

        title: '姓名有误',

        duration: 2000,

        icon: 'none'

      });

      return false;

    }

    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(data.id_card))) {

      wx.showToast({

        title: '身份证号码有误',

        duration: 2000,

        icon: 'none'

      });

      return false;

    }
    if (!(/^1[34578]\d{9}$/.test(data.mobile))) {

      wx.showToast({

        title: '手机号码有误',

        duration: 2000,

        icon: 'none'

      });

      return false;

    }

    wx.request({
      url: host + 'xcx/user/add_address',
      data: data,
      dataType: 'json',
      method: 'POST',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data;
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 3000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 3000);
          }
        });

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