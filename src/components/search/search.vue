<template>
  <view class="search">
    <uni-search-bar
      class="search-bar"
      v-if="isShowInput"
      :bgColor="config.backgroundColor"
      :placeholder="placeholder"
      :value="value"
      radius="20"
      cancelText="返回"
      @confirm="onConfirm"
      @cancel="onCancel"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @clear="onClear"
    >
    </uni-search-bar>
    <view class="search-box" v-else>
      <view class="search-icon">
        <image class="img" src="@/static/images/search.png" />
      </view>
      <view>
        {{ placeholder }}
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    isShowInput: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容',
    },
    config: {
      type: Object,
      default: () => ({
        height: 36,
        icon: '/static/images/search.png',
        textColor: '#454545',
        border: '1px solid #c9c9c9',
        backgroundColor: '#fff',
      }),
    },
  },
  methods: {
    onFocus() {
      this.$emit('focus', this.value);
    },
    onBlur() {
      this.$emit('blur', this.value);
    },
    onInput(val) {
      this.$emit('input', val);
    },
    onConfirm() {
      this.$emit('confirm', this.value);
    },
    onCancel(e) {
      this.$emit('cancel', this.value);
    },
    onClear(e) {
      this.$emit('clear', this.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-box {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border: 1px solid #ccc;
}
.search-icon {
  width: 30px;
  height: 30px;
}
.search-bar {
  width: 100%;
}
</style>
