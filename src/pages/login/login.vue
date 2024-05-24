<template>
  <login @successCallback="successCallback" />
</template>
<script>
export default {
  methods: {
    successCallback() {
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>
