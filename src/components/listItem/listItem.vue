<template>
  <view class="listItem">
    <view class="item-left">
      <image class="img" :src="getRankingBg"></image>
      <text class="ranking" v-if="ranking <= 3">{{ ranking }}</text>
    </view>
    <view class="item-content">
      <view class="item-title">{{ data.title }}</view>
      <view class="item-desc line-clamp-2">{{ data.desc }}</view>
      <view class="item-footer">
        <view class="item-author">{{ data.nickname }}</view>
        <view class="item-heat">
          <view class="item-heat-icon">
            <image class="img" src="@/static/images/tab-icons/hot-active.png" />
          </view>
          <text>{{ data.views }}热度</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    ranking: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getRankingBg() {
      if (this.ranking <= 3) {
        return require(`@/static/images/ranking-${this.ranking}.png`);
      }
      return require(`@/static/images/ranking-other.png`);
    },
  },
};
</script>
<style lang="scss" scoped>
.listItem {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  // margin-bottom: 12px;
  border-bottom: 1px solid $uni-border-color;
  .item-left {
    width: 24px;
    height: 24px;
    position: relative;
    .ranking {
      position: absolute;
      z-index: 99;
      top: 0;
      left: 50%;
      transform: translateX(-55%);
      color: #fff;
    }
  }
  .item-content {
    flex: 1;
    overflow: hidden;
    .item-title {
      font-size: $uni-font-size-lg;
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .item-desc {
      font-size: $uni-font-size-base;
      color: $uni-text-color-grey;
    }
    .item-footer {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: $uni-font-size-base;
      color: $uni-text-color-grey;
      .item-heat {
        display: flex;
        align-items: center;
        color: orangered;
      }
    }
  }
}
.item-heat-icon {
  width: 18px;
  height: 18px;
  overflow: hidden;
  margin-right: 4px;
}
</style>
