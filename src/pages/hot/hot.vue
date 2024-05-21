<template>
  <view>
    <view class="hot-title">
      <view class="hot-icon">
        <image class="img" src="@/static/images/tab-icons/hot-active.png" />
      </view>
      <text>iMooc Blog</text>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      msg: 'Hello world',
    };
  },
};
</script>
<style scoped lang="scss">
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
</style>
