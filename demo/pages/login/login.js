const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权");
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '../index/index'
              })
            }
          });
        }
      }
    })
  },
  onShareAppMessage: function () {

  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
     
      // console.log(e);
      //用户按了允许授权按钮
      var that = this;
      getApp().waitOpenid();
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: getApp().globalData.url+"/books/addUser",
        data: {
          openid: getApp().globalData.openid,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //从数据库获取用户信息
          that.queryUsreInfo();
          console.log("插入小程序登录用户信息成功！");
        },
        fail:function(res){
          wx.showModal({
            title: '警告',
            content: '授权出现问题，请重新授权!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击了“返回授权”')
                wx.switchTab({
                  url: '/login'
                })
              }
            }
        })
        }
      });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
   
    console.log("queryUsreInfo:"+getApp().globalData.openid);
     
    // app.setOpenid.then((res)=>{ 
    getApp().waitOpenid();
    console.log("queryUsreInfo,callback:" + app.globalData.openid);
      wx.request({
      url: getApp().globalData.url + '/books/queryUserInfo',
      
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("queryUsreInfo,sucess:"+res.data);
        getApp().globalData.userInfo = res.data;
      }
    });
    // })
  
  },
  onShareAppMessage: function () {
    return {
      title: '图书馆',
      desc: '最具人气的图书馆程序!',
      path: '/pages/index/index'
    }
  }
})
