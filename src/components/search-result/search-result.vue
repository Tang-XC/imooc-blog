<template>
  <view class="search-result">
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
    >
      <block v-for="(item, index) in searchResult" :key="index">
        <view class="search-result-item">
          <view class="item-title">
            <view v-html="item.title"></view>
          </view>
          <view
            class="item-content"
            :class="{
              hasOneImg: item.pic_list && item.pic_list.length <= 1,
              hasMoreImg: item.pic_list && item.pic_list.length > 1,
            }"
          >
            <view class="item-content-text">
              <view class="line-clamp-2" v-html="item.description"> </view>
              <view
                class="item-footer"
                v-if="
                  (item.pic_list && item.pic_list.length <= 1) || !item.pic_list
                "
              >
                <view>
                  {{ item.nickname }}
                </view>
                <view class="item-footer-time">
                  <uni-icons type="compose" size="20"></uni-icons>
                  <text>{{ item.created_at }}</text>
                </view>
              </view>
            </view>
            <view class="item-content-img" v-if="item.pic_list">
              <view v-for="(img, imgIndex) in item.pic_list">
                <image class="img" :src="img" mode="aspectFill" />
              </view>
            </view>
            <view
              class="item-footer"
              v-if="item.pic_list && item.pic_list.length > 1"
            >
              <view>
                {{ item.nickname }}
              </view>
              <view class="item-footer-time">
                <uni-icons type="compose" size="20"></uni-icons>
                <text>{{ item.created_at }}</text>
              </view>
            </view>
          </view>
        </view>
      </block>
    </mescroll-body>
  </view>
</template>
<script>
import MescrollMixin from '/node_modules/mescroll-uni/mescroll-mixins.js';
import { getSearchResult } from '@/api/hot.js';
export default {
  props: {
    searchValue: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    searchResult: [],
    page: 1,
    isInit: true,
    mescroll: null,
  }),
  created() {
    this.getSearchResultData();
  },
  mounted() {
    this.mescroll = this.$refs.mescrollRef.mescroll;
  },
  mixins: [MescrollMixin],
  methods: {
    getSearchResultData() {
      if (this.searvhValue === '') return;
      getSearchResult({
        q: this.searchValue,
        p: this.page,
      }).then((res) => {
        const result = res.data.list.map((item) => {
          item.title = item.title.replace(
            this.searchValue,
            `<span style="color:orange;padding:0px 4px">${this.searchValue}</span>`
          );
          return item;
        });
        if (this.page === 1) {
          this.searchResult = result;
        } else {
          this.searchResult = [...this.searchResult, ...result];
        }
        this.isInit = false;
        this.mescroll.endSuccess();
      });
    },
    mescrollInit() {
      this.getSearchResultData();
    },
    downCallback() {
      if (this.isInit) return;
      this.page = 1;
      this.getSearchResultData();
      this.mescroll.endSuccess();
    },
    upCallback() {
      if (this.isInit) return;
      this.page++;
      this.getSearchResultData();
      this.mescroll.endSuccess();
    },
  },
};
</script>
<style lang="scss" scoped>
.search-result {
}
.search-result-item {
  margin-bottom: 12px;
}
.item-title {
  font-size: 16px;
  font-weight: 500;
}
.item-content {
  font-size: $uni-font-size-base;
  color: $uni-text-color-grey;
  margin: 4px 0px;
}
.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-footer-time {
    max-width: 33%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.item-content-img {
  display: flex;
  margin-bottom: 4px;
  view {
    flex: 1;
    margin: 0 8px;
    width: 100%;
    height: 70px;
  }
}
.hasOneImg {
  display: flex;
  align-items: center;
  width: 100%;
  .item-content-text {
    flex: 1;
  }
  .item-content-img {
    width: 40%;
  }
}
.hasMoreImg {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
