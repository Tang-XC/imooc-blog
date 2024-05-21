<template>
  <view class="tabs">
    <view class="tabs-box">
      <scroll-view
        scroll-x
        class="tabs-scroll"
        scroll-with-animation
        :scroll-left="scrollLeft"
      >
        <view class="tabs-scroll-content">
          <view class="tabs-item-box">
            <block v-for="(item, index) in tabs" :key="index">
              <view
                :id="'_tab_' + index"
                class="tabs-item"
                :class="{ 'tabs-item-active': index === activeIndex }"
                :style="{
                  color:
                    activeIndex === index
                      ? defaultConfig.activeTextColor
                      : defaultConfig.textColor,
                }"
                @click="onTabClick(index)"
                >{{ item.label }}</view
              >
            </block>
          </view>
          <view
            class="underline"
            :style="{
              transform: `translateX(${slider.left}px)`,
              width: `${defaultConfig.underlineWidth}px`,
              height: `${defaultConfig.underlineHeight}px`,
              background: `${defaultConfig.underlineColor}`,
            }"
          ></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
  },
  data: () => {
    return {
      tabList: [],
      activeIndex: 0,
      slider: {
        left: 0,
      },
      scrollLeft: 0,
      defaultConfig: {
        underlineWidth: 24,
        underlineHeight: 2,
        underlineColor: '#007aff',
        textColors: '#333333',
        activeTextColor: '#007aff',
      },
    };
  },
  methods: {
    onTabClick(index) {
      this.activeIndex = index;
      this.$emit('onChange', index);
      this.tabToIndex();
    },
    updateTabWidth() {
      /**
       * 为 tabList 的每个 item 单独额外维护一个 slider 的滑块对象
       */
      let data = this.tabList;
      if (data.length == 0) return false;

      // 获取 dom 的固定写法
      const query = uni.createSelectorQuery().in(this);
      // 循环数据源
      data.forEach((item, index) => {
        // 获取 dom 的固定写法
        query
          .select('#_tab_' + index)
          .boundingClientRect((res) => {
            // 为数据对象中每一个 item 都维护一个 _slider（滑动条） 对象
            item._slider = {
              // 当前的 tab 距离左侧的距离
              left:
                res.left +
                (res.width - this.defaultConfig.underlineWidth) / 2 -
                this.defaultConfig.underlineWidth / 2,
            };
            // 运算完成之后，执行一次 【滑块】位置运算
            if (data.length - 1 === index) {
              this.tabToIndex();
            }
          })
          .exec();
      });
    },
    tabToIndex() {
      if (this.tabList.length === 0) return;
      const index = this.activeIndex;
      this.slider = {
        left: this.tabList[index]._slider.left,
      };
      this.scrollLeft = this.activeIndex * this.defaultConfig.underlineWidth;
    },
  },
  watch: {
    config: {
      handler(val) {
        this.defaultConfig = { ...this.defaultConfig, ...val };
      },
      immediate: true,
    },
    defaultIndex: {
      handler(val) {
        console.log('defaultIndex', val);
        this.activeIndex = val;
        this.tabToIndex();
      },
      immediate: true,
    },
    tabs: {
      handler(val) {
        this.tabList = val;
        setTimeout(() => {
          this.updateTabWidth();
        }, 0);
      },
      immediate: true,
    },
  },
};
</script>
<style scoped lang="scss">
.tabs {
  font-size: $uni-font-size-base;
  height: 45px;
  line-height: 45px;
  .tabs-box {
    width: 100%;
    height: 45px;
    display: flex;
    position: relative;
    .tabs-scroll {
      white-space: nowrap;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .tabs-scroll-content {
        width: 100%;
        height: 100%;
        position: relative;
        .tabs-item-box {
          height: 100%;
          .tabs-item {
            height: 100%;
            display: inline-block;
            padding: 0 15px;
            position: relative;
            color: $uni-text-color;
          }
        }
      }
    }
  }
}
.underline {
  height: 2px;
  width: 24px;
  background: $uni-color-primary;
  border-radius: 3px;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease;
}
.tabs-item-active {
  color: $uni-color-primary !important;
}
</style>
