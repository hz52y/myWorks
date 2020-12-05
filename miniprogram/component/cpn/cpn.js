// component/cpn/cpn.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持  // 具名插槽当中可以开启
  },
  /**
   * 组件的属性列表
   */
  properties: {
    color: {
      type: String,
      value: "默认值"
    },
    title: {
      type: String,
      value: "默认值"
    }
  },
  //生命周期钩子
  lifetimes: {
    //  created钩子函数当中不做什么操作
    created() {
      console.log(this.properties.title)
      this.setData({
        title: 'abc'
      })
      console.log(this.properties.title)
    },
    // 相当于vue==>created
    attached() {
      this.setData({
        title: "哈哈"
      })
    },
    detached() {
      console.log("被销毁了")
    },
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    emit() {
      console.log(this.properties.title);
      //发射自定义事件,并传参
      this.triggerEvent("childEvents", {
        num: 123
      })

    }
  }
})