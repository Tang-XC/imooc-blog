<template>
  <view class="hot">
    <view class="hot-title">
      <view class="hot-icon">
        <image class="img" src="@/static/logo.png" />
      </view>
      <text>iMooc Blog</text>
    </view>
    <view>
      <search />
    </view>
    <view style="margin-bottom: 12px" class="tab-sticky">
      <tabs
        :tabs="tabs"
        :defaultIndex="currentIndex"
        @onChange="handleTabsChange"
      />
    </view>
    <swiper
      class="swiper"
      :current="currentIndex"
      :style="{ height: currentSwiperHeight + 'px' }"
      @change="handleSwiperChange"
    >
      <swiper-item
        class="swiper-item"
        v-for="(tabItem, tabIndex) in tabs"
        :key="tabIndex"
      >
        <view>
          <uni-load-more status="loading" v-if="isLoading"></uni-load-more>
          <block v-else>
            <listItem
              :class="'hot-list-item-' + tabIndex"
              v-for="(item, index) in list[tabIndex]"
              :key="index"
              :data="item"
              :ranking="index + 1"
            />
          </block>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import { getHotTabs, getHotList } from '@/api/hot.js';

export default {
  created() {
    this.getTabsData();
    this.getListData(this.currentIndex);
  },
  data() {
    return {
      tabs: [],
      list: [],
      currentIndex: 0,
      isLoading: false,
      currentSwiperHeight: 0,
      swiperHeightData: {},
    };
  },
  methods: {
    getTabsData() {
      getHotTabs().then((res) => {
        this.tabs = res.data.list;
      });
    },
    handleTabsChange(val) {
      this.currentIndex = val;
      this.getListData(val);
    },
    getListData(type) {
      if (!this.list[this.currentIndex]) {
        this.isLoading = true;
        const id = this.tabs[type]?.id || 0;
        getHotList(id).then((res) => {
          this.list[this.currentIndex] = res.data.list;
          this.isLoading = false;
          setTimeout(() => {
            this.getCurrentSwiperHeight().then((res) => {
              this.currentSwiperHeight = res;
              this.swiperHeightData[this.currentIndex] = res;
            });
          }, 0);
        });
      } else {
        this.isLoading = false;
      }
    },
    getCurrentSwiperHeight() {
      return new Promise((resolve, reject) => {
        let sum = 0;
        const query = uni.createSelectorQuery().in(this);
        query
          .selectAll(`.hot-list-item-${this.currentIndex}`)
          .boundingClientRect((res) => {
            res.forEach((item) => {
              sum += item.height;
            });
            resolve(sum);
          })
          .exec();
      });
    },
    handleSwiperChange(e) {
      this.currentIndex = e.detail.current;
    },
  },
  watch: {
    currentIndex: {
      handler(val) {
        this.getListData(this.currentIndex);
      },
      immediate: true,
    },
  },
};
</script>
<style scoped lang="scss">
.hot {
  padding: 0 12px;
}
.hot-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}
.hot-icon {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}
.tab-sticky {
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: $uni-bg-color;
}
</style>
