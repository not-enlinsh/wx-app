// pages/writeComment/writeComment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 4,//后端给的分数,显示相应的星星
    one_1: '',
    two_1: '',
    one_2: 0,
    two_2: 5,
    img:"",
    lastArea: 100, //计数器
    information:'',
    comment: "请点击星星打分",
    showModal: false,  //弹出层
    tempFilePaths:[],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var goods = options;
    var that = this;
    var host = app.globalData.host;
    var page = that.data.page
    that.setData({
      img : host + options.img,
      goods: goods
    })
    // wx.request({
    //   url: host + 'xcx/order/comment',
    //   data: options,
    //   method: 'POST',
    //   success(res) {
    //     if (!wx.$check(res.data)) {
    //       return;
    //     };
    //     var data = res.data.data;
    //     console.log(data);
    //   }
    // })
  },

  //情况二:用户给评分
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    });
    var comment;
    if (one_2 == "1") {
      comment = "体验太差了！！！"
    } else if (one_2 == "2") {
      comment = "体验一般！！"
    } else if (one_2 == "3") {
      comment = "还可以，没有很好！"
    } else if (one_2 == "4") {
      comment = "还不错，值得去！！！"
    } else if (one_2 == "5") {
      comment = "太赞了，强烈推荐！！！"
    }
    this.setData({
      comment: comment,
    })

    var infor = this.data.information;
    if(one_2 != "0"){
      if (infor == undefined){
        this.setData({
          saveBtn: false
        });
      }else if(infor != "1"){
        this.setData({
          saveBtn: true
        });
      }
    }
  },


  upimg:function(){
    var that = this;
    wx.chooseImage({
      count: 3 - that.data.tempFilePaths.length,
      success(res) {
        var tempFilePaths = that.data.tempFilePaths;
        var k;
        for (k in res.tempFilePaths){

          tempFilePaths.push(res.tempFilePaths[k]);
        }
        that.setData({
          tempFilePaths: tempFilePaths
        })

      }
    })
  },
  rmimg:function(e){
    var that = this;
    var key = e.currentTarget.dataset.key;

    var tempFilePaths = that.data.tempFilePaths;
    tempFilePaths.splice(key, 1);
    that.setData({
      tempFilePaths: tempFilePaths
    })
    console.log(tempFilePaths);
  },
  formSubmit: function (e) {
    //head_pic

    wx.showLoading({ title: '加载中…' })
    var that = this;
    var host = app.globalData.host;
    var star = that.data.one_2;
    var tempFilePaths = that.data.tempFilePaths;
    console.log(e.detail.value, star);
    if (that.data.one_2 == 0){
      wx.showToast({
        title: '请打分',
        icon: 'none',
        duration: 3000
      });
      return false;
    }
    console.log(that.data.information)
    if (that.data.information == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 3000
      });
      return false;
    }
    var flist = [];
    console.log("1231", tempFilePaths.length)
    if (tempFilePaths.length==0){
      wx.request({
        url: host + 'xcx/order/add_comment',
        data: {
          rec_id: that.data.goods.rec_id,
          goods_id: that.data.goods.goods_id,
          order_id: that.data.goods.order_id,
          img: flist,
          service_rank: 5,
          deliver_rank: 5,
          goods_rank: star,
          content: that.data.information
        },
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
        },
        fail(e){

        },
        complete(e){

          wx.hideLoading()
        }
      })
      return;
    }
    for (let k in tempFilePaths){
      wx.uploadFile({
        url: host +'xcx/Upload/upload', 
        filePath: tempFilePaths[k],
        name: 'file', 
        formData: {
          'path': 'comment'
        },
        success(res) {
          res.data = JSON.parse(res.data)
          if (!wx.$check(res.data)) {
            return;
          };
          // const data = res.data
          //do something
          console.log(1,res.data.data)
          flist.push(res.data.data);
          if (k == tempFilePaths.length-1){
            console.log(123, flist);
            wx.request({
              url: host + 'xcx/order/add_comment',
              data: {
                rec_id: that.data.goods.rec_id,
                goods_id: that.data.goods.goods_id,
                order_id: that.data.goods.order_id,
                img: flist,
                service_rank:5,
                deliver_rank:5,
                goods_rank: star,
                content: that.data.information
              },
              method: 'POST',
              success(res) {
                if (!wx.$check(res.data)) {
                  return;
                };
                var data = res.data;
                console.log(res);
                wx.showToast({
                  title: data.msg,
                  icon: 'none',
                  duration: 3000
                });
              },
              fail(e) {

              },
              complete(e) {

                wx.hideLoading()
              }
            })
          }
        },
        fail(res) {
          console.log(res);
          wx.showToast({
            title: '出现问题，请重试',
            icon: 'none',
            duration: 3000
          });
          wx.hideLoading()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //计数器
  getDataBindTap: function (e) {
    var information = e.detail.value;//输入的内容
    var value = e.detail.value.length;//输入内容的长度
    var lastArea = 100 - value;//剩余字数
    var that = this;
    that.setData({
      information: information,
      lastArea: lastArea
    });

    //触发使按钮变色
    var star = this.data.one_2;
    if(information != "" && star != "0"){
      this.setData({
        saveBtn:true
      });
    }else{
      this.setData({
        saveBtn: false
      });
    }
    console.log(star)
  },

  // 保存按钮
  btnclick:function(){
    var infor = this.data.information;
    if(infor.length < "10"){
      wx.showToast({
        title: '字数过少',
        duration:2000,
        mask:false
      })
    }else{
      this.setData({
        showModal:true
      })
    }
  }

})