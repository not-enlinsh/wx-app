// pages/myComment/myComment.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    currentTabIndex: 0,
    host: app.globalData.host,
    page:1
  },
  //tab选项函数
  onTabItemTap: function (e) {
    var that = this;
    that.setData({
      //拿到当前索引并动态改变
      currentTabIndex: e.target.dataset.index,
      page: 1
    })
    that.onLoad();
  },

  selectTap() { // 点击下拉显示框
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中…' })

    var that = this;
    var id = that.data.id ? that.data.id : options.id;
    var host = app.globalData.host;
    var page = that.data.page;
    var list = that.data.list;
    wx.request({
      url: host + 'xcx/index/get_comment/',
      data: { id: id, commentType: that.data.currentTabIndex + 1, page: that.data.page},
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

        if (page == 1) {
          that.setData({
            list: data,
            id:id
          })
        } else {
          list = list.concat(data)
          that.setData({
            list: list,
            id: id
          })
        }
      },
      complete() {
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  opImg:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var fid = e.currentTarget.dataset.fid;
    wx.previewImage({
      current: that.data.list[fid].img[id], // 当前显示图片的http链接
      urls: that.data.list[fid].img // 需要预览的图片http链接列表
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
    var page = that.data.page+1;
    that.setData({
      page: page
    })
    that.onLoad();
  },

})