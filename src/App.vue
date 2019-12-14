<template>
  <div class="root">
    <e-header ref="header"></e-header>
    <toaster ref="toaster"></toaster>
    <router-view :key="this.$route.fullPath"></router-view>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueRouter from "vue-router";

  import Header from "./components/Header";

  import VueI18n from 'vue-i18n';

  import i18n_ru_RU from '@/i18n/ru_RU.js';
  import i18n_en_US from '@/i18n/en_US.js';
  import Login from "#/pages/Login";
  import Main from "#/pages/Main";
  import NotFound from "#/pages/NotFound";
  import Register from "#/pages/Register";
  import PasswordReset from "#/pages/PasswordReset";
  import Toaster from "#/components/Toaster";
  import ToasterPlugin from "#/plugins/ToasterPlugin";

  Vue.use(VueRouter);
  Vue.use(ToasterPlugin);
  Vue.use(VueI18n);

  const routes = [
    { path: '/',                redirect: '/login'        },
    { path: '/login',           component: Login          },
    { path: '/register',        component: Register       },
    { path: '/password-reset',  component: PasswordReset  },
    { path: '/main',            component: Main           },
    { path: '*',                component: NotFound       },
  ];

  let router = new VueRouter({
    mode: 'history',
    routes
  });

  router.beforeEach((to, from, next) => {
    if (window.appLoaded)
      next();
    else {
      document.addEventListener("app-loaded", function () {
        next();
      })
    }
  });

  let messages = {
    'en_US': i18n_en_US,
    'en': i18n_en_US,
    'ru_RU': i18n_ru_RU,
    'ru': i18n_ru_RU
  };

  let locale = 'en_US';

  const i18n = new VueI18n({
    locale: locale,
    fallbackLocale: 'en_US',
    messages
  });

  function onAppLoaded() {
    window.appLoaded = true;
    document.getElementById("preloader").outerHTML = "";
    setTimeout(() => {document.dispatchEvent(new Event("app-loaded"))}, 0);
  }

  export default {
    data () {
      return {
        locale: 'en_US',
        user: {
          auth: false,
          id: null,
          name: null,
          token: null,
          email: null
        },
        checkingRegex: {
          user: {
            name: /^[A-Za-zА-Яа-я]{2,50}$/,
            surname: /^[A-Za-zА-Яа-я]{2,50}$/,
            password: /^.{8,4096}$/
          },
        }
      }
    },
    watch: {
      locale(val) {
        this.$i18n.locale = val;
      }
    },
    components: {
      'e-header': Header,
      'toaster': Toaster,
      VueRouter
    },
    mounted() {
      let locale = null;
      if (window.navigator.languages) {
        locale = window.navigator.languages[0];
        for (let i = 0; i < window.navigator.languages.length; i++) {
          if (messages[window.navigator.languages[i].replace("-", "_")]) {
            locale = window.navigator.languages[i].replace("-", "_");
            break;
          }
        }
      } else {
        if (messages[window.navigator.userLanguage.replace("-", "_")])
          locale = window.navigator.userLanguage;
        else if (messages[window.navigator.language.replace("-", "_")]) {
          locale = window.navigator.language;
        }
      }

      if (locale)
        this.locale = locale;

      onAppLoaded();
    },
    router,
    i18n
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    background-color: #eee;
    padding-top: 50px;
    height: 100vh;
  }

  .root {
    min-height: 100%;
    overflow: auto;
  }

  [v-cloak] {
    display: none
  }

  * {
    font-family: "Rubik", serif;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: #5797ff;
  }

  .-bg-dark {
    background-color: #2b2b2b;
  }

  .-bg-light {
    background-color: #e0e0e0;
  }

  .-color-light {
    color: #e0e0e0;
  }
  .-color-dark {
    color: #2b2b2b;
  }

  .-fill-light {
    fill: #e0e0e0;
  }
  .-fill-dark {
    fill: #2b2b2b;
  }

  .loading {
    position: relative;
    pointer-events: none;
  }

  .loading > * {
    opacity: 0.5;
  }

  .loading * {
    pointer-events: none;
    user-select: none;
  }

  .loading:after {
    display: block;
    content: '';
    background: url("/assets/img/loading.svg") center / contain no-repeat;
    width: 50px;
    height: 50px;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
