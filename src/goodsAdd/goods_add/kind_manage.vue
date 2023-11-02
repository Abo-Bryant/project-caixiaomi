<template>
  <view class="page">
    <u-cell-group v-for="item in leftList" :key="item.id">
      <u-cell>
        <view slot="title" class="all">
          <text class="one">{{ item.goodsKind }}</text>
          <text class="two" @click="doAmend(item.goodsKind, item.id)">修改</text>
          <text calss="three" style="color: #999999;font-size: 18px;">(共{{ item.children.length
          }}种)</text>
        </view>
        <view slot="value">
          <u-icon name="trash-fill" color="#eb2503" size="28" @click="doDel"></u-icon>
        </view>
      </u-cell>
    </u-cell-group>
    <view class="footer">
      <view class="add" @click="doAdd">新增分类</view>
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
    <!-- 修改分类 -->
    <view class="goods-add">
      <u-modal :show="addshow" title="修改分类" showCancelButton @cancel="amendCancel" @confirm="amendConfirm">
        <view class="slot-content">
          <!-- <rich-text :nodes="'123456'"></rich-text> -->
          <u--input placeholder="请输入内容" border="surround" v-model="valueAmend"></u--input>
        </view>
      </u-modal>
    </view>
  </view>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      idAmend: '',
      valueAmend: '',
      categoriesList: [],
      leftList: [],
      addshow: false,
      valueAdd: '',
    }
  },
  onLoad () {
    this.getcategoriesList()
  },
  onShow () {
    this.getcategoriesList()
  },
  methods: {
    getcategoriesList () {
      this.categoriesList = uni.getStorageSync('categoriesList')
      // console.log(this.categoriesList);
      this.leftList = this.categoriesList.filter((item, index) => {
        return index !== 0
      })
      console.log(this.leftList);
    },
    // 点击修改
    doAmend (goodsKind, id) {
      console.log('修改', goodsKind);
      this.addshow = true
      this.valueAmend = goodsKind
      this.idAmend = id
    },
    // 修改弹出框的取消
    amendCancel () {
      this.addshow = false
    },
    // 修改弹出框的确认
    amendConfirm () {
      // console.log(this.categoriesList);
      this.leftList.forEach(item => {
        if (item.id === this.idAmend) {
          item.goodsKind = this.valueAmend
        }
      })
      this.categoriesList.forEach(item => {
        // console.log(item);
        if (item.id === this.idAmend) {
          item.goodsKind = this.valueAmend
        }
      })
      console.log(this.categoriesList);
      uni.setStorageSync('categoriesList', this.categoriesList)
      this.addshow = false
    },
    // 点击删除的icon
    doDel () {
      console.log('删除');
    },
    // 点击新增
    doAdd () {
      console.log('新增');
      this.addshow = true
    },
    // 新增弹出框的取消
    addCancel () {
      this.addshow = false
    },
    // 新增弹窗框的确认
    addConfirm () {
      // console.log(this.valueAdd);
      this.addshow = false
      this.goodsKind = this.valueAdd
      this.leftList.push({ goodsKind: this.valueAdd, id: String(this.categoriesList.length), pid: '', children: [] })
      this.categoriesList = [...this.categoriesList, { goodsKind: this.valueAdd, id: String(this.categoriesList.length), pid: '', children: [] }]
      // console.log(this.categoriesList);
      uni.setStorageSync('categoriesList', this.categoriesList)
    },
  },
}

</script>
<style scoped lang='scss'>
.page {
  height: 600px;
  position: relative;

  .all {
    font-size: 20px;
    position: relative;

    .one {}

    .two {
      position: absolute;
      bottom: 0;
      right: 20px;
      font-size: 18px;
      color: #41b883;

      // margin-left: 5px;
      // font-size: 18px;
      // color: #8e8e8f;
      // margin-right: 125px;
    }

    .three {
      margin-left: 5px;
      font-size: 18px;
      color: #8e8e8f;
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

  .footer {
    position: absolute;
    bottom: 10px;
    left: 0;
    height: 50px;
    width: 100%;
    background-color: #fff;

    .add {
      margin-top: 5px;
      margin-left: 10%;
      width: 80%;
      height: 40px;
      border: 1px solid #41b883;
      border-radius: 20px;
      line-height: 40px;
      text-align: center;
      color: #41b883;
    }

  }
}
</style>