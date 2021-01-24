// poages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls: [],
    Personalized: [],
    topList: [],
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiper();
    this.getPersonalized();
    this.getTopList();
    console.log(this.data);
  },

  //获取用户信息的回调
  handleGetUserInfo(res) {
    console.log(res);
    if (res.detail.userInfo) {
      this.setData({
        userInfo: res.detail.userInfo
      })
    }
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

  getSwiper(){
    const app = getApp();
    let url = '/banner';
    let data = {
      type: 2
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        swiperImgUrls : res.banners
      })
      console.log(res)
    }, (err) => {
      console.log(err)
    })
  },

  getPersonalized(){
    const app = getApp();
    let url = '/personalized';
    let data = {
      limit: 10
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        Personalized : res.result
      })
      console.log(res)
    }, (err) => {
      console.log(err)
    });
  },

  getTopList(){
    const app = getApp();
    let url = '/playlist/detail';
    let result = [];
    let data = {
      id: 24381616
    };
    for(let i = 0; i < 3; i++){
      app.wxRequest('GET', url, data, (res) => {
        let topListItem = {
          name: res.playlist.name,
          tracks: res.playlist.tracks.slice(0, 3)
        }
        result.push(topListItem);
        this.setData({
          topList : result
        });
      }, (err) => {
        console.log(err)
      });
      data.id--;
    }
  
 
  },
})