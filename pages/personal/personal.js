// pages/personal/personal.js
let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransfrom: 'translateY(200)',
    coveTransition: '',
    userInfo: {},
    recentPlayList: [], //用户播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        userInfo : JSON.parse(userInfo)
      })
      this.getUserRecentPlayList()
      //获取用户播放记录
    }
  },

  getUserRecentPlayList(){
    const app = getApp();
    let url = '/user/record';
    let data = {
      uid : this.data.userInfo.userId,
      type : 1
    }
    app.wxRequest('GET', url, data, (res) => {
      let recentPlayListData = res;
      let index = 0;
      let recentPlayList = recentPlayListData.weekData.splice(0, 10).map(item =>{
        item.id = index++;
        return item;
      })
      this.setData({
        recentPlayList : recentPlayList
      })
      console.log(res)
    }, (err) => {
      console.log(err)
    });
  },

  handleTouchStart(event){
    this.setData({
      coveTransition : ``
    })
    startY = event.touches[0].clientY;
  },

  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;

    if(moveDistance <= 0){
      return;
    }
    if(moveDistance >=80){
      moveDistance = 80;
    }
    this.setData({
      coverTransfrom : `translateY(${moveDistance}rpx)`
    })
  },

  handleTouchEnd(){
    this.setData({
      coverTransfrom : `translateY(0rpx)`,
      coveTransition : `transform 1s linear`
    })
  },

  toLogin(){
    wx.reLaunch({
      url: '/pages/login/login',
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