<template>
  <view class="video-item">
    <view class="video-item-cover">
      <video
        object-fit="cover"
        id="myvideo"
        class="video"
        :src="data.play_url"
        enable-danmu
        danmu-btn
        muted
        :controls="false"
        :show-center-play-btn="false"
      ></video>
      <view class="video-cover-icon">
        <view>
          <view>
            <uni-icons type="videocam" color="#fff" />
            <text class="video-play-count">{{ data.fmplaycnt_2 }}</text>
          </view>
        </view>
        <view>
          <view
            ><uni-icons type="heart" color="#fff" />
            <text>{{ data.like }}</text>
          </view>
          <view style="margin-left: 8px"
            ><uni-icons type="chatboxes" color="#fff" /><text>{{
              data.comment
            }}</text></view
          >
        </view>
      </view>
    </view>
    <view class="video-item-info">
      <view class="line-clamp-2" style="height: 44px">
        <text>{{ data.title }}</text>
      </view>
      <view class="video-item-info-footer">
        <view class="video-author-avatar">
          <image class="img" :src="data.author_avatar" />
        </view>

        <view class="video-author-name">{{ data.source_name }}</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.video-item {
  width: 100%;
  height: 100%;
  background-color: $uni-bg-color;

  .video-item-cover {
    height: 140px;
    position: relative;
  }

  .video-item-info {
    box-sizing: border-box;
    padding: 8px;
    display: flex;
    flex-direction: column;
    .video-item-info-footer {
      display: flex;
      align-items: center;
      color: #ccc;
      padding-top: 8px;
      .video-author-avatar {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 40px;
        overflow: hidden;
      }
    }
  }
}
.video-cover-icon {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 12px;
  padding-bottom: 4px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  color: #fff;
  > view {
    &:last-child {
      display: flex;
      color: 10px;
      align-items: center;
    }
  }
}
.video-play-count {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
