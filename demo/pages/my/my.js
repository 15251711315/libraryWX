//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    avatarUrl: '',
    nickName: '',
    list01: [],
    list02: [],
    list03: [],
    // 展开折叠
    selectedFlag: [false, false, false, false],

  },
  onLoad: function () {
    this.setData({
      avatarUrl: getApp().globalData.userInfo.avatarUrl,
      nickName:getApp().globalData.userInfo.nickName,
    }),
      this.queryReadBooks()
    
  },
  
  // 展开折叠选择  
  changeToggle: function (e) {
   this.queryReadBooks();
    var index = e.currentTarget.dataset.index;
   
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })

    if (index = 3) {
      this.setData({
        list03: app.globalData.selectedBooksList
      })
    }
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
  },

  removeBooks:function(e){
    app.globalData.selectedBooksList.splice(e.currentTarget.dataset.index,1);
    this.setData({
      list03: app.globalData.selectedBooksList
    })
  },

  submit:function(e){
    console.log(e.detail.formId);
    var that = this;
    if (app.globalData.selectedBooksList.length==0){
      wx.showModal({
        title: '提交失败',
        content: '请先选择书籍。',
      })
     return null;
   }
    wx.request({
      url: app.globalData.url + "/books/submitBooks",
      data: {
        listStr: app.globalData.selectedBooksList,
        userId: app.globalData.userInfo.id,
        formId:e.detail.formId,
        openid: app.globalData.openid,
      },
      header: {
        "content-type": "applciation/json" // 默认值
      },
      method: "get",
      success: function (res) {
        wx.showModal({
          title: '提交成功',
          content: '提交成功。',
        })
        app.globalData.selectedBooksList=[];
       
      },
      fail: function () {
        wx.showModal({
          title: '提交失败',
          content: '提交失败，请先选择图书或请重试。',
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '图书馆',
      desc: '最具人气的图书馆程序!',
      path: '/pages/index/index'
    }
  }
})
