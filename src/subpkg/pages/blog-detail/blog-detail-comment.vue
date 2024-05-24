<template>
  <view class="comment-limit-container">
    <view v-if="!isShowMore">
      <block v-for="(item, index) in list" :key="index">
        <view class="comment-item">
          <view class="comment-item-avatar">
            <image class="img" :src="item.info.avatar" />
          </view>
          <view class="comment-item-content">
            <view class="comment-item-author">
              {{ item.info.userName }}
            </view>
            <view class="comment-item-text">
              {{ item.info.content }}
            </view>
            <view class="comment-item-time">{{ item.info.postTime }}</view>
          </view>
        </view>
      </block>
    </view>
    <mescroll-body
      v-show="isShowMore"
      ref="mescrollRef"
      :down="{ use: false }"
      :up="{ auto: false, textNoMore: '没有更多评论了' }"
      @init="mescrollInit"
      @up="upCallback"
    >
      <block v-for="(item, index) in list" :key="index">
        <view class="comment-item">
          <view class="comment-item-avatar">
            <image class="img" :src="item.info.avatar" />
          </view>
          <view class="comment-item-content">
            <view class="comment-item-author">
              {{ item.info.userName }}
            </view>
            <view class="comment-item-text">
              {{ item.info.content }}
            </view>
            <view class="comment-item-time">{{ item.info.postTime }}</view>
          </view>
        </view>
      </block>
    </mescroll-body>
    <view class="show-more" v-if="!isShowMore" @click="onMoreClick">
      查看更多评论
    </view>
  </view>
</template>
<script>
import MescrollMixin from '/node_modules/mescroll-uni/mescroll-mixins.js';
import { getComments } from '@/api/detail.js';
export default {
  props: {
    articleId: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    page: 1,
    pageSize: 5,
    allList: [],
    isShowMore: false,
    isInit: true,
    mescroll: null,
    total: 0,
  }),
  computed: {
    list() {
      if (this.isShowMore) {
        return this.allList;
      }
      return this.allList.slice(0, 2);
    },
  },
  created() {
    this.getCommentsData();
  },
  mounted() {
    this.mescroll = this.$refs.mescrollRef.mescroll;
  },
  mixins: [MescrollMixin],
  methods: {
    getCommentsData() {
      getComments({
        articleId: this.articleId,
        page: this.page,
        size: this.pageSize,
      }).then((res) => {
        if (this.page === 1) {
          this.allList = res.data.list;
        } else {
          this.allList = this.allList.concat(res.data.list);
        }
        this.total = res.data.count;
        this.isInit = false;
        this.mescroll.endSuccess();
        this.mescroll.endBySize(this.allList.length, this.total);
      });
    },
    onMoreClick() {
      this.isShowMore = true;
    },
    mescrollInit() {
      this.getCommentsData();
    },
    upCallback() {
      if (this.isInit) {
        return;
      }
      this.page++;
      this.getCommentsData();
      this.mescroll.endSuccess();
    },
  },
};
</script>
<style lang="scss" scoped>
.comment-item {
  display: flex;
  overflow: hidden;
  margin-top: 12px;
  .comment-item-avatar {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    overflow: hidden;
    margin-top: 8px;
    margin-right: 12px;
    background-color: #ccc;
  }

  .comment-item-content {
    flex: 1;
    overflow: hidden;
    .comment-item-author {
      font-size: 16px;
      color: #999;
    }
    .comment-item-text {
      margin: 4px 0;
    }
    .comment-item-time {
      font-size: 14px;
      color: #999;
    }
  }
}
.show-more {
  width: 100%;
  text-align: center;
  margin: 12px 0;
  color: $uni-color-primary;
}
</style>
