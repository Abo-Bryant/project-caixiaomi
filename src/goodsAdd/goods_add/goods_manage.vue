<template>
  <view>
    <view class="m-category">
      <scroll-view scroll-y class="left">
        <view class="item" v-for="(item, index) in leftList" :key="item.id" @click="selectCate(index)"
          :class="{ active: index === currentIndex }">{{ item.goodsKind }} </view>
      </scroll-view>
      <scroll-view scroll-y class="right">
        <view class="cate" v-for="item in rightList" :key="item">
          <!-- <view class="title">{{ item.cat_name }}</view> -->
          <u-cell-group>
            <u-cell class="title" :title="item.goodsName" isLink
              :url="`/goodsAdd/goods_add/goods_detail?item=${item.goodsName}`"></u-cell>
          </u-cell-group>

        </view>
      </scroll-view>
    </view>
    <view class="bottom">
      <navigator url="">
        <u-button class="bottom-btn">分类管理</u-button>
      </navigator>
      <navigator :url="`/goodsAdd/goods_add/index?Classify=${categoriesList}`">
        <u-button>新增货品</u-button>
      </navigator>
    </view>
  </view>
</template>

<script>
import axios from 'axios'

export default {
  name: '',
  data () {
    return {
      filterList: [],
      List: [],
      lList: [],
      // 货品类别
      categoriesList: [],
      // leftList: [],
      currentIndex: 0,
      // rightList: ['日本萝卜', '山东萝卜', 3, 4, 5]
    }
  },
  created () {
    this.getCategoriesList()
    this.getGoodsKindList()
    // this.getGoodsList()
    // this.setNewArr()
  },
  onShow () {
    // console.log(111);
    this.getCategoriesList()
  },
  computed: {

    // 计算属性是函数， 但是在模板html上面是当做属性去用，不能加小括号
    leftList () {
      // this.categoriesList 数据很大，绑定到页面上，影响性能，
      // 通过计算属性，优化我们的代码， 页面需要用那几个字段，就加工为那几个字段
      return this.categoriesList.map((item) => ({
        id: item.id,
        goodsKind: item.goodsKind,
      }));
    },
    // 通过计算属性，获取右侧的整个大数组
    rightList () {
      // 如果通过索引号去获取数组的元素，一定要注意 当前数组有没有值，会不会为undefined
      return this.categoriesList.length > 0 ? this.categoriesList[this.currentIndex].children : [];
    },
    // newrightList () {
    //   return this.rightList.filter(item => {
    //     item.pid === leftList[i].id
    //   })
    // }
  },
  methods: {
    getCategoriesList () {
      if (uni.getStorageSync('categoriesList')) {
        this.categoriesList = uni.getStorageSync('categoriesList')
      } else {
        uni.request({
          url: 'https://www.fastmock.site/mock/a70ae7448faa7c23113d82ec2ec97f8f/_abo-990716/api/goodsname', success: (res) => {
            this.categoriesList = res.data.data
            // console.log(this.categoriesList);
            // 异步读取本地缓存
            uni.setStorageSync('categoriesList', res.data.data)
          }
        })
      }

    },
    getGoodsKindList () {
      uni.request({
        url: 'https://www.fastmock.site/mock/a70ae7448faa7c23113d82ec2ec97f8f/_abo-990716/api/goodskind', success: (res) => {
          // console.log(res.data.data);
          this.lList = res.data.data
          // 异步读取本地缓存
        }
      })
      uni.request({
        url: 'https://www.fastmock.site/mock/a70ae7448faa7c23113d82ec2ec97f8f/_abo-990716/api/goods', success: (res) => {
          this.List = res.data.data
          // 异步读取本地缓存
          this.filterList = this.List.filter(item => {
            return 0 == item.pid
          })
        }
      })

      // this.categoriesList=[]
    },
    selectCate (index) {
      this.currentIndex = index;
      // console.log('刚刚开始', this.filterList);
      // this.filterList = this.List
      // this.filterList = this.List.filter(item => {
      //   return index == item.pid
      // })
      // console.log(index, this.filterList);

    },
    // 分类管理
    // doClassify () {
    //   console.log(111);
    // },
    // 新增货品
    // doAddGoods () {
    //   console.log(222);
    //   uni.navigateTo({
    //     url: '/pages/goods_add/index',
    //     success () {
    //       console.log("跳转成功")
    //     },
    //     fail () {
    //       console.log("跳转失败");
    //     }

    //   });
    // }
  },
}

</script>
<style scoped lang='scss'>
.m-category {
  display: flex;
  height: calc(100vh - 44px);

  .left {
    height: 100%;
    width: 182rpx;
    font-size: 15px;
    text-align: center;
    background-color: #ffffff;

    .item {
      padding: 40rpx 20rpx;
      font-weight: 700;
      color: #000;

      &.active {
        background: #1d9d60;
        color: #fff;
        border-radius: 8px;
      }
    }
  }

  .right {
    height: 100%;
    background-color: #f4f5f7;
    ;
    flex: 1;

    .title {
      background-color: #fff;
      margin: 18rpx 0 21rpx;
      text-align: center;
    }
  }
}

.bottom {
  display: flex;

  .bottom-btn {
    width: 50%;
  }
}

.goods-list {
  display: flex;
  padding: 0 48rpx;
  justify-content: space-between;
  flex-wrap: wrap;

  .pic {
    width: 120rpx;
    height: 120rpx;
  }

  .name {
    margin-bottom: 30rpx;
    font-size: 21rpx;
    color: #2e2e2e;
    text-align: center;
    line-height: 1;
  }
}
</style>