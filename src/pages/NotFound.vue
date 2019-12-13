<template>
  <div class="not_found_page">
    <div class="error_code -color-dark">404</div>
    <div class="error_msg -color-dark">{{ $t('pages.not_found.comment') }}</div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$parent.$refs.header.setTitle('7H1$ 1$ F13K$');
    }
  }
</script>

<style scoped>
  .not_found_page {
    padding-top: 25px;
    text-align: center;
  }

  .error_code {
    font-size: 58px;
  }

  .error_msg {
    font-size: 36px;
  }
</style>
