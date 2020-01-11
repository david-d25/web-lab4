<template>
  <div class="lang_selector" v-click-outside="() => {this.expanded = false}">
    <div class="lang_selector__label" @click="expanded = !expanded">{{ $t('components.language_selector.label') }}</div>

    <transition-expand>
      <div class="lang_selector__dropdown_wr" v-if="expanded">
        <div class="lang_selector__dropdown">
          <div class="lang_selector__item" @click="changeLanguage('en_US')">{{ $t('components.language_selector.languages.english') }}</div>
          <div class="lang_selector__item" @click="changeLanguage('ru_RU')">{{ $t('components.language_selector.languages.russian') }}</div>
        </div>
      </div>
    </transition-expand>
  </div>
</template>

<script>
  import TransitionExpand from "#/components/TransitionExpand";
  import ClickOutsideDirective from '#/directives/click_outside';

  export default {
    components: {TransitionExpand},
    data() {
      return {
        expanded: false
      }
    },
    directives: {
      'click-outside': ClickOutsideDirective
    },
    methods: {
      changeLanguage(language) {
        this.$root.$children[0]['locale'] = language;
        this.expanded = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .lang_selector {
    position: relative;
    cursor: pointer;
    font-size: .8em;
  }

  .lang_selector__label {
    display: flex;
    align-items: center;
    font-size: 16px;
    height: 100%;
    opacity: .75;
  }

  .lang_selector:hover .lang_selector__label {
    opacity: 1;
  }

  .lang_selector__label:after {
    display: block;
    content: '';
    right: -20px;
    width: 8px;
    height: 8px;
    margin: auto auto auto 10px;
    top: 0;
    bottom: 0;
    transform: translateY(-1px) rotate(45deg);
    border-bottom: 2px solid white;
    border-right: 2px solid white;
  }

  .lang_selector__dropdown_wr {
    position: absolute;
    top: 100%;
    right: -10px;
    background: white;
    color: black;
    border-radius: 4px;
    width: 200px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  .lang_selector__dropdown {
    padding: 10px 0;
  }

  .lang_selector__item {
    padding: 10px 15px;
    white-space: nowrap;

    &:hover {
      background: rgba(0, 0, 0, .15);
    }
  }
</style>