// pages/productDetails/productDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    list:[],
    star:5,
    host: app.globalData.host,
    currentIndex:0,
    d1:0,
    pinglun:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id||1;
    var that = this;
    var host = app.globalData.host;
    wx.request({
      url: host + 'xcx/index/goods_info/',
      data: { id: id},
      method: 'POST',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data;
        var conte = data.goods_content.replace(/\<img src=\"\//gi, '<img style="width:100%;" src="' + host + "/");
        data.tips = data.tips.replace(/\r\n/gi, '<br>');
        if (data.filter_spec["用户票类型"]==undefined){
          data.filter_spec["用户票类型"] = ['']
        }
        var kk;
        for (kk in data.goods_images_list){
          data.goods_images_list[kk] = host+data.goods_images_list[kk].image_url
        }
        
        that.setData({
          list: data,
          banner: data.goods_images_list,
          content: conte,
          d1: data.filter_spec["用户票类型"][0].item_id,
          star: parseInt(data.commentStatistics.star),
          collect: data.collect
        })
        wx.request({
          url: host + 'xcx/index/goods_list/cid/' + data.cat_id,
          data: '',
          method: 'POST',
          dataType: 'json',
          success(res) {
            if (!wx.$check(res.data)) {
              return;
            };
            var data = res.data.data.data;
            console.log(2, data);
            that.setData({
              list1: data
            })
          }
        })
      }
    })
    wx.request({
      url: host + 'xcx/index/get_comment/',
      data: { id: id},
      method: 'POST',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data.data;
        console.log(data);
        for (let k in data) {
          for (let i in data[k].img) {
            data[k].img[i] = host + data[k].img[i]
          }
          data[k].head_pic = data[k].head_pic.replace(/\/public\//gi, host + "/public/");
        }
        that.setData({
          pinglun: data[0],
          star1: data[0].goods_rank
        })
      }
    })
    
  },
  titleClick: function (e) {
      this.setData({
        //拿到当前索引并动态改变
        d1: e.currentTarget.dataset.idx
      })
  },
  toyuyue:function(){
    var that = this;
    wx.navigateTo({
      url: '/pages/yuyue/yuyue?id=' + that.data.list.goods_id
    })
  },
  toCollect:function(){
    var that = this;
    var host = app.globalData.host;
    var collect = that.data.collect;
    var id = that.data.list.goods_id;
    if (collect == 0){
      
      wx.request({
        url: host + 'xcx/goods/collect_goods',
        data: { id: id },
        method: 'POST',
        success(res) {
          if (!wx.$check(res.data)) {
            return;
          };
          var data = res.data;
          console.log(data)
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 3000
          });
          that.setData({
            collect:1
          })
        }
      })

    }else{
      // wx.showToast({
      //   title: "已经收藏过啦！",
      //   icon: 'none',
      //   duration: 3000
      // });
      wx.request({
        url: host + 'xcx/goods/cancel_collect',
        data: { id: id },
        method: 'POST',
        success(res) {
          if (!wx.$check(res.data)) {
            return;
          };
          var data = res.data;
          console.log(data)
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 3000
          });
          var list = that.data.list;
          list.collect = 0;
          that.setData({
            collect: 0
          })
        }
      })
    }
    console.log(collect);
  },
  tofenxiang:function(){
    wx.showToast({
      title: "请点击右上角三点分享",
      icon: 'none',
      duration: 3000
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getLocation: function () {
    var that = this;
    var list = that.data.list;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: Number(list.lat),//要去的纬度-地址
          longitude: Number(list.lng),//要去的经度-地址
          name: list.goods_name,
          address: list.goods_name
        })
      }
    })
  },
  yulan1:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.previewImage({
      current: that.data.banner[id], // 当前显示图片的http链接
      urls: that.data.banner // 需要预览的图片http链接列表
    })
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