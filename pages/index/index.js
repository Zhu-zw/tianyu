//index.js
//获取应用实例
const app = getApp()
let scrollDdirection = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedSub: 0, // 选中的分类
    scrollHeight: 0, // 滚动视图的高度
    list: [],
    toView: 'position0', // 滚动视图跳转的位置
    scrollTopLeft: 0, //  左边滚动位置随着右边分类而滚动
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取设备信息
    wx.getSystemInfo({
      success: res => {
        this.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
    // 获取数据
    var fl=[
      {"name":'分类1','id':1},
      {"name":'分类2','id':2},
      {"name":'分类3','id':3},
    ];
    var pro={
      "1":[
          {sp_name:"商品1"}
      ],
      "2":[
        {sp_name:"商品2"}
    ],
    "3":[
      {sp_name:"商品3"}
  ] ,
    }
    console.log(pro[1]);
    this.setData({
      list:Array.from(fl, (item, index) => {
        return {
          title: item.name,
          list: Array.from(Array(pro[item.id]))
        }
      }),
      prode:pro
    })
    console.log(pro['1'].pro);
     this.getData();
  },
  // 获取数据
  getData(){
    let _this=this
     setTimeout(() => {
      // 异步请求数据,请求完毕并且渲染数据之后才可以执行lisenerScroll
      // wx.request({
      //   url: app.globalData.url+'index/index',
      //   header: { "Content-Type": "application/x-www-form-urlencoded"},
      //   method:'POST',
      //   success: function(res) {
      //   let list= Array.from([res.fl], (item, index) => {
      //       return {
      //         title: "分类",
      //         list: Array.from(Array(res.count))
      //       }
      //     })
      //     _this.setData({
      //       list:list // 得到请求的数据，并且渲染视图
      //     },() => {
      //       // 获取所有分类的头部偏移量
      //       _this.lisenerScroll();
      //     })
      //   },
      // })
    },300)
  },
  /**
   * 跳转滚动条位置
   */
  toScrollView(e) {
    const {
      selectedSub
    } = this.data
    const {
      index
    } = e.currentTarget.dataset
    let left_ = 0
    if (index > 3) {
      left_ = (index - 3) * 50 // 左边侧栏item高度为50，可以根据自己的item高度设置
    }
    this.setData({
      selectedSub: index,
      toView: `position${index}`,
      scrollTopLeft: left_
    })
  },
  /**
   * 获取右边每个分类的头部偏移量
   */
  lisenerScroll() {
    // 获取各分类容器距离顶部的距离
    new Promise(resolve => {
      let query = wx.createSelectorQuery();
      for (let i in this.data.list) {
        query.select(`#position${i}`).boundingClientRect();
      }
      query.exec(function(res) {
        resolve(res);
      });
    }).then(res => {
      this.data.list.forEach((item, index) => {
        item.offsetTop = res[index].top
      })
      this.setData({
        scrollInfo: res,
        list: this.data.list
      })
    });
  },
  /**
   * 监听滚动条滚动事件
   */
  scrollTo(e) {
    const scrollTop = e.detail.scrollTop; //滚动的Y轴
    const {
      selectedSub,
      list
    } = this.data;
    let left_ = 0
    if (scrollDdirection < scrollTop) {
      // 向上滑动
      scrollDdirection = scrollTop
      // 计算偏移位置
      if (selectedSub < list.length - 1 && scrollTop >= list[selectedSub + 1].offsetTop) {
       if (selectedSub > 2) {
          left_ = (selectedSub - 2) * 50
        } 
        this.setData({
          selectedSub: selectedSub + 1,
          scrollTopLeft: left_
        })
      }
    } else {
      // 向下滑动
      scrollDdirection = scrollTop
      // 计算偏移位置
      if (selectedSub > 0 && scrollTop < list[selectedSub].offsetTop && scrollTop > 0) {
       if (selectedSub > 3) {
          left_ = (selectedSub - 4) * 50
        }
       this.setData({
          selectedSub: selectedSub - 1,
          scrollTopLeft: left_
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },
})