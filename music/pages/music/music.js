// pages/music/music.js

var utils = require("../../utils/utils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  musicList: [],
	  musicTitle: "",
	  musicPic: "",
	  musicDesc: "",
	  dataUrl: "",
	  title: "",
	  coverImgUrl: "",
	  playing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	//   console.log(options.category);

	// 根据不同榜单,拼接不同url
	var url = "";
	switch(options.category){
		case "今日推荐":
			url = "http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=25&count=10&offset=0";
			break;

		case "朋友圈歌曲":
			url = "http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=22&count=10&offset=0";
			break;

		case "新歌榜":
			url = "http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=1&count=10&offset=0";
			break;

		case "热歌榜":
			url = "http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=2&count=10&offset=0";
			break;

		case "摇滚榜":
			url = "http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=11&count=10&offset=0";
			break;
	}

	// 根据url发请求拿数据
	utils.http(url, this.callback, null, null);
  },

  callback: function (data, type, category){

	//   console.log(data);
	this.setData({
		musicList: data.song_list,
		musicTitle: data.billboard.name,
		musicPic: data.billboard.pic_s192,
		musicDesc: data.billboard.comment
	})
	console.log(this.data);
  },

  palyHandler: function (event){
	  var mid = event.currentTarget.dataset.musicid;
	  console.log(mid);

	  // 拿到播放数据
	  utils.http("http://www.wwtliu.com/sxtstu/music/baidu/play.php?mid=" + mid, this.getMusicInfo, null, null);
  },

  getMusicInfo: function (data){
	  this.setData({
		  dataUrl: data.bitrate.show_link,
		  title: data.songinfo.title,
		  coverImgUrl: data.songinfo.pic_small
	  })

	  this.play();
  },

  //  播放功能
  play: function (){
	  var that = this;
	  wx.playBackgroundAudio({
		  dataUrl: this.data.dataUrl,
		  title: this.data.title,
		  coverImgUrl: this.data.coverImgUrl,
		  complete: function (){
			  that.setData({
				  playing: true
			  })
		  }
	  })
  },
  
  // 暂停功能
  pause: function (){
	  wx.pauseBackgroundAudio();
	  this.setData({
		  playing: false
	  })
  }

})