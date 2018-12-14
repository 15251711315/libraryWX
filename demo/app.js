App({
  onLaunch: function () {
    var that = this;  
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          wx.request({
            url: that.globalData.url+"/books/achieveOpenid",
            data: { code: code },
            success: function (res) {
              that.globalData.openid = res.data;
              // console.log(res.data)
            },
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
  },

  globalData: {
    url: "http://localhost:8066",
    openid:"",
    userInfo:""
  } 
});



