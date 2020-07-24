// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checks: [
      { name: "待发快递", value: '0', checked: true },
      { name: "到店自提", value: '1', checked: false },
      { name: "送货上门", value: '2', checked: false }
    ],
    items:[
      { name: 'WX', value: '微信支付', checked:true},
    ],
    aa:'WX'
  },
  
  bindtap1:function(e){
    var items = this.data.items;
    for (var i = 0; i < items.length; i++){
      if (items[i].name == this.data.aa){
        for (var j = 0; j < items.length; j++) {
          // console.log("items[j].checked = ", items[j].checked);
          if (items[j].checked && j != i) {
              items[j].checked = false;
            }
        }
        items[i].checked = !(items[i].checked);
        console.log("-----:" ,items);
        // this.setData(this.data.items[i]);
 
      }
    }
    this.setData({
      items: items
    });
  },
  radioChange: function (e) {
    // for(var i = 0;i<this.data.items.length;i++){
    //   if (this.data.items[i].checked){
    //     // console.log('radio发生change事件，携带value值为：', this.data.items[i].name)
    //   }
    // }
      this.data.aa = e.detail.value;
      console.log(this.data.aa);
    },
  
  clicks: function (e){
    let index = e.currentTarget.dataset.index;
    let arrs = this.data.checks;
    if (arrs[index].checked == false){
      arrs[index].checked = true;
    }else{
      arrs[index].checked = false;
    }
    this.setData({
      checks: arrs
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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