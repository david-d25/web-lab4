<template>
  <div class="start">
    <container>
      <div class="login" :class="{'loading': loading}">
        <h1>{{ $t('pages.login.title') }}</h1>

        <transition-expand>
          <div class="login__error_msg" v-if="errorMsg != null" @click="errorMsg = null">
            {{ errorMsg }}
          </div>
        </transition-expand>

        <form class="login__form" @submit.prevent="doLogin">
          <text-input class="login__input"
                      v-model="form.login"
                      :error-hint="errorHints.login"
                      @input="errorHints.login = null"
                      :hint="$t('pages.login.form.email_hint')"/>
          <text-input class="login__input"
                      v-model="form.password"
                      @input="errorHints.password = null"
                      :error-hint="errorHints.password"
                      :hint="$t('pages.login.form.password_hint')"
                      type="password"/>

          <e-button class="login_button" type="submit">{{ $t('pages.login.form.log_in_button') }}</e-button>

          <!--          <button type="button" class="button login-via-vk-button" disabled>Enter via VK (opens soon)</button>-->

          <router-link to="/password-reset" class="login__forgot_password">{{ $t('pages.login.forgot_password_link') }}</router-link>
          <div style="height: 40px;"></div>
          <div>{{ $t('pages.login.dont_have_account') }}</div>
          <router-link to="/register" class="login__register">{{ $t('pages.login.register_link') }}</router-link>
        </form>
      </div>
    </container>
  </div>
</template>

<script>
  import Container from "#/components/Container";
  import TextInput from "#/components/TextInput";
  import Button from "#/components/Button";

  import axios from 'axios';
  import TransitionExpand from "#/components/TransitionExpand";

  export default {
    components: {TransitionExpand, Container, TextInput, 'e-button': Button },
    data() {
      return {
        loading: false,
        form: {
          login: '',
          password: ''
        },
        errorHints: {
          login: null,
          password: null
        },
        errorMsg: null
      }
    },
    methods: {
      doLogin() {
        if (this.loading)
          return;

        this.errorMsg = null;

        if (this.form.login === '') {
          this.errorHints.login = this.$t('pages.login.form.empty_email_hint');
        } else if (this.form.password === '') {
          this.errorHints.password = this.$t('pages.login.form.empty_password_hint');
        } else {
          this.loading = true;

          axios.post('/api/login', {
            login: this.form.login,
            password: this.form.password
          }).then((response) => {
            let json = response.data;
            switch (json.status) {
              case "ok":
                let user = json['user'];
                setCookie("user_id", user.id, { expires: new Date(user['token_expiry']).toUTCString() });
                setCookie("user_token", user.token, { expires: new Date(user['token_expiry']).toUTCString() });
                this.$parent.user.auth = true;
                this.$parent.user.id = user.id;
                this.$parent.user.name = user.name;
                this.$parent.user.surname = user.surname;
                this.$parent.user.token = user.token;
                this.$parent.user.email = user.email;
                this.$parent.user.picture = user.picture;
                this.$parent.user.locale = user.locale;

                let redirectAddr = this.$route.query['redirect'];
                if (redirectAddr)
                  this.$parent.$router.push({ path: decodeURI(redirectAddr) });
                else
                  this.$parent.$router.push({ path: '/queues' });
                break;

              case "error":
                switch (response.data['err_msg']) {
                  case "login_failed":
                    this.errorMsg = this.$t('pages.login.errors.login_failed');
                    break;

                  case "data_not_full":
                    this.errorMsg = this.$t('pages.login.errors.data_not_full');
                    break;

                  default:
                    this.errorMsg = this.$t('pages.login.errors.default_error', [response.data['err_msg']]);
                    break;
                }
                break;

              case "internal_error":
                this.errorMsg = this.$t('pages.login.errors.internal_error', [response.data['err_msg']]);
                break;

              default:
                this.errorMsg = this.$t('pages.login.errors.unexpected_response', [response.data['status']]);
                break;
            }
          }).catch((error) => {
            if (error.response) {
              this.errorMsg = this.$t('pages.login.errors.default_error', [error.response.status]);
            } else if (error.request) {
              this.errorMsg = this.$t('common.you_are_offline');
            } else {
              this.errorMsg = this.$t('common.unknown_error');

              console.error(error);
            }
          }).finally(() => {
            this.loading = false;
            this.form.password = '';
          });
        }
      }
    }
  }
</script>

<style scoped>
  .start {
    margin: 20px 0;
    text-align: center;
  }

  .login {
    text-align: center;
    display: inline-block;
  }

  .login__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login__input {
    margin-bottom: 10px;
    width: 250px;
  }

  .login_button {
    margin-bottom: 10px;
    width: 250px;
  }

  .login__error_msg {
    color: #c20000;
    margin: 10px 0;
  }
</style>