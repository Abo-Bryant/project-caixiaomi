<template>
  <view class="ugo-search">
    <!-- 自己去官网里面查找需要的一些属性 -->
    <u-search
      placeholder="搜索"
      :showAction="false"
      inputAlign="center"
      v-model="keyword"
    ></u-search>
  </view>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      keyword: '',
    };
  },
};
</script>

<style lang="scss">
.ugo-search {
  padding: 10rpx 25rpx;
  background-color: #ea4350;
}
</style>
