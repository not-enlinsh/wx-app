Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "rgba(59, 168, 228, 1)",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/index.png",
      selectedIconPath: "/images/index1.png",
      text: "首页"
    },
    {
      pagePath: "/pages/personalCenter/personalCenter",
      iconPath: "/images/myNow1.png",
      selectedIconPath: "/images/myNow.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})