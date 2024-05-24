<template>
  <view class="login">
    <view class="login-title">
      <image v-if="!token" class="img" src="@/static/logo.png" />
      <image v-else class="img" :src="userInfo.avatarUrl" />
    </view>
    <view class="login-name" v-if="token">
      {{ userInfo.nickName }}
    </view>
    <view class="login-action">
      <button
        class="login-action-loginBtn"
        :class="{ logout: token }"
        @click="getUserInfo"
      >
        {{ token ? '退出' : '微信用户一键登录' }}
      </button>
    </view>
  </view>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState('user', ['token', 'userInfo']),
  },
  methods: {
    ...mapActions('user', ['login', 'logout']),
    getUserInfo() {
      if (!this.token) {
        uni.showLoading({
          title: '登录中',
        });
        uni.getUserProfile({
          desc: '登录后可同步数据',
          success: (obj) => {
            this.login(obj);
            this.$emit('successCallback');
          },
          fail: () => {
            uni.showToast({
              title: '授权已取消',
              icon: 'error',
              mask: true,
            });
          },
        });
      } else {
        this.logout();
        uni.showToast({
          title: '退出成功',
          icon: 'none',
          duration: 1000,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  margin: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-title {
    width: 150px;
    height: 150px;
    margin: 40% 0 12px 0;
  }
  .login-name {
    font-size: 20px;
    margin: 0 0 24px 0;
  }
  .login-action {
    width: 100%;
    .login-action-loginBtn {
      width: 100%;
      background-color: $uni-color-primary;
      color: #fff;
    }
  }
}
.logout {
  background-color: $uni-color-error !important;
}
</style>
