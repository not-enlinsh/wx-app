// pages/yuyue/yuyue.js
var util = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    date1: "",
    date2: "",
    date3: '',
    date4: '',
    sdate:'',
    xtype:'',
    utype: "7",
    putype: "6",
    d1:0,
    zuser:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var id = options.id || 1;
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
        if (data.nk_vip == 1){

          that.setData({
            utype:7
          })
        }else{
          that.setData({
            utype: 6
          })
        }
      }
    })



    var date = that.getDateStr(null, 0); 
    var date1 = that.getDateStr(null, 1);
    var date2 = that.getDateStr(null, 2);
    var date3 = that.getDateStr(null, 3);
    var date4 = that.getDateStr(null, 3);
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      date: date,
      date1: date1,
      date2: date2,
      date3: date3,
      date4: date4,
    });
    wx.request({
      url: host + 'xcx/index/goods_info/',
      data: { id: id },
      method: 'POST',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data;
        if (data.filter_spec["用户票类型"] == undefined) {
          data.filter_spec["用户票类型"] = ['']
        }
        console.log(data.goods_images_list);
        that.setData({
          list: data,
          d1: 7,
          xtype: data.filter_spec["票类型"][0].item_id
        })
      }
    })

  },

  getDateStr: function (today, addDayCount) {
    var date;
    if (today) {
      date = new Date(today);
    } else {
      date = new Date();
    }
    date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期 
    var y = date.getFullYear();
    var m = date.getMonth() + 1;//获取当前月份的日期 
    var d = date.getDate();
    if (m < 10) {
      m = '0' + m;
    };
    if (d < 10) {
      d = '0' + d;
    };
    // console.log(y + "-" + m + "-" + d)
    return y + "-" + m + "-" + d;
  },
  rphone:function(e){
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },
  ridcode: function (e) {
    var that = this;
    that.setData({
      idcode: e.detail.value
    })
  },
  bindDateChange:function(e){
    this.setData({
      date3: e.detail.value,
      sdate: e.detail.value
    })
  },
  cgdata:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.date);
    that.setData({
      sdate: e.currentTarget.dataset.date
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  checkboxChange:function(e){
    var that = this;
    that.setData({
      zuser: e.detail.value
    })
  },
  xztype:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.id);
    that.setData({
      xtype: e.currentTarget.dataset.id
    })
  },
  zhifu:function(){
    var that = this;
    var date = new Date();
    var host = app.globalData.host;
    var sdate = that.data.sdate;
    var phone = that.data.phone;
    var idcode = that.data.idcode;
    var zuser = that.data.zuser;
    console.log(123,sdate);
    if (sdate == ''){
      wx.showToast({
        title: '请选择时间',
        icon: 'none',
        duration: 3000
      });
      return false;
    }
    if (zuser.length == 0) {
      wx.showToast({
        title: '请选择购票人',
        icon: 'none',
        duration: 3000
      });
      return false;
    }


    wx.request({
      url: host + 'xcx/Virtual/add_order',
      data: {
        yy_num: 1,
        goods_num: zuser.length,
        yy_date: sdate,
        address_id: zuser,
        goods_id: that.data.list.goods_id,
        goods_spec_key: that.data.xtype + '_' + that.data.utype
      },
      method: 'POST',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        //JSON.parse()
        var data = res.data.data;
        console.log(data)
        that.setData({
          ddrlist: data
        })
        // return false;
        if (res.data.code == 1){
          wx.request({
            url: host + 'xcx/Payment/get_code/',
            data: { id: that.data.ddrlist.order_id },
            method: 'POST',
            success(res) {
              if (!wx.$check(res.data)) {
                return;
              };
              var data = JSON.parse(res.data.result);
              console.log(data)
              wx.requestPayment(
                {
                  'timeStamp': data.timeStamp,
                  'nonceStr': data.nonceStr,
                  'package': data.package,
                  'signType': data.signType,
                  'paySign': data.paySign,
                  'success': function (res) {
                    console.log('success', res);
                    if (res.errMsg == "requestPayment:ok") {
                      wx.showToast({
                        title: "支付完成",
                        icon: 'none',
                        duration: 3000
                      });
                    }
                  },
                  'fail': function (res) {
                    console.log('fail', res);
                    if (res.errMsg == "requestPayment:fail cancel"){
                      console.log(123);
                      wx.showToast({
                        title: "您没有支付成功",
                        icon: 'none',
                        duration: 3000
                      });
                    }
                  },
                  'complete': function (res) {

                    console.log('complete', res);
                  }
                })
            }
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          });
        }
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var that = this;

    var host = app.globalData.host;

    // 人物信息
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
        console.log("人物信息", data);
        that.setData({
          user:data
        })
      }
    })
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