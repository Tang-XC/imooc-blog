<template>
  <view class="input-comment">
    <view class="input-bar" @click="showPopup">
      <uni-icons type="compose" size="20" style="padding-right: 8px" />
      输入评论...
    </view>
    <view class="input-icon">
      <view>
        <uni-icons type="hand-up" size="32" @click="onHandUp" />
      </view>
      <view>
        <uni-icons type="star" size="32" @click="onStar" />
      </view>
    </view>
    <uni-popup ref="popup" :mask-click="true">
      <view class="input-popup" :style="{ bottom: bottom + 'px' }">
        <view class="input-bar">
          <input class="input-popup-input" />
        </view>
        <view class="input-popup-btn">
          <button type="primary" size="mini">发送</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('user', ['token', 'userInfo']),
  },
  created() {
    uni.onKeyboardHeightChange(({ height }) => {
      this.bottom = height;
    });
  },
  data: () => ({
    bottom: 0,
  }),
  methods: {
    showPopup() {
      this.$refs.popup.open('bottom');
    },
    onHandUp() {
      if (!this.token) {
        uni.showToast({ title: '请先登录', icon: 'none' });
        setTimeout(() => {
          uni.navigateTo({ url: '/pages/login/login' });
        }, 1000);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.input-comment {
  width: 100%;
  display: flex;
  padding: 8px 12px;
  box-sizing: border-box;
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.1);

  .input-bar {
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #f1f0f3;
    border-radius: 10px;
    line-height: 40px;
    padding: 0 10px;
    margin-right: 4px;
    color: $uni-text-color-placeholder;
  }
  .input-icon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100px;
  }
  .input-popup {
    width: 100%;
    position: absolute;
    background-color: $uni-bg-color;
    padding: 8px 12px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .input-popup-btn {
    text-align: right;
    margin-top: 8px;
  }
  .input-popup-input {
  }
}
</style>
