<template>
  <div class="register_wr">
    <container>
      <div class="register" :class="{ 'loading': loading }" v-if="!registerSuccess">
        <h1 class="register__title" physical-body>{{ $t('pages.registration.title') }}</h1>

        <transition-expand>
          <div class="register__error_msg" v-if="errorMsg != null" @click="errorMsg = null" physical-body>
            {{ errorMsg }}
          </div>
        </transition-expand>

        <form class="register__form" @submit.prevent="doRegister">
          <text-input :hint="$t('pages.registration.form.hints.name')"
                      physical-body
                      v-model="form.name"
                      class="register__input"
                      @input="errorHints.name = null"
                      :error-hint="errorHints.name"/>

          <text-input :hint="$t('pages.registration.form.hints.email')"
                      physical-body
                      type="email"
                      v-model="form.email"
                      class="register__input"
                      @input="errorHints.email = null"
                      :error-hint="errorHints.email"/>

          <text-input :hint="$t('pages.registration.form.hints.password')"
                      physical-body
                      type="password"
                      class="register__input"
                      v-model="form.password"
                      @input="errorHints.password = null"
                      :error-hint="errorHints.password"/>

          <text-input :hint="$t('pages.registration.form.hints.repeated_password')"
                      physical-body
                      type="password"
                      class="register__input"
                      @input="errorHints.repeatedPassword = null"
                      v-model="form.repeatedPassword"
                      :error-hint="errorHints.repeatedPassword"/>

          <e-button type="submit" class="register_button" green physical-body>{{ $t('pages.registration.form.submit_button') }}</e-button>

          <div style="margin-top: 25px;" physical-body>{{ $t('pages.registration.already_have_account') }}</div>
          <router-link to="/login" physical-body>{{ $t('pages.registration.login_link') }}</router-link>
        </form>
      </div>

      <div class="register" v-else>
        <h1 class="register__title register__title--green" physical-body>{{ $t('pages.registration.success.yay') }} &#x1F929;</h1>
        <div class="register__comment" physical-body>{{ $t('pages.registration.success.comment_email') }}</div>
        <div class="register__big-emoji" physical-body>&#x1F4E7;</div>
        <div class="register__comment" physical-body>{{ $t('pages.registration.success.comment_page') }}</div>
      </div>
    </container>
  </div>
</template>

<script>
  import axios from 'axios';
  import TextInput from "../components/TextInput";
  import Button from "#/components/Button";
  import Container from "#/components/Container";
  import TransitionExpand from "#/components/TransitionExpand";

  export default {
    components: {TransitionExpand, TextInput, 'e-button': Button, Container},
    data() {
      return {
        loading: false,

        form: {
          name: '',
          email: '',
          password: '',
          repeatedPassword: ''
        },

        errorHints: {
          name: null,
          email: null,
          password: null,
          repeatedPassword: null
        },

        errorMsg: null,
        registerSuccess: false
      }
    },
    methods: {
      doRegister() {
        if (this.loading)
          return;

        this.errorMsg = null;
        let userRegex = this.$parent.checkingRegex.user;

        if (this.form.name.trim() === '')
          this.errorHints.name = this.$t('pages.registration.form.error_hints.name_empty');
        else if (this.form.email.trim() === '')
          this.errorHints.email = this.$t('pages.registration.form.error_hints.email_empty');
        else if (this.form.password === '')
          this.errorHints.password = this.$t('pages.registration.form.error_hints.password_empty');
        else if (this.form.repeatedPassword === '')
          this.errorHints.repeatedPassword = this.$t('pages.registration.form.error_hints.repeated_password_empty');
        else if (!this.form.name.match(userRegex.name))
          this.errorHints.name = this.$t('pages.registration.form.error_hints.name_mismatch');
        else if (this.form.password.toLowerCase().match(/(you|u)\s*(suc|succ|suck)/)) {
          this.errorHints.password = 'no u';
        } else if (!this.form.password.match(userRegex.password))
          this.errorHints.password = this.$t('pages.registration.form.error_hints.password_mismatch');
        else if (this.form.password !== this.form.repeatedPassword) {
          this.errorHints.repeatedPassword = this.$t('pages.registration.form.error_hints.passwords_dont_match');
        } else {
          this.loading = true;
          axios.post('/api/registration/request', {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password
          }).then((response) => {
            this.registerSuccess = true;
          }).catch((error) => {
            if (error.response) {
              let status = +error.response.status;
              let data = error.response.data;

              if (status === 500) {
                this.errorMsg = this.$t('pages.registration.errors.internal_error', [status]);
              } else if (status === 400) {
                if (data['err_msg'] === 'user_exists') {
                  this.errorMsg = this.$t('pages.registration.errors.email_is_registered');
                } else if (data['err_msg'] === 'invalid_data') {
                  this.errorMsg = this.$t('pages.registration.errors.data_incorrect');
                } else {
                  this.errorMsg = this.$t('pages.registration.errors.unexpected_response', [data['err_msg']]);
                }
              } else {
                this.errorMsg = this.$t('pages.registration.errors.unexpected_response', [status]);
              }
            } else if (error.request) {
              this.errorMsg = this.$t('common.you_are_offline');
            } else {
              this.errorMsg = this.$t('common.unknown_error');

              console.error(error);
            }
          }).finally(() => {
            this.loading = false;
            this.form.password = '';
            this.form.repeatedPassword = '';
          });
        }
      }
    }
  }
</script>

<style scoped>
  .register_wr {
    text-align: center;
  }

  .register {
    display: inline-block;
    margin-bottom: 10px;
    width: 250px;
  }

  .register__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .register__input {
    width: 100%;
  }

  .register_button {
    margin-bottom: 10px;
    width: 250px;
  }

  .register__error_msg {
    color: #c20000;
    margin: 5px 0;
  }

  .register__title--green {
    color: green;
  }

  .register__big-emoji {
    font-size: calc(58px + 1vw)
  }
</style>
