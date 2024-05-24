import { login } from '@/api/user';
export default {
  namespaced: true,
  state: () => ({
    token: uni.getStorageSync('token') || '',
    userInfo: uni.getStorageSync('userInfo') || {},
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      uni.setStorageSync('token', token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      uni.setStorageSync('userInfo', userInfo);
    },
  },
  actions: {
    login(context, userProfile) {
      return new Promise((resolve, reject) => {
        login({
          signature: userProfile.signature,
          iv: userProfile.iv,
          nickName: userProfile.userInfo.nickName,
          gender: userProfile.userInfo.gender,
          city: userProfile.userInfo.city,
          province: userProfile.userInfo.province,
          avatarUrl: userProfile.userInfo.avatarUrl,
        }).then((res) => {
          const { token } = res.data;
          context.commit('setToken', token);
          context.commit('setUserInfo', userProfile.userInfo);
          resolve(res);
        });
      });
    },
    logout(context) {
      context.commit('setToken', '');
      context.commit('setUserInfo', {});

      uni.removeStorageSync('token');
      uni.removeStorageSync('userInfo');
    },
  },
};
