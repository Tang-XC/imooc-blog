<template>
  <view class="search-history">
    <view class="search-history-wrap" v-if="history.length">
      <block v-for="(item, index) in history" :key="index">
        <view class="search-history-item" @click="onClick(item)">
          <view class="text">{{ item }}</view>
          <uni-icons
            @click="onDelete(index)"
            type="clear"
            size="24"
          ></uni-icons>
        </view>
      </block>
    </view>
    <view v-else>
      <view class="search-history-empty"> 暂无搜索记录 </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    history: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onDelete(index) {
      this.$emit('delete', index);
    },
    onClick(item) {
      this.$emit('click', item);
    },
  },
};
</script>
<style scoped lang="scss">
.search-history-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  .search-history-item {
    font-size: 0px;
    padding: 0px 8px;
    border: 1px solid $uni-border-color;
    color: $uni-text-color-grey;
    border-radius: 20px;
    margin: 4px;
    min-width: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text {
      flex: 1;
      text-align: center;
      font-size: 14px;
      margin-right: 4px;
    }
  }
}
.search-history-empty {
  width: 100%;
  text-align: center;
  color: $uni-text-color-grey;
  font-size: 14px;
}
</style>
