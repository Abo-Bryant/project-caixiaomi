<template>
  <view class="page">
    <!-- 货品名称 -->
    <view class="goods-name">
      <view class="name-txet">货品名称</view>
      <view>
        <u--input placeholder="请输入货品名称(必填)" border="surround" v-model="valueName" @change="change" focus></u--input>
      </view>
    </view>

    <!-- 包装类型 -->
    <view class="goods-type">
      <view class="type-txet">包装类型</view>
      <view class="type-button">
        <button v-for="(item, index) in goodsType" :key="index" @click="selectCate(index, item)"
          :class="{ active: index === currentIndex }" class="btn">{{ item }}</button>
      </view>
    </view>

    <!-- 销售规格 -->
    <view class="goods-size" v-if="currentIndex === 1">
      <view class="size-txet">销售规格</view>
      <view>
        <u-input placeholder="请输入货品规格" border="surround" v-model="valueWeight" @change="changeOne">
          <template slot="suffix">
            <view @click="customerShow = true">
              斤/{{ valueCustomerType }}
              <view>
                <u-picker :show="customerShow" :columns="columns" @confirm="confirm" @cancel="cancel"></u-picker>
                <!-- <u-button @click="show = true">打开</u-button> -->
              </view>
            </view>
          </template>
        </u-input>
      </view>
    </view>

    <!-- 计数单位 -->
    <view class="goods-tally" @click="noCustomerShow = true" v-if="currentIndex === 2">
      <view class="tally-txet">计数单位
      </view>
      <view class="tally-txettwo">
        {{ valueNoCustomerType }}
      </view>
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
        <u-input placeholder="请输入货品单价" border="surround" v-model="valuePrice" @change="changeOne">
          <template slot="suffix">
            <view>元/斤</view>
          </template>
        </u-input>
      </view>
    </view>

    <!-- 货品分类 -->
    <view class="goods-classify" @click="doSelection">
      <view class="classify-txet">货品分类</view>
      <view class="classify-txettwo" ref="myInput">{{ goodsKind === '' ? '选择分类' : goodsKind }}</view>
      <view class="classify-icon">
        <u-icon v-if="selectIsShow" name="arrow-down-fill"></u-icon>
        <u-icon v-else name="arrow-up-fill"></u-icon>
      </view>
    </view>

    <!-- 货品分类的列表 -->
    <view class="classify-select" v-if="selectIsShow === false">
      <view class="select-btn active" @click="doAddManage">+新增分类</view>
      <view class="select-btn" v-for="item in leftList" @click="doIt(item.goodsKind)">{{ item.goodsKind }}</view>
      <!-- <view class="select-btn">辣椒</view> -->
      <!-- <view class="select-btn">包菜</view> -->
    </view>

    <!-- 新增分类 -->
    <view class="goods-add">
      <u-modal :show="addshow" title="新增分类" showCancelButton @cancel="addCancel" @confirm="addConfirm">
        <view class="slot-content">
          <!-- <rich-text :nodes="'123456'"></rich-text> -->
          <u--input placeholder="请输入内容" border="surround" v-model="valueAdd"></u--input>
        </view>
      </u-modal>
    </view>

    <view class="goods-save" @click="saveAdd">保存</view>
  </view>
</template>


<script>
export default {
  name: '',
  data () {
    return {
      valueAdd: '',
      addshow: false,
      // 定装销售规格picker
      customerShow: false,
      // 非定装销售规格picker
      noCustomerShow: false,
      //picker里的内容
      columns: [
        ['件', '罐', '箱', '瓶', '盒', '袋', '包']
      ],
      // 包装类型
      goodsType: ['散装', '定装', '非定装'],
      // 货品分类是否展开
      selectIsShow: true,
      //货品名称的值的input
      valueName: '',
      //销售单价的值的input
      valuePrice: '',
      // 销售规格的input
      valueWeight: '',
      // 包装类型的active改变
      currentIndex: 0,
      // 定装销售规格picker的值
      valueCustomerType: '件',
      // 非定装销售规格picker的值
      valueNoCustomerType: '件',
      categoriesList: [],
      leftList: [],
      goodsKind: '',
      packagingType: ''
    }
  },
  onLoad (option) {
    // console.log(option, 321);
    this.categoriesList = uni.getStorageSync('categoriesList')
    // console.log(this.categoriesList);
    this.leftList = this.categoriesList.filter(item => {
      return item.goodsKind != '全部商品'
    })
    // console.log(this.leftList);
  },
  methods: {
    // 货品名称的值改变
    change (e) {
      // console.log('change', e);
    },
    // 销售单价的值改变
    changeOne (e) {
      // console.log('changeOne', e);
    },
    // 货品分类的展示与隐藏
    doSelection () {
      this.selectIsShow = !this.selectIsShow
    },
    // 包装类型的active改变
    selectCate (index, item) {
      console.log(index, item);
      // // 当前选中的是哪一项
      this.currentIndex = index;
      this.packagingType = item
      // // 每次点击左侧的菜单栏以后，动态设置scrollTop的值
      // this.scrollTop = -1;
      // // 当这个值设置完毕，然后等dom更新结束以后，在动态的将这个值设置为0，就会跳转到顶部
      // this.$nextTick(() => {
      //   this.scrollTop = 0;
      // });
    },
    // 定装销售规格picker的确认按钮
    confirm (e) {
      // console.log(e);
      this.valueCustomerType = e.value
      this.customerShow = false
    },
    // 定装销售规格picker的取消按钮
    cancel () {
      this.customerShow = false
    },
    // 非定装销售规格picker的确认按钮
    confirmTwo (e) {
      // console.log(e);
      this.valueNoCustomerType = e.value
      this.noCustomerShow = false
    },
    // 非定装销售规格picker的取消按钮
    cancelTwo () {
      this.noCustomerShow = false
    },
    // 选择分类
    doIt (goodsKind) {
      // console.log(goodsKind);
      this.goodsKind = goodsKind
      this.selectIsShow = true
    },
    // 新增分类
    doAddManage () {
      console.log(1111);
      this.addshow = true
    },
    // 新增弹窗取消按钮
    addCancel () {
      this.addshow = false
    },
    // 新增弹窗确认按钮
    addConfirm () {
      // console.log(this.valueAdd);
      this.addshow = false
      this.goodsKind = this.valueAdd
      this.categoriesList = [...this.categoriesList, { goodsKind: this.valueAdd, id: String(this.categoriesList.length), pid: '', children: [] }]
      // console.log(this.categoriesList);
      uni.setStorageSync('categoriesList', this.categoriesList)
    },
    // 点击保存
    saveAdd () {
      console.log('货品分类的名字', this.goodsKind, '货品名字', this.valueName, '包装类型', this.packagingType, '货品的单价', this.valuePrice, '销售规格的input',
        this.valueWeight, '定装销售规格picker的值', this.valueCustomerType, '非定装销售规格picker的值', this.valueNoCustomerType);
      // 如果是新增的货品分类,就在原数组后添加,如果是原有的货品分类,就在原有的货品的children里添加
      // console.log(this.categoriesList.includes(this.goodsKind));
      this.categoriesList.find(item => {
        if (item.goodsKind === '全部商品') {
          item.children = [...item.children, {
            pid: String(this.categoriesList.length - 1),
            goodsName: this.valueName,
            kind: this.goodsKind,
            packagingType: this.packagingType,
            price: this.valuePrice,
            size: this.valueCustomerType,
            sizeNum: this.valueWeight,
            state: "启用",
            tally: this.valueNoCustomerType
          }]
        }
        if (item.goodsKind === this.goodsKind) {
          console.log('正确');
          item.children = [...item.children, {
            pid: String(this.categoriesList.length - 1),
            goodsName: this.valueName,
            kind: this.goodsKind,
            packagingType: this.packagingType,
            price: this.valuePrice,
            size: this.valueCustomerType,
            sizeNum: this.valueWeight,
            state: "启用",
            tally: this.valueNoCustomerType
          }]
        }
      })
      // this.categoriesList = [...this.categoriesList, { goodsKind: this.valueAdd, children: [{ goodsName: this.valueName }] }]
      // this.categoriesList.forEach(item => {
      //   // console.log(typeof item.goodsKind);
      //   if (item.goodsKind === '全部商品') {
      //     item.children = [...item.children, { goodsName: this.valueName }]
      //   }
      //   if (item.goodsKind === this.goodsKind) {
      //     console.log('正确');
      //     item.children = [...item.children, { goodsName: this.valueName }]
      //   }
      //   // else {
      //   //   this.categoriesList = [...this.categoriesList, { goodsKind: this.valueAdd, children: [{ goodsName: this.valueName }] }]
      //   // }
      // });
      console.log(this.categoriesList);
      uni.setStorageSync('categoriesList', this.categoriesList)
      uni.navigateBack({
        delta: 1
      });
    }
  },
}

</script>
<style scoped lang='scss'>
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

    .type-txet {
      margin-bottom: 10px;
    }

    .type-button {
      display: flex;

      .btn {
        width: 100px;
        height: 40px;
        border-radius: 20px;
        line-height: 40px;
        border: 1px solid #e7e7e7;
        background-color: #fff;
        font-size: 16px;

        &.active {
          background: #dbfee5;
          color: #239663;
          // border-radius: 8px;
          border: 1px solid #239663;
        }
      }
    }
  }

  .goods-size {
    background-color: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;

    ::v-deep .u-input--radius.data-v-fdbb9fe6,
    .u-input--square.data-v-fdbb9fe6 {
      width: 250px;
      background-color: #f6f7fb;
    }

    .size-txet {
      margin-top: 8px;
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
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #239663;
    font-size: 30px;
    color: #fff;
  }
}
</style>