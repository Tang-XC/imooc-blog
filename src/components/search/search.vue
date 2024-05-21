<template>
  <view class="search">
    <view class="search-icon">
      <image class="img" src="@/static/images/search.png" />
    </view>
    <view>
      {{ placeholder }}
    </view>
  </view>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索内容',
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 40px;
}
.search-icon {
  width: 30px;
  height: 30px;
}
</style>
