<template>
  <view>
    <!-- 用户信息 -->
    <view class="userinfo">
      <!-- 头像 -->
      <view class="image"><u--image src="https://cdn.uviewui.com/uview/album/1.jpg" width="80px" height="80px"
          shape="circle"></u--image></view>
      <!-- 名字 -->
      <view class="text">
        <h1 class="text-name">大发行</h1>
        <view class="text-num">13554250247</view>
      </view>
      <!-- 修改icon -->
      <view><u-icon name="edit-pen-fill" color="#fbfefd" size="28"></u-icon></view>
      <!-- 会员中心 -->
      <view class="member">
        <image class="mem-iamge" src="../../static/vip.jpeg" mode="aspectFit" />
        <view class="mem-text">
          <view class="mem-name">会员中心</view>
          <view class="mem-num"> 体验会员将于今天到期</view>
        </view>
        <view class="mem-vip">
          <view class="vip-text">立即开通VIP会员</view>
          <u-icon class="icon" name="arrow-right" color="#40425b" size="14"></u-icon>
        </view>
      </view>
    </view>

    <!-- 订单导航 -->
    <view class="nav">
      <view class="nav-item" v-for="item in nav_list" :key="item.type">
        <navigator url="/goodsAdd/goods_add/goods_manage">
          <u-icon size="50rpx" :name="item.icon"></u-icon>
          <text class="nav-text">{{ item.title }}</text>
        </navigator>
      </view>
    </view>
    <!-- 单元格 -->
    <view class="cell">
      <u-cell-group>
        <u-cell title="赊账安全服务" isLink url="/pages/componentsB/tag/tag"></u-cell>
        <u-cell title="设置" isLink url="/pages/componentsB/badge/badge" value="语音提示、资费设置、连接打印机"></u-cell>
      </u-cell-group>
      <!-- <button type="warn" plain>退出登录</button> -->
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      nav_list: [
        { type: 1, icon: 'order', title: '员工管理' },
        { type: 2, icon: 'rmb-circle', title: '货品管理' },
        { type: 3, icon: 'car', title: '配件商城' },
        // { type: 4, icon: 'reload', title: '退货/退款' },
      ],
    };
  },

  methods: {
    doSomeThing (e) {
      // console.log(e);
      if (e === 2) {
        console.log('进入货品管理页面');
        uni.navigateTo({
          url: '../../goodsAdd/goods_manage/index.vue',
          success () {
            console.log("跳转成功")
          },
          fail () {
            console.log("跳转失败");
          }

        });
      }
    }
    // chooseAvatar(e) {
    //   console.log(e);
    // },
    // getNickname(e) {
    //   console.log(e);
    // },
    // async wxlogin() {
    //   // console.log(this.$store.state.user.token);
    //   // // 组件里调用模块里面的 mutation，格式： 模块名/mutation名
    //   // this.$store.commit('user/setToken', 456);

    //   // 微信小程序自己的登录
    //   const res = await uni.login();
    //   console.log(res[1]);

    //   const res2 = await uni.getUserInfo();
    //   console.log(res2[1]);

    //   // data是我们自己开发服务器需要的 请求参数
    //   const data = {
    //     code: res[1].code,
    //     encryptedData: res2[1].encryptedData,
    //     rawData: res2[1].rawData,
    //     iv: res2[1].iv,
    //     signature: res2[1].signature,
    //   };

    //   console.log(data);
    //   const res3 = await uni.$u.http.post('/users/wxlogin', data);
    //   console.log(res3);
    //   // 个人的appid账号原因，导致请求会失败，我们可以在下面写假数据
    //   this.$store.commit('user/setToken', res3.data.message.token);
    //   // this.$store.commit('user/setToken', 'asdfasdfsad.sdfasdf.asdfasd');
    // },
    // async testToken() {
    //   // /my/orders/all
    //   const res3 = await uni.$u.http.get('/my/orders/all', { params: { type: 1 } });
    //   console.log(res3);
    // },
  },
};
</script>

<style lang="scss">
// 页面背景
page {
  background-color: #f4f5f7;
}

// 用户信息
.userinfo {
  height: 150rpx;
  position: relative;
  display: flex;
  padding: 0 20px 30px;
  background-color: #40425b;
  margin-bottom: 80px;

  .image {
    margin-right: 25px;
  }

  .text {
    margin-right: 100px;

    .text-name {
      font-size: 30px;
      color: #fbfefd;
      font-weight: 600;
      margin-bottom: 15px;
    }

    .text-num {
      font-size: 15px;
      color: #fbfefd;
      font-weight: 500;
    }
  }

  .member {
    height: 60px;
    width: 320px;
    background-color: #ffffff;
    border-radius: 10px;
    position: absolute;
    top: 85px;
    left: 13px;
    display: flex;
    padding: 10px 15px;

    .mem-iamge {
      margin-right: 5px;
      width: 50px;
      height: 50px;
    }

    .mem-text {
      .mem-name {
        font-size: 20px;
        color: #242424;
        font-weight: 400;
        margin-bottom: 5px;
      }

      .mem-num {
        font-size: 14px;
        color: #636363;
        font-weight: 500;
      }
    }

    .mem-vip {
      font-size: 12px;
      // text-align: center;
      margin-left: 15px;
      display: flex;

      .vip-text {
        margin-top: 21px;
        color: #dd925e;
      }
    }

    // margin-left: 12px;
  }

}

.nickname {
  color: #fff;
  margin-top: 20rpx;
  text-shadow: 2rpx 2rpx 10rpx #333;
  text-align: center;
}


// 导航列表
.nav {
  margin-top: 50rpx;
  background-color: #fff;
  border-radius: 15rpx;
  height: 144rpx;
  display: flex;
  justify-content: space-around;

  .nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .nav-text {
      font-size: 26rpx;
      margin-top: 16rpx;
      color: #474747;
    }
  }
}

// 单元格
.cell {
  margin-top: 20rpx;
  background-color: #fff;
  border-radius: 15rpx;

  // height: 520rpx;
  .cell-title {
    position: relative;

    .cell-button {
      // 透明度为 0
      opacity: 0;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
}
</style>
