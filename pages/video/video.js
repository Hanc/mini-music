// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    videoGroupList: [],
    navId: '', //导航标识
    videoId: '', //视频标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGrouplist();
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

  },


  // 获取视频导航
  getVideoGrouplist() {
    const app = getApp();
    let url = '/video/group/list';
    let data = {}
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        list: res.data.slice(0, 14),
        navId: res.data[0].id
      })
      this.getVideoList(this.data.navId);
      console.log(res)
    }, (err) => {
      console.log(err)
    });
  },

  // 获取视频下的播放列表
  getVideoList(navId) {
    const app = getApp();
    let url = '/video/group';
    if (!navId) {
      return;
    }
    let data = {
      id: navId
    }
    wx.hideLoading({
      success: (res) => {},
    })
    let index = 0;
    app.wxRequest('GET', url, data, (res) => {
      let videoGroupList = res.datas.map(item => {
        item.id = index++;
        return item;
      })
      this.setData({
        videoGroupList
      })
      console.log(res)
    }, (err) => {
      console.log(err)
    });
  },

  changeNav(event) {
    let navId = event.currentTarget.id;
    this.setData({
      navId: navId >>> 0,
      videoGroupList: '',
    })

    //显示正在加载
    wx.showLoading({
      title: '正在加载',
    })
    this.getVideoList(this.data.navId);

  },

  handlePlay(event) {
    let vid = event.currentTarget.id
    this.vid != vid && this.videoContext && this.videoContext.stop();
    this.setData({
      videoId : vid
    })
    this.videoContext = wx.createVideoContext(vid);
  }
})