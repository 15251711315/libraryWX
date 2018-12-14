//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    avatarUrl:'',
    nickName:'' 
  },

  onLoad: function () {
    this.setData({
      avatarUrl: getApp().globalData.userInfo.avatarUrl,
      nickName:getApp().globalData.userInfo.nickName
    })
  },
  
})
