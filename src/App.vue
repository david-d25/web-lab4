<template>
  <div class="root">
    <e-header ref="header"/>
    <toaster ref="toaster"/>
    <router-view :key="this.$route.fullPath"/>
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
  import axios from 'axios';

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
      locale(newValue) {
        this.$i18n.locale = newValue;
        localStorage.setItem('locale', newValue);
      },
      'user.token': {
        handler: function (newValue) {
          if (newValue == null)
            localStorage.removeItem('user.token');
          else
            localStorage.setItem('user.token', newValue);
        },
        deep: true
      },
      'user.email': {
        handler: function (newValue) {
          if (newValue == null)
            localStorage.removeItem('user.email');
          else
            localStorage.setItem('user.email', newValue);
        },
        deep: true
      }
    },
    components: {
      'e-header': Header,
      'toaster': Toaster,
      VueRouter
    },
    methods: {
      bootstrap() {
        let locale = localStorage.getItem('locale');
        if (locale)
          this.locale = locale;

        let email = localStorage.getItem('user.email');
        let token = localStorage.getItem('user.token');
        if (email && token) {
          axios.post('/api/bootstrap', {
            login: email, token
          }).then((response) => {
            this.user.name = response.data.name;
            this.user.email = email;
            this.user.token = token;
            this.user.auth = true;
          }).catch((error) => {
            if (error.response) {
              let status = +error.response.status;

              if (status === 401) {
                localStorage.removeItem('user.email');
                localStorage.removeItem('user.token');
                this.$router.replace({ path: '/login' });
              }
            }
          }).finally(() => {
            onAppLoaded();
          });
        } else {
          onAppLoaded();
        }
      }
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

      this.bootstrap();
    },
    router,
    i18n
  }
</script>

<style lang="scss">
  @import "styles/global";
</style>
