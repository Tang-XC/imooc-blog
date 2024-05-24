<template>
  <view class="blog-detail" v-if="data">
    <view class="detail-title">
      {{ data.title }}
    </view>
    <view class="detail-author">
      <view class="detail-author-avatar">
        <image class="img" :src="data.avatar" />
      </view>
      <view class="detail-author-info">
        <view class="author-text">{{ data.username }}</view>
        <view class="author-date">{{ data.date }}</view>
      </view>
      <view class="detail-author-btn">
        <button size="mini">关注</button>
      </view>
    </view>
    <view class="detail-content">
      <mp-html :content="addClassFromHtml(data.content)" scroll-table />
    </view>
    <view class="detail-comment">
      <blogDetailComment
        ref="mescrollItem"
        v-if="articleId != ''"
        :articleId="articleId"
      />
    </view>
    <view class="input-comment">
      <InputComment />
    </view>
  </view>
</template>
<script>
import { getDetail } from '@/api/detail.js';
import blogDetailComment from './blog-detail-comment.vue';
import inputComment from './input-comment.vue';
import MescrollMixin from '/node_modules/mescroll-uni/mixins/mescroll-comp.js';
import InputComment from './input-comment.vue';

export default {
  components: {
    blogDetailComment,
    inputComment,
  },
  mixins: [MescrollMixin],
  data() {
    return {
      author: '',
      articleId: '',
      data: {},
    };
  },
  created() {
    this.getDetailData();
  },
  onLoad(options) {
    this.author = options.author;
    this.articleId = options.articleId;
  },
  methods: {
    getDetailData() {
      uni.showLoading({
        title: '加载中',
        mask: true,
      });
      getDetail({
        author: this.author,
        articleId: this.articleId,
      }).then((res) => {
        this.data = res.data.data;
      });
    },
    addClassFromHtml(info) {
      if (!info) return;
      return info.replace(/<blockquote>/g, '<blockquote class="blockquote">');
    },
  },
};
</script>
<style lang="scss">
@import '@/style/blog-detail.scss';
.blog-detail {
  padding: 12px;
  padding-bottom: 64px;
}
.detail-title {
  font-size: 16px;
  font-weight: 500;
}
.detail-author {
  display: flex;
  justify-content: center;
  align-items: center;
  .detail-author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 60px;
    overflow: hidden;
  }
  .detail-author-info {
    flex: 1;
    padding: 0 12px;
    .author-text {
      font-size: 14px;
      font-weight: 500;
    }
    .author-date {
      font-size: 12px;
      color: #999;
    }
  }
  .detail-author-btn {
  }
}
.detail-content {
  padding: 12px 0;
}
.input-comment {
  position: fixed;
  left: 0;
  bottom: 0px;
  width: 100%;
  background-color: $uni-bg-color;
}
</style>
