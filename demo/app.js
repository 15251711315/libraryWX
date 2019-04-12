App({
  onLaunch: function () {
   var that = this;
  that.setOpenid();
  },
  
  globalData: {
    // url: "http://localhost:8066",
    url: "https://www.baohaiya.top/library",
    openid: "",
    userInfo: "",
    selectedBooksList: [],
  } ,
setOpenid:function(e){
  var that = this;
  // return new Promise((resolve, reject)=>{
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code)
        if (code) {
          wx.request({
            url: that.globalData.url + "/books/achieveOpenid",
            data: { code: code },
            success: function (res) {
              that.globalData.openid = res.data;
              console.log("app塞值openid：" + res.data);
              console.log("global,openid：" + that.globalData.openid);
              // resolve(res);
            },
            fail(err){
              // reject(err);
            }
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
  // })
},

  waitOpenid: function () {
    var that = this;
    if (!that.globalData.openid) {
      var interval = setInterval(function () {
        console.log("正在请求openid");
        console.log(that.globalData.openid);
        if (that.globalData.openid) {
          console.log("请求openid成功")
          clearInterval(interval)
        }
      }, 1000)
    }
  },
  


  
});



