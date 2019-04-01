  //index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '/images/top_1.jpg',
      '/images/top_2.jpg',
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000, 
    booksList:[],
    nameLike:''
  },
  
  onLoad: function () {
    this.queryBooks();
  },
  nameInput:function(e){
    this.setData({
      nameLike: e.detail.value
    })
  },
  selectBooks: function (e) {
    app.globalData.selectedBooksList.push(e.currentTarget.dataset.value);
    wx.showModal({
      title: '加入成功',
      content: '已加入预选。',
    })
  },
  queryBooks:function(e){
    var that = this;  
    wx.request({
      url: app.globalData.url +"/books/queryBooks",
      data: {
        nameLike: that.data.nameLike
      },
      header: {
        "content-type": "applciation/json" // 默认值
      },
      method: "get",
      success: function (res) {
        that.setData({
          booksList: res.data,
        })
      },
      fail:function(){
        wx.showModal({
          title: '查询失败',
          content: '查询书籍失败，请重试。',
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

