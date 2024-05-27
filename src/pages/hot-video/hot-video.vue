<template>
  <mescroll-body
    ref="mescrollRef"
    :up="{
      auto: true,
    }"
    :down="{
      auto: false,
    }"
    @init="mescrollInit"
    @down="downCallback"
    @up="upCallback"
  >
    <view class="video-list">
      <block v-for="(item, index) in list" :key="index">
        <view class="video-item-box">
          <video-item :data="item" />
        </view>
      </block>
    </view>
  </mescroll-body>
</template>
<script>
import MescrollMixin from '/node_modules/mescroll-uni/mescroll-mixins.js';

import { getVideoList } from '@/api/video.js';
export default {
  data: () => ({
    page: 1,
    size: 10,
    list: [],
    isFirst: true,
    mescroll: null,
  }),
  mixins: [MescrollMixin],

  created() {
    this.getVideoData();
  },
  mounted() {
    this.mescroll = this.$refs.mescrollRef.mescroll;
  },
  methods: {
    getVideoData() {
      getVideoList({
        page: this.page,
        size: this.size,
      }).then((res) => {
        if (this.page === 1) {
          this.list = res.data.list;
        } else {
          this.list = this.list.concat(res.data.list);
        }
        this.isFirst = false;
        this.mescroll.endSuccess();
      });
    },
    mescrollInit() {
      this.getVideoData();
    },
    upCallback() {
      if (this.isFirst) return;
      this.page++;
      this.getVideoData();
      this.mescroll.endSuccess();
    },
    downCallback() {
      if (this.isFirst) return;
      this.page = 1;
      this.getVideoData();
      this.mescroll.endSuccess();
    },
  },
};
</script>
<style lang="scss" scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 12px;
  background-color: #f8f8f8;
}
.video-item-box {
  width: 49%;
  height: auto;
  margin-bottom: 12px;
}
</style>
