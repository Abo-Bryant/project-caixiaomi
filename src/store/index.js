// // 导入 vue 和 vuex
// import Vue from 'vue'
// import Vuex from 'vuex'
// import user from './modules/user'
// import goods from './modules/goods'

// // 以插件形式使用 vuex
// Vue.use(Vuex)

// // Vuex.Store 构造器选项
// const store = new Vuex.Store({
//   state: {
//     cartList: uni.getStorageSync('cartList') || [],
//   },
//   getters: {
//     isAllSelected (state) {
//       // return state.cartList.every(item => item.goods_select)
//       return state.cartList.every(item => {
//         return item.goods_select
//       })
//     },
//     // 计算当前勾选的商品数组 ---  filter  -- 返回值：筛选后的数组
//     selectedCartList (state) {
//       return state.cartList.filter(item => item.goods_select)
//     },
//     // 当前勾选的商品的数量
//     selectedCartListCount (state, getters) {
//       // let sum = 0;
//       // getters.selectedCartList.forEach(item => {
//       //   sum += item.goods_count
//       // })
//       // return sum

//       // forEach 几个参数   [].forEach((item, index, arr) => {})
//       // reduce 几个参数    [].reduce((prev, item, index, arr) => {}, 初始值(可写可不写))
//       return getters.selectedCartList.reduce((prev, item) => {
//         prev += item.goods_count
//         return prev
//       }, 0)
//     },
//     // 当前勾选商品的总价格
//     selectedCartListPrice (state, getters) {
//       return getters.selectedCartList.reduce((prev, item) => {
//         prev += Number(item.goods_price) * Number(item.goods_count)

//         return prev
//       }, 0)
//     }
//   },
//   mutations: {
//     updateCartList (state, payload) {
//       // 下面这句话就是将vuex里面的值进行修改
//       state.cartList = payload
//       // 为了保证用户下次进来的时候，之前的数据还存在，就要将数据持久化储存
//       uni.setStorageSync('cartList', payload)
//     }
//   },
//   modules: {
//     user: user,
//     goods: goods
//   }
// })

// export default store

// // const arr = [1,2,3]

// // // prev初始值，reduce如果只有一个参数 prev的值数组的第一项
// // //            reduce如果二个参数， prev的值，就是第二个参数得到值

// // // prev后面的值， 回调函数每次执行完毕以后的 返回值
// // const res = arr.reduce((prev, item) => {
// //   console.log('打印',prev, item);
// //   // return  函数如果没有些return， 就相当于 reutrn undefined
// //   prev += item
// //   return prev
// // }, 100)
// // console.log(res);