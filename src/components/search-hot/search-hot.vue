<template>
  <view class="search-hot">
    <block v-for="(item, index) in list" :key="index">
      <view class="search-hot-item" @click="onClick(item)">
        <view class="search-ranking">
          <image class="img" :src="getRankingBg(index + 1)" />
        </view>
        <view class="search-hot-content">
          <text class="title">{{ item.label }}</text>
        </view>
        <view class="search-hotIcon" v-if="index <= 3">
          <image class="img" src="@/static/images/tab-icons/hot-active.png" />
        </view>
      </view>
    </block>
  </view>
</template>
<script>
import { getSearchHot } from '@/api/hot.js';
export default {
  data: () => ({
    list: [],
  }),
  created() {
    this.getSearchHotData();
  },
  methods: {
    getSearchHotData() {
      getSearchHot().then((res) => {
        this.list = res.data.list;
      });
    },
    getRankingBg(ranking) {
      if (ranking <= 3) {
        return require(`@/static/images/ranking-${ranking}.png`);
      }
      return require(`@/static/images/ranking-other.png`);
    },
    onClick(item) {
      this.$emit('onSearch', item.label);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-hot-item {
  display: flex;
  align-items: center;
  margin: 8px 0;
}
.search-ranking {
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.search-hotIcon {
  width: 20px;
  height: 20px;
  margin-left: 8px;
}
</style>
