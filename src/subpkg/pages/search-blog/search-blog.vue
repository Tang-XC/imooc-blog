<template>
  <view class="search-blog">
    <view class="search-bar-box">
      <search
        :isShowInput="true"
        :placeholder="defaultPlaceholder"
        v-model="searchVal"
        :config="{
          backgroundColor: '#f1f0f3',
        }"
        @confirm="onSearchConfirm"
      />
    </view>
    <view class="search-result-box" v-if="isShowResult">
      <search-result ref="mescrollItem" :searchValue="searchVal" />
    </view>
    <view v-else>
      <view class="search-history-box">
        <view class="search-title">
          <text>搜索历史</text>
          <view class="search-history-clear" @click="onClearHistory">
            <uni-icons type="trash" size="24"></uni-icons>
          </view>
        </view>
        <search-history
          :history="searchHistory"
          @delete="deleteSearchHistory"
          @click="onSearchConfirm"
        />
      </view>
      <view class="search-hot-box">
        <view class="search-title"><text>热搜榜</text> </view>
        <search-hot @onSearch="onSearchConfirm" />
      </view>
    </view>
  </view>
</template>
<script>
import MescrollMixin from '/node_modules/mescroll-uni/mixins/mescroll-comp.js';
import { getDefaultText } from '@/api/hot.js';
export default {
  mixins: [MescrollMixin],
  data: () => ({
    searchVal: '',
    defaultPlaceholder: '请输入搜索内容',
    searchHistory: uni.getStorageSync('searchHistory') || [],
    isShowResult: false,
  }),
  created() {
    this.getDefaultPlaceholder();
  },
  methods: {
    onSearchConfirm(val) {
      const value = val.trim();
      if (value === '') {
        this.searchVal = this.defaultPlaceholder;
      } else {
        this.searchVal = value;
      }
      this.saveSearchHistory(value);
      this.isShowResult = true;
    },
    getDefaultPlaceholder() {
      getDefaultText().then((res) => {
        this.defaultPlaceholder = res.data.defaultText;
      });
    },
    saveSearchHistory(val) {
      const value = val.trim();
      if (value === '') return;
      if (this.searchHistory.includes(value)) {
        this.searchHistory.splice(this.searchHistory.indexOf(value), 1);
      }
      this.searchHistory.unshift(value);
      if (this.searchHistory.length > 10) {
        this.searchHistory.pop();
      }
    },
    deleteSearchHistory(val) {
      this.searchHistory.splice(this.searchHistory.indexOf(val), 1);
    },

    onClearHistory() {
      uni.showModal({
        title: '提示',
        content: '确定清空历史记录吗？',
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            this.searchHistory = [];
          }
        },
      });
    },
  },
  watch: {
    searchHistory(val) {
      uni.setStorageSync('searchHistory', val);
    },
  },
};
</script>
<style scoped lang="scss">
.search-blog {
  padding: 0 12px;
}
.search-bar-box {
  position: sticky;
  top: 0px;
  background-color: $uni-bg-color;
  z-index: 999;
}
.search-title {
  font-size: 16px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
.search-history-clear {
}
</style>
