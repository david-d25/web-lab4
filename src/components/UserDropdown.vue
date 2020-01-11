<template>
  <div class="user" :state-expanded="expanded" v-if="user.auth" v-click-outside="() => {this.expanded = false}">
    <div class="user__face" @click="expanded = !expanded">
      <div class="user__face_picture" :style="{backgroundImage: 'url(\'' + (user.picture ? user.picture : pics.defaultUser) + '\')' }"></div>
      <div class="user__face_name">{{ user.name }}</div>
    </div>
    <transition-expand>
      <div class="user__menu_wr" v-if="expanded">
        <div class="user__menu" @click="expanded = false">
          <div class="user__menu_item -color-dark" @click="doLogout(false)">{{ $t('components.user_dropdown.log_out') }}</div>
          <div class="user__menu_item -color-dark" @click="doLogout(true)">{{ $t('components.user_dropdown.log_out_from_everywhere') }}</div>
        </div>
      </div>
    </transition-expand>
  </div>
  <div class="anonymous_menu" v-else>
    <router-link class="anonymous_menu_link -color-light" to="/login">{{ $t('components.user_dropdown.log_in') }}</router-link>
    <div class="anonymous_menu_hint -color-light">{{ $t('components.user_dropdown.or') }}</div>
    <router-link class="anonymous_menu_link -color-light" to="/register">{{ $t('components.user_dropdown.register_verb') }}</router-link>
  </div>
</template>

<script>
  import axios from 'axios';
  import defaultUserPic from '@/img/default_icons/user.svg'
  import ClickOutsideDirective from '#/directives/click_outside.js';
  import TransitionExpand from "#/components/TransitionExpand";

  export default {
    components: {TransitionExpand},
    props: ['user'],
    data() {
      return {
        expanded: false,
        pics: {
          defaultUser: defaultUserPic
        }
      }
    },
    directives: {
      'click-outside': ClickOutsideDirective
    },
    methods: {
      doLogout(fromEverywhere) {
        axios.post('/api/auth/logout', {
          login: this.user.email,
          token: this.user.token,
          fromEverywhere
        }).finally(() => {
          this.user.email = null;
          this.user.token = null;
          this.user.auth = false;
          this.$router.replace({ path: '/login' });
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~$src/styles/mobile.scss";

  .anonymous_menu {
    padding: 10px;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    font-size: .8em;
    margin-left: 20px;

    &:before {
      display: block;
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      height: 50%;
      bottom: 0;
      margin: auto;
      border-left: 1px solid grey;
    }

    @include mobile {
      display: none;
    }
  }

  .user {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: .8em;

    &:before {
      display: block;
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      height: 50%;
      bottom: 0;
      margin: auto;
      border-left: 1px solid grey;
    }
  }

  .user__face {
    padding: 10px;
    height: 100%;
    display: flex;
    cursor: pointer;
    align-items: center;

    &:hover {
      background: rgba(255, 255, 255, .1);
    }
    &:active {
      background: rgba(255, 255, 255, .2);
    }
    &:after {
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
      display: block;
      content: '';
      opacity: 0.5;
      border-right: 2px solid white;
      border-bottom: 2px solid white;
      margin: 10px;
    }
  }

  .user__face_picture {
    background-size: cover;
    border-radius: 100%;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }

  .anonymous_menu_link {
    padding: 0 5px;

    :not(:last-child) {
      margin-right: 10px;
    }
  }

  .anonymous_menu_hint {
    opacity: .5;
  }

  .user__menu_wr {
    position: absolute;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    top: 100%;
    width: 200px;
    right: 0;
  }

  .user__menu {
    display: flex;
    background: white;
    border-radius: 4px;
    padding: 5px 0;
    border: 1px solid rgba(0, 0, 0, 0.3);
    flex-direction: column;
  }

  [state-expanded='true'] {
    .user__face {
      background: rgba(255, 255, 255, .2);

      &:after {
        opacity: 1;
      }
    }
  }

  .user__menu_item {
    padding: 10px;

    &:hover {
      background: rgba(0, 0, 0, .1);
    }
  }

  @media (max-width: 900px) {
    .user__face_name {
      display: none;
    }

    .user__face_picture {
      margin: 0;
    }
  }
</style>
