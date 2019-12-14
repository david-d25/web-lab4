<template>
  <div class="toast" :state-visible="show" @click="hideToast" :style="{ backgroundColor: toastBgColor, borderColor: toastBorderColor }">
    <div class="toast__content">{{ text }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        text: '',
        toastBgColor: '#ffffff',
        toastBorderColor: '#ffffff',
        hideTimeoutId: null,
        typeBgColors: {
          'red': '#ffb5b5',
          'green': '#a7ffab',
          'white': '#ffffff'
        },
        typeBorderColors: {
          'red': '#c47272',
          'green': '#85c78e',
          'white': '#dddddd'
        }
      }
    },
    methods: {
      toast(text, options) {
        if (typeof options == "string") // If given a string, it will be used for 'type' parameter
          options = { type: options };

        let defaultOptions = {
          type: 'white',
          timeout: 4000
        };

        options = {...defaultOptions, ...options};

        this.hideToast();

        this.text = text;
        this.show = true;
        this.toastBorderColor = this.typeBorderColors[options.type] ? this.typeBorderColors[options.type] : '#ffffff';
        this.toastBgColor = this.typeBgColors[options.type] ? this.typeBgColors[options.type] : '#ffffff';

        this.hideTimeoutId = setTimeout(this.hideToast, options.timeout);
      },
      hideToast() {
        this.show = false;

        if (this.hideTimeoutId)
          clearTimeout(this.hideTimeoutId);
        this.hideTimeoutId = null;
      }
    },
    mounted() {
      this.$setToaster(this);
    }
  };
</script>

<style scoped lang="scss">
  .toast {
    width: 320px;
    position: fixed;
    bottom: -100%;
    text-align: center;
    padding: 10px 15px;
    border-radius: 10px;
    border-width: 1px;
    border-style: solid;
    z-index: 999999;
    left: 0;
    right: 0;
    margin: auto;
    transition: bottom 500ms;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);

    &[state-visible="true"] {
      bottom: 5vh;
    }
  }

  @media (max-width: 480px) {
    .toast {
      width: 90vw;
    }
  }
</style>
