// pages/annualCard/annualCard.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    data:"",
    // 第一个下拉菜单
    start: "起始地",
    slist: [
      { id: 1, name: "第一类" },
      { id: 1, name: "第二类" },
      { id: 1, name: "第三类" },
      { id: 1, name: "第四类" },
      { id: 1, name: "第五类" },
    ],
    isstart: false,
    openimg: "/images/dropdown.png",
    offimg: "/images/dropup.png",

    // 第二个下拉菜单
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [
      { scenicSpot: "上海迪士尼", state: "待完成", time: "2020-3-21"},
      { scenicSpot: "上海迪士尼", state: "待完成", time: "2020-3-21" },
      { scenicSpot: "上海迪士尼", state: "待完成", time: "2020-3-21"},
      { scenicSpot: "上海迪士尼", state: "待完成", time: "2020-3-21"},
    ],//下拉列表的数据
    index: 0//选择的下拉列表下标
  },
  // 第一个下拉菜单的函数
  opens: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.isstart) {
          this.setData({
            isstart: false,
          });
        }
        else {
          this.setData({
            isstart: true,
          });
        }
        break;
    }
  },
  onclicks1: function (e) {
    var index = e.currentTarget.dataset.index;
    let name = this.data.slist[index].name;
    this.setData({
      isstart: false,
      isfinish: false,
      isdates: false,
      start: this.data.slist[index].name,
      finish: "目的地"
    })

  },//end第一个下拉菜单

  // 第二个下拉菜单
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
    var that = this;
    var host = app.globalData.host;

    wx.request({
      url: host + 'xcx/user/nianka',
      data: '',
      dataType: 'json',
      method: 'GET',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data;
        console.log(data);
        if (data.nianka == null){
          return;
        }else{
          that.setData({
            data:true,
            list: data.nianka
          })
        }
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

  },
  // 下拉按钮

})