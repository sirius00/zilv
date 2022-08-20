<template>
  <view class="tabbar-container">
    <block>
      <!-- 针对中间的导航栏  通过true来判断控制类名和样式 -->
      <view class="tabbar-item" v-for="(item, index) in tabbarList" :class="[item.centerItem ? 'center-item' : '']" @click="changeItem(item)" :key="index">
        <view class="item-top">
          <image :src="currentItem == item.id ? item.selectIcon : item.icon"></image>
        </view>
        <!-- 通过三元判断控制类名 达到控制选中和未选中的样式 -->
        <view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
          <text>{{ item.text }}</text>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
// 组件的书写符合easycom规范 无需引入直接使用
export default {
  props: {
    currentPage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentItem: 0,
      tabbarList: [
        {
          id: 0,
          path: '/pages/todayGoal/todayGoal',
          icon: '/static/img/message_active.png',
          selectIcon: '/static/img/message_active.png',
          // text: 'today',
          centerItem: false
        },
        {
          id: 1,
          path: '/pages/home/home',
          icon: '/static/img/dubbing.png',
          selectIcon: '/static/img/dubbing.png',
          // text: '中间',
          // 通过类名class控制样式大小
          centerItem: true
        },
        {
          id: 2,
          path: '/pages/profile/profile',
          icon: '/static/img/profile_active.png',
          selectIcon: '/static/img/profile_active.png',
          // text: '我的',
          centerItem: false
        }
      ]
    }
  },
  mounted () {
    this.currentItem = this.currentPage
    // 隐藏原来的tabBar导航栏
    uni.hideTabBar()
  },
  methods: {
    changeItem (item) {
      let _this = this
      _this.currentItem = item.id;
      uni.switchTab({
        url: item.path
      })
    }
  }
};
</script>
<style lang="less" scope>
view {
  padding: 0;
  // margin: 0;
  box-sizing: border-box;
}
.tabbar-container {
  position: fixed;
  bottom: 0rpx;
  left: 0rpx;
  width: 100%;
  height: 110rpx;
  box-shadow: 0 0 5px #999;
  display: flex;
  align-items: center;
  padding: 5rpx 0;
  color: #999999;
	background-color: #fff;

  /* 针对tabbar的统一处理 */
  .tabbar-item {
    width: 33.33%;
    height: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .item-top {
      width: 70rpx;
      height: 70rpx;
      padding: 10rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    // 未被选中的导航栏字体
    .item-bottom {
      font-size: 28rpx;
      width: 100%;
    }
    //被选中的导航栏字体
    .item-active {
      color: #f00;
    }
  }

  // 最中间的tabbar导航栏
  .center-item {
    display: block;
    position: relative;
    .item-top {
      flex-shrink: 0;
      width: 150rpx;
      height: 150rpx;
      position: absolute;
      top: -65rpx;
      left: calc(50% - 70rpx);
      // border-radius: 50%;
      // box-shadow: 0 0 5px #999;
      // background-color: rgb(240, 63, 131);
    }
    .item-bottom {
      position: absolute;
      bottom: 5rpx;
    }
    .item-active {
      position: absolute;
      bottom: 5rpx;
      color: #1fff;
    }
  }
}
</style>
