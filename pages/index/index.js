//index.js
//获取应用实例


const app = getApp()
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  methods:{
    showDialog: function () {
      this.dialog.showDialog();
    },

    confirmEvent: function () {
      this.dialog.hideDialog();
    },

    bindGetUserInfo: function () {
      // 用户点击授权后，这里可以做一些登陆操作
      this.login();
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    //用户点击tab时调用
    titleClick: function (e) {
      let currentPageIndex =
        this.setData({
          //拿到当前索引并动态改变
          currentIndex: e.currentTarget.dataset.idx
        })
    },
    titleClick2: function (e) {
      let currentPageIndex =
        this.setData({
          //拿到当前索引并动态改变
          currentIndex2: e.currentTarget.dataset.idx
        })
    },
    setContainerHeight: function (e) {
      var sysInfo = wx.getSystemInfoSync();//同步获取设备宽度
      var screenWidth = sysInfo.screenWidth; //获取屏幕的宽度
      var scale = screenWidth * 0.63;
      this.setData({
        height: scale,
        height1: scale*1.29
      })
    },
    swiperChange: function (e) {
      var that = this;
      that.setData({
        current: e.detail.current
      })
    },
    //事件处理函数
    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    login: function () {
      var that = this;
      wx.getUserInfo({
        success: res => {
          wx.login({
            success: res1 => {
              console.log(res1)
              wx.request({
                url: that.data.host+"/xcx/user/wx_login",
                data: { "code": res1.code, info: res.userInfo },
                method: 'POST',

                success(res) {
                  // console.log(res.data)
                }
              })
            }
          })
        }
      })

    },
    toDetails: function (e) {
      var that = this;
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/productDetails/productDetails?id=' + id,
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
    toSearch: function (e) {
      var that = this;
      var key = e.currentTarget.dataset.key;
      wx.navigateTo({
        url: '/pages/search/search?keyWord=' + key,
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
    toTjxq:function(e){
      var that = this;
      var key = e.currentTarget.dataset.key;
      wx.navigateTo({
        url: '/pages/kslj/kslj?id=' + key,
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
    getUserInfo: function (e) {
      console.log(e);
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    getList3: function (host) {
      var that = this;
      wx.request({
        url: host + 'xcx/index/goods_list/',
        data: { lat: that.data.latitude, lng: that.data.longitude },
        method: 'POST',
        dataType: 'json',
        success(res) {
          if (!wx.$check(res.data)) {
            return;
          };
          var data = res.data.data.data;
          console.log(12, data);
          that.setData({
            list3: data
          })
        }
      })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  },
  data: {
    array: ['上海', '中国', '巴西', '日本'],
    index: 0,
    banner: ["/images/h1-01.png", "/images/h1-01.png", "/images/h1-01.png"],
    imageWidth: wx.getSystemInfoSync().windowWidth,//图片宽度   
    motto: 'Hello World',
    userInfo: {},
    info: 1,
    list1: '',//年卡专享
    list2: '',//全部
    tags: [],//推荐
    hasUserInfo: false,
    height: '',
    current:0,
    host: app.globalData.host,
    currentIndex: 0,
    currentIndex2: 0
  },

  ready: function () {
    // console.log(123);
    var that = this;
    var host = app.globalData.host;
    // 查看是否授权
    
    
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        wx.setStorageSync('wz', {
          latitude: res.latitude,
          longitude: res.longitude
        })
        that.getList3(host);
      }
    });

    wx.request({
      url: host + 'xcx/user/is_login',
      data: '',
      method: 'POST',
      dataType: 'json',
      success(res) {
        var data = res.data;
        if (data.code == -1) {
          that.showDialog();
        }
      }
    })
    wx.request({
      url: host + 'xcx/Article/article_list/cid/1',
      data: '',
      method: 'POST',
      dataType: 'json',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data.data;
        console.log(data);
        that.setData({
          tags: data
        })
      }
    })
    wx.request({
      url: host + 'xcx/Common/ad_show/pid/1',
      data: '',
      method: 'POST',
      dataType: 'json',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data;
        // console.log(data);
        that.setData({
          banner: data
        })
      }
    })
    wx.request({
      url: host + 'xcx/index/goods_list',
      data: '',
      method: 'POST',
      dataType: 'json',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data.data;
        // console.log(11,data);
        that.setData({
          list2: data
        })
      }
    })
    wx.request({
      url: host + 'xcx/index/goods_list/cid/1',
      data: '',
      method: 'POST',
      dataType: 'json',
      success(res) {
        if (!wx.$check(res.data)) {
          return;
        };
        var data = res.data.data.data;
        // console.log(2, data);
        that.setData({
          list1: data
        })
      }
    })
    
    //获得dialog组件
    that.dialog = that.selectComponent("#dialog");
  }

})
