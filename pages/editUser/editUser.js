// pages/editUser/editUser.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:'',
    isim:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    wx.request({
      url: host + 'xcx/user/userinfo',
      data: '',
      dataType: 'json',
      method: 'GET',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data;
        console.log(data);
        if (data.head_pic.substring(0, 1) == "/"){
          data.head_pic = host+data.head_pic;
        }
        that.setData({
          info: data,
          tempFilePaths: data.head_pic
        })
      }
    })
  },

  upImg: function(){
    var that = this;
    wx.chooseImage({
      success(res) {
        
        that.setData({
          tempFilePaths : res.tempFilePaths,
          isim:1
        })
        console.log(res);
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success(res) {
        //     const data = res.data
        //     //do something
        //   }
        // })
      }
    })
  },
  formSubmit:function(e){
    //head_pic

    var that = this;
    var host = app.globalData.host;
    
    console.log(e.detail.value);
    var nickname = e.detail.value.nickname;
    if (that.data.isim == 1){
      wx.uploadFile({
        url: host + 'xcx/user/userinfo', //仅为示例，非真实的接口地址
        filePath: that.data.tempFilePaths[0],
        name: 'head_pic',
        formData: {
          'nickname': nickname,
          // 'mobile': '18865538848'
        },
        success(res) {
          const data = res.data
          console.log(res);
          //do something
        },
        fail(res) {
          console.log(res);

        }
      })
    }else{
      wx.request({
        url: host + 'xcx/user/userinfo',
        data: {
          'nickname': nickname,
          // 'mobile': '18865538848'
        },
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
            duration: 3000
          });
          that.onLoad();
          
        }
      })
    }
    
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

  }
})