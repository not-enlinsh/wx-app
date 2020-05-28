const app = getApp()

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
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
          if (data.head_pic.substring(0, 1) == "/") {
            data.head_pic = host + data.head_pic;
          }
          that.setData({
            info: data
          })
        }
      })
    }
  }
  , 
  data:{
    showModal: false
  },
  methods: {
    toUrl:function(e){
      var url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url,
        events: {
          
        }
      })
    },
    closem:function(){
      var that = this;
      that.setData({
        showModal:false
      })
    },
    openm: function () {
      var that = this;
      that.setData({
        showModal: true
      })
    },
    freeTell: function () {

      wx.makePhoneCall({

        phoneNumber: '18012345678',

      })

    },
    togouniank:function(){
      wx.navigateToMiniProgram({
        appId: 'wxcfa30ca8a991f6bd',
        path: 'pages/shelf/shelf',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'develop',
        success(res) {
          // 打开成功
          console.log('成功')
        }
      })
    }
  },

  ready: function () {
    
  }
})
