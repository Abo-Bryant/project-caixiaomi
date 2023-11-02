<template>
  <view class="page" v-if="goodsDetail.state === '启用'">
    <!-- 货品名称 -->
    <view class="goods-name">
      <view class="name-txet">货品名称</view>
      <view>
        <u--input placeholder="请输入货品名称(必填)" border="surround" v-model="goodsDetail.goodsName" @change="change"
          focus></u--input>
      </view>
    </view>

    <!-- 包装类型 -->
    <view class="goods-type">
      <view class="type-txet">包装类型</view>
      <view>{{ goodsDetail.packagingType }}</view>
    </view>
    <!-- 货品规格 -->
    <view class="goods-size" v-if="goodsDetail.packagingType === '定装'">
      <view class="size-txet">货品规格</view>
      <view @click="noCustomerShow = true">{{ goodsDetail.sizeNum + '/斤' + goodsDetail.size }}</view>
      <view>
        <u-picker :show="noCustomerShow" :columns="columns" @confirm="confirm" @cancel="cancelTwo"></u-picker>
      </view>
    </view>

    <!-- 计数单位 -->
    <view class="goods-tally" @click="noCustomerShow = true" v-if="goodsDetail.packagingType === '非定装'">
      <view class="tally-txet">计数单位</view>
      <view class="tally-txettwo">{{ goodsDetail.tally }}</view>
      <view class="tally-icon">
        <u-icon v-if="noCustomerShow === false" name="arrow-down-fill"></u-icon>
        <u-icon v-else name="arrow-up-fill"></u-icon>
      </view>
      <view>
        <u-picker :show="noCustomerShow" :columns="columns" @confirm="confirmTwo" @cancel="cancelTwo"></u-picker>
      </view>
    </view>

    <!-- 销售单价 -->
    <view class="goods-price">
      <view class="price-txet">销售单价</view>
      <view>
        <u-input placeholder="请输入货品单价" border="surround" v-model="goodsDetail.price" @change="changeOne">
          <template slot="suffix">
            <view>元/斤</view>
          </template>
        </u-input>
      </view>
    </view>
    <!-- 货品分类 -->
    <view class="goods-classify" @click="doSelection">
      <view class="classify-txet">货品分类</view>
      <view class="classify-txettwo" ref="myInput">{{ goodsDetail.kind }}</view>
      <view class="classify-icon">
        <u-icon v-if="selectIsShow" name="arrow-down-fill"></u-icon>
        <u-icon v-else name="arrow-up-fill"></u-icon>
      </view>
    </view>
    <!-- 货品分类的列表 -->
    <view class="classify-select" v-if="selectIsShow === false">
      <view class="select-btn active" @click="doAddManage">+新增分类</view>
      <view class="select-btn" v-for="item in leftList" @click="doIt(item.goodsKind)">{{ item.goodsKind }}</view>
    </view>
    <!-- 底部操作按钮 -->
    <view class="goods-save">
      <view class="delOrStop">
        <view class="del" @click="del">删除货品</view>
        <view class="stop" @click="stop">停用货品</view>
      </view>
      <view class="save" @click="save">保存</view>
    </view>
    <!-- 删除弹出框 -->
    <view class="goods-del">
      <u-modal :show="delshow" showCancelButton confirmText="删除" confirmColor="#eb370c" @cancel="delCancel"
        @confirm="delConfirm">
        <view class="slot-content">
          <rich-text :nodes="`确定删除这个货品吗？`"></rich-text>
        </view>
      </u-modal>
    </view>
    <view class="goods-stop">
      <u-modal :show="stopshow" showCancelButton confirmText="确定停用" confirmColor="#2bdc70" @cancel="stopCancel"
        @confirm="stopConfirm">
        <view class="slot-content">
          <rich-text :nodes="`确定停用这个货品吗？停用后货品无法售卖`"></rich-text>
        </view>
      </u-modal>
    </view>
  </view>

  <view class="stop-page" v-else>
    <view class="stop-left">
      <view class="stop-txt">货品名称 <text class="stop-text">{{ goodsDetail.goodsName }}</text></view>
      <view class="stop-txt">包装类型<text class="stop-text type">{{ goodsDetail.packagingType }}</text></view>
      <view class="stop-txt" v-if="goodsDetail.packagingType === '定装'">销售单价<text class="stop-text">{{ goodsDetail.sizeNum
        +
        '元/' + goodsDetail.size }}</text>
      </view>
      <view class="stop-txt" v-if="goodsDetail.packagingType === '散装'">销售单价<text class="stop-text">{{ goodsDetail.price +
        '元/斤' }}</text>
      </view>
      <view class="stop-txt" v-if="goodsDetail.packagingType === '非定装'">销售单价<text class="stop-text">{{ goodsDetail.price +
        '元/' + goodsDetail.tally }}</text>
      </view>
      <view class="stop-txt">货品分类<text class="stop-text">{{ goodsDetail.kind }}</text></view>
    </view>
    <view class="delOrStop">
      <view class="del" @click="del">删除货品</view>
      <view class="stop" @click="start">启用货品</view>
    </view>
    <!-- 删除弹出框 -->
    <view class="goods-del">
      <u-modal :show="delshow" showCancelButton confirmText="删除" confirmColor="#eb370c" @cancel="delCancel"
        @confirm="delConfirm">
        <view class="slot-content">
          <rich-text :nodes="`确定删除这个货品吗？`"></rich-text>
        </view>
      </u-modal>
    </view>
  </view>
</template>

<script>
import { transformListToTree } from '../../utils/index'
export default {
  name: '',
  data () {
    return {
      stopshow: false,
      kindList: [],
      categoriesList: [],
      // valueName: '',
      // valueNoCustomerType: '件',
      delshow: false,
      // 货品分类是否展开
      selectIsShow: true,
      leftList: [],
      // piker是否打开
      noCustomerShow: false,
      columns: [
        ['件', '罐', '箱', '瓶', '盒', '袋', '包']
      ],
      goodsDetail: {
        pid: '',
        goodsName: '',
        kind: '',
        packagingType: '',
        price: '',
        size: '',
        sizeNum: '',
        state: '',
        tally: ''
      }
    }
  },
  onLoad (option) {

    console.log(option.item, 321);
    this.getGoodsKindList()
    this.categoriesList = uni.getStorageSync('categoriesList')
    // console.log(this.categoriesList);
    this.rightList = this.categoriesList.filter(item => {
      return item.goodsKind === '全部商品'
    })
    const goodsList = this.rightList[0].children.filter(item => {
      if (item.goodsName === option.item) {
        return item
      }
    })
    this.goodsDetail = goodsList[0]
    this.leftList = this.categoriesList.filter(item => {
      return item.goodsKind != '全部商品'
    })
  },
  onShow () {
    // console.log(111);
    this.getCategoriesList()
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
          this.kindList = res.data.data
          // 异步读取本地缓存
        }
      })
    },
    // 定装销售规格picker的确认按钮
    confirm (e) {
      // console.log(e);
      this.goodsDetail.size = e.value
      this.noCustomerShow = false
    },
    confirmTwo (e) {
      // console.log(e.value);
      this.goodsDetail.tally = e.value
      this.noCustomerShow = false
    },
    // 非定装销售规格picker的取消按钮
    cancelTwo () {
      this.noCustomerShow = false
    },
    // 货品分类的展示与隐藏
    doSelection () {
      this.selectIsShow = !this.selectIsShow
    },
    // 选择分类
    doIt (goodsKind) {
      // console.log(goodsKind);
      this.goodsDetail.kind = goodsKind
      this.selectIsShow = true
    },
    // 点击删除货品
    del () {
      // console.log('del');
      this.delshow = true
    },
    // 删除弹出框的取消按钮
    delCancel () {
      this.delshow = false
    },

    // 删除弹出框的删除按钮
    delConfirm () {
      // 1.首先将多维的对象数组遍历 得到的结果是一个二维数组
      const arr = this.categoriesList.map(item => {
        return item.children.map(j => {
          return j
        })
      })
      // 2.再将二位数组展开平铺,得到的结果是一个一维数组
      var newArr = arr.reduce(function (pre, curr, index, array) {
        return pre.concat(curr);
      })
      // 3.这样就可以对这个数组进行筛选,将不需要的删除掉,得到一个筛选过后的一维数组
      const Arr = newArr.filter(item => {
        // console.log(item.goodsName, this.goodsDetail.goodsName);
        return item.goodsName !== this.goodsDetail.goodsName
      })
      console.log('数据结构', [...Arr, ...this.kindList]);
      // 4.将这个一维数组进行一个递归的遍历,得到树形数组,就是数据结构需要的数组
      this.categoriesList = transformListToTree([...Arr, ...this.kindList], '')
      // console.log('abo', abo);
      uni.setStorageSync('categoriesList', this.categoriesList)
      uni.navigateBack({
        delta: 1
      });
    },
    stop () {
      console.log('stop');
      // console.log(this.goodsDetail.state);
      // console.log('this.goodsDetail', this.goodsDetail.state);
      this.stopshow = true
    },
    // 停用货品的取消
    stopCancel () {
      this.stopshow = false
    },
    // 停用货品的确定
    stopConfirm () {
      // console.log('确定停用');
      // console.log('this.goodsDetail', this.goodsDetail.state);
      // 1.首先将多维的对象数组遍历 得到的结果是一个二维数组
      const arr = this.categoriesList.map(item => {
        return item.children.map(j => {
          return j
        })
      })
      // 2.再将二位数组展开平铺,得到的结果是一个一维数组
      var newArr = arr.reduce(function (pre, curr, index, array) {
        return pre.concat(curr);
      })
      // 3.这样就可以对这个数组进行筛选,将不需要的删除掉,得到一个筛选过后的一维数组
      newArr.forEach(item => {
        // console.log(item.goodsName, this.goodsDetail.goodsName);
        console.log(item.goodsName, this.goodsDetail.goodsName);
        if (item.goodsName === this.goodsDetail.goodsName) {
          item.state = '未启用'
        }
      })
      console.log('newArr', newArr);
      this.categoriesList = transformListToTree([...newArr, ...this.kindList], '')
      // console.log('abo', abo);
      uni.setStorageSync('categoriesList', this.categoriesList)
      uni.navigateBack({
        delta: 1
      });
    },
    start () {
      this.goodsDetail.state = '启用'
      const arr = this.categoriesList.map(item => {
        return item.children.map(j => {
          return j
        })
      })
      // 2.再将二位数组展开平铺,得到的结果是一个一维数组
      var newArr = arr.reduce(function (pre, curr, index, array) {
        return pre.concat(curr);
      })
      // 3.这样就可以对这个数组进行筛选,将不需要的删除掉,得到一个筛选过后的一维数组
      newArr.forEach(item => {
        // console.log(item.goodsName, this.goodsDetail.goodsName);
        console.log(item.goodsName, this.goodsDetail.goodsName);
        if (item.goodsName === this.goodsDetail.goodsName) {
          item.state = '启用'
        }
      })
      console.log('newArr', newArr);
      this.categoriesList = transformListToTree([...newArr, ...this.kindList], '')
      // console.log('abo', abo);
      uni.setStorageSync('categoriesList', this.categoriesList)
    },
    save () {
      console.log('save');
      uni.navigateBack({
        delta: 1
      });
    }
  },
}

</script>
<style scoped lang='scss'>
.stop-page {
  background-color: #f4f5f7;
  height: 600px;

  .stop-left {
    background-color: #fff;
    padding: 20px 10px;

    .stop-txt {
      margin-bottom: 10px;

      // margin-right: 5px;
      .stop-text {
        margin-left: 10px;
      }

      .type {
        width: 30px;
        padding: 5px;
        height: 20px;
        background-color: #daf5fe;
        color: #4684b2
      }
    }
  }



  .delOrStop {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .del {
      width: 150px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border: 1px solid #f13636;
      color: #f13636;
      border-radius: 25px;
    }

    .stop {
      width: 150px;
      height: 50px;
      border: 1px solid #15cf34;
      line-height: 50px;
      text-align: center;
      color: #15cf34;
      border-radius: 25px;


    }


  }
}

.page {
  background-color: #f4f5f7;
  height: 600px;
  position: relative;

  .goods-name {
    border-top: 2px solid #e5e5e5;
    height: 90px;
    background-color: #fff;
    padding: 10px 20px;
    margin-bottom: 10px;

    .name-txet {
      margin-bottom: 10px;
    }
  }

  .goods-type {
    background-color: #fff;
    padding: 10px 20px;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    display: flex;

    .type-txet {
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }

  .goods-size {
    background-color: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;

    .size-txet {
      // margin-top: 8px;
      margin-right: 10px;
    }
  }

  .goods-tally {
    background-color: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;

    .tally-txet {
      margin-right: 10px;
    }

    .tally-txettwo {
      color: #000;
      font-size: 18px;
      font-weight: 500;
      margin-right: 225px;
    }

    .tally-icon {}
  }

  .goods-price {
    background-color: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;

    ::v-deep .u-input--radius.data-v-fdbb9fe6,
    .u-input--square.data-v-fdbb9fe6 {
      width: 250px;
      background-color: #f6f7fb;
    }

    .price-txet {
      margin-top: 8px;
    }
  }

  .goods-classify {
    background-color: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    // justify-content: center;
    align-items: center;

    .classify-txet {
      // margin-top: 8px;
      margin-right: 10px;
    }

    .classify-txettwo {
      // margin-top: 8px;
      margin-right: 180px;
      color: #979797;
    }

    .classify-icon {}
  }

  .classify-select {
    background-color: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    flex-wrap: wrap;


    .select-btn {
      padding: 0px 25px;
      // width: 80px;
      height: 30px;
      line-height: 30px;
      border-radius: 20px;
      border: 1px solid #b3b3b3;
      margin-right: 20px;
      margin-bottom: 20px;

      &.active {
        color: #239663;
        border: 1px solid #239663;
      }
    }
  }

  .goods-add {
    .slot-content {

      ::v-deep .u-input--radius.data-v-fdbb9fe6,
      .u-input--square.data-v-fdbb9fe6 {
        width: 250px;
        background-color: #f6f7fb;
        // border-color: #239663;
      }
    }
  }

  .goods-save {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #239663;

    .delOrStop {
      width: 100%;
      height: 50px;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .del {
        width: 150px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #f13636;
        color: #f13636;
        border-radius: 25px;
      }

      .stop {
        width: 150px;
        height: 50px;
        border: 1px solid #15cf34;
        line-height: 50px;
        text-align: center;
        color: #15cf34;
        border-radius: 25px;

      }
    }

    .save {
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: 30px;
    }
  }
}
</style>