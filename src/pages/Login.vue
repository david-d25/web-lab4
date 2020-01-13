<template>
  <div class="start">
    <container>
      <div class="login" :class="{'loading': loading}">
        <h1 physical-body>{{ $t('pages.login.title') }}</h1>

        <transition-expand>
          <div class="login__error_msg" v-if="errorMsg != null" @click="errorMsg = null" physical-body>
            {{ errorMsg }}
          </div>
        </transition-expand>

        <transition-expand>
          <div class="login__info_msg" v-if="infoMsg != null" @click="infoMsg = null" physical-body>
            {{ infoMsg }}
          </div>
        </transition-expand>

        <div class="login__already_logged_in" v-if="$parent.user.auth" physical-body>
          <div>{{$t( 'pages.login.already_logged_in.message' )}}</div>
          <router-link to="/main">{{$t( 'pages.login.already_logged_in.to_main' )}}</router-link>
        </div>

        <form class="login__form" @submit.prevent="doLogin">
          <text-input class="login__input"
                      physical-body
                      v-model="form.login"
                      :error-hint="errorHints.login"
                      @input="errorHints.login = null"
                      :hint="$t('pages.login.form.email_hint')"/>
          <text-input class="login__input"
                      physical-body
                      v-model="form.password"
                      @input="errorHints.password = null"
                      :error-hint="errorHints.password"
                      :hint="$t('pages.login.form.password_hint')"
                      type="password"/>

          <e-button class="login_button" type="submit" physical-body>{{ $t('pages.login.form.log_in_button') }}</e-button>

          <!--          <button type="button" class="button login-via-vk-button" disabled>Enter via VK (opens soon)</button>-->

<!--          <router-link to="/password-reset" class="login__forgot_password">{{ $t('pages.login.forgot_password_link') }}</router-link>-->
          <div style="height: 40px;"></div>
          <div physical-body>{{ $t('pages.login.dont_have_account') }}</div>
          <router-link to="/register" class="login__register" physical-body>{{ $t('pages.login.register_link') }}</router-link>
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
        errorMsg: null,
        infoMsg: null
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

          axios.post('/api/auth/login', {
            login: this.form.login,
            password: this.form.password
          }).then((response) => {
            let { name, token } = response.data;
            this.$parent.user.name = name;
            this.$parent.user.token = token;
            this.$parent.user.email = this.form.login;
            this.$parent.user.auth = true;
            this.$router.push({ path: '/main' });
          }).catch((error) => {
            if (error.response) {
              let status = +error.response.status;
              let data = error.response.data;

              if (status === 500) {
                this.errorMsg = this.$t('pages.login.errors.internal_error', [error.response.status]);
              } else if (status === 400) {
                if (data['err_msg'] === 'invalid_credentials') {
                  this.errorMsg = this.$t('pages.login.errors.login_failed', [error.response.status]);
                } else {
                  this.errorMsg = this.$t('pages.login.errors.unexpected_response', [error.response.status]);
                  console.dir(data);
                }
              } else
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
    },
    mounted() {
      let { action, target, token } = this.$route.query;
      if (action === 'confirm_reg' && target && token) {
        this.loading = true;

        axios.post('/api/registration/confirmation', {
          email: target,
          token
        }).then(() => {
          this.infoMsg = this.$t('pages.login.reg_confirm.success');
        }).catch((error) => {
          if (error.response) {
            let status = +error.response.status;
            let data = error.response.data;

            if (status === 500) {
              this.errorMsg = this.$t('pages.login.errors.internal_error', [error.response.status]);
            } else if (status === 400) {
              if (data['err_msg'] === 'token_not_found') {
                this.errorMsg = this.$t('pages.login.reg_confirm.token_not_found');
              } else {
                this.errorMsg = this.$t('pages.login.errors.unexpected_response', [error.response.status]);
                console.dir(data);
              }
            } else
              this.errorMsg = this.$t('pages.login.errors.unexpected_response', [error.response.status]);
          } else if (error.request) {
            this.errorMsg = this.$t('common.you_are_offline');
          } else {
            this.errorMsg = this.$t('common.unknown_error');

            console.error(error);
          }
        }).finally(() => {
          this.loading = false;
        });
      }
    }
  }
</script>

<style scoped>
  .login__already_logged_in {
    border: 1px solid #36ff31;
    border-radius: 3px;
    background: rgba(84, 255, 71, 0.29);
    margin-bottom: 15px;
    padding: 12px;
  }

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

  .login__info_msg {
    color: #215fc2;
    margin: 10px 0;
  }
</style>