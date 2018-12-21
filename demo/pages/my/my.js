//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function () {
    this.setData({
      avatarUrl: getApp().globalData.userInfo.avatarUrl,
      nickName:getApp().globalData.userInfo.nickName
    }),
      this.queryReadBooks()
  },
  data: {
    avatarUrl: '',
    nickName: '' ,
    list01: [],
    list02: [],
   
    // 展开折叠
    selectedFlag: [false, false, false, false],

  },
  // 展开折叠选择  
  changeToggle: function (e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },

  queryReadBooks: function(e){
    var that = this;
    wx.request({
      url: app.globalData.url + "/books/queryReadBooks",
      data: {
        userId: app.globalData.userInfo.id
      },
      header: {
        "content-type": "applciation/json" // 默认值
      },
      method: "get",
      success: function (res) {
        that.setData({
          list01: res.data.reading,
          list02: res.data.returned
        })
      },
      fail: function () {
        wx.showModal({
          title: '查询失败',
          content: '查询书籍失败，请重试。',
        })
      }
    })
  }
})
