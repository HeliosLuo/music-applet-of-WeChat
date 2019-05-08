// pages/index/index.js

var utils = require("../../utils/utils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  utils.http("http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=2&count=3&offset=0", this.callback, "hotsong", "热歌榜");
	  utils.http("http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=1&count=3&offset=0", this.callback, "newsong", "新歌榜");
	  utils.http("http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=11&count=3&offset=0", this.callback, "rocksong", "摇滚榜");
  },

  callback: function (data, type, category){
  		//   console.log(data);

		var songdata = {};
		var songlist = [];
		songdata[type] = {
			songlist: data.song_list,
			category: category
		}

		this.setData(songdata);
		// console.log(this.data);
  },
  
  // 跳转到列表页面
  musicHandler: function (event){
	  var category = event.currentTarget.dataset.category;
	  wx.navigateTo({
		  url: '../music/music?category=' + category,
	  })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})