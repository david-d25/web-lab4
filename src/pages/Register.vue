<template>
  <div class="register_wr">
    <container>
      <div class="register" :class="{ 'loading': loading }" v-if="!registerSuccess">
        <h1 class="register__title">{{ $t('pages.registration.title') }}</h1>

        <div class="register__error_msg" v-if="errorMsg != null" @click="errorMsg = null">
          {{ errorMsg }}
        </div>

        <form class="register__form" @submit.prevent="doRegister">
          <text-input :hint="$t('pages.registration.form.hints.name')"
                      v-model="form.name"
                      class="register__input"
                      @input="errorHints.name = null"
                      :error-hint="errorHints.name"/>

          <text-input :hint="$t('pages.registration.form.hints.surname')"
                      v-model="form.surname"
                      class="register__input"
                      @input="errorHints.surname = null"
                      :error-hint="errorHints.surname"/>

          <text-input :hint="$t('pages.registration.form.hints.email')"
                      type="email"
                      v-model="form.email"
                      class="register__input"
                      @input="errorHints.email = null"
                      :error-hint="errorHints.email"/>

          <text-input :hint="$t('pages.registration.form.hints.password')"
                      type="password"
                      class="register__input"
                      v-model="form.password"
                      @input="errorHints.password = null"
                      :error-hint="errorHints.password"/>

          <text-input :hint="$t('pages.registration.form.hints.repeated_password')"
                      type="password"
                      class="register__input"
                      @input="errorHints.repeatedPassword = null"
                      v-model="form.repeatedPassword"
                      :error-hint="errorHints.repeatedPassword"/>

          <e-button type="submit" class="register_button" green>{{ $t('pages.registration.form.submit_button') }}</e-button>

          <div style="margin-top: 25px;">{{ $t('pages.registration.already_have_account') }}</div>
          <router-link to="/login">{{ $t('pages.registration.login_link') }}</router-link>
        </form>
      </div>

      <div class="register" v-else>
        <h1 class="register__title register__title--green">{{ $t('pages.registration.success.yay') }} &#x1F929;</h1>
        <div class="register__comment">{{ $t('pages.registration.success.comment_email') }}</div>
        <div class="register__big-emoji">&#x1F4E7;</div>
        <div class="register__comment">{{ $t('pages.registration.success.comment_page') }}</div>
      </div>
    </container>
  </div>
</template>

<script>
  import axios from 'axios';
  import TextInput from "../components/TextInput";
  import Button from "#/components/Button";
  import Container from "#/components/Container";

  export default {
    components: {TextInput, 'e-button': Button, Container},
    data() {
      return {
        loading: false,

        form: {
          name: '',
          surname: '',
          email: '',
          password: '',
          repeatedPassword: ''
        },

        errorHints: {
          name: null,
          surname: null,
          email: null,
          password: null,
          repeatedPassword: null
        },

        errorMsg: null,
        registerSuccess: false
      }
    },
    mounted() {
      this.$parent.$refs.header.setTitle('Register');
    },
    methods: {
      doRegister() {
        if (this.loading)
          return;

        let userRegex = this.$parent.checkingRegex.user;

        if (this.form.name.trim() === '')
          this.errorHints.name = this.$t('pages.registration.form.error_hints.name_empty');
        else if (this.form.surname.trim() === '')
          this.errorHints.surname = this.$t('pages.registration.form.error_hints.surname_empty');
        else if (this.form.email.trim() === '')
          this.errorHints.email = this.$t('pages.registration.form.error_hints.email_empty');
        else if (this.form.password === '')
          this.errorHints.password = this.$t('pages.registration.form.error_hints.password_empty');
        else if (this.form.repeatedPassword === '')
          this.errorHints.repeatedPassword = this.$t('pages.registration.form.error_hints.repeated_password_empty');
        else if (!this.form.name.match(userRegex.name))
          this.errorHints.name = this.$t('pages.registration.form.error_hints.name_mismatch');
        else if (!this.form.surname.match(userRegex.surname))
          this.errorHints.surname = this.$t('pages.registration.form.error_hints.surname_mismatch');
        else if (this.form.password.toLowerCase().match(/(you|u)\s*(suc|succ|suck)/)) {
          this.errorHints.password = 'no u';
        } else if (!this.form.password.match(userRegex.password))
          this.errorHints.password = this.$t('pages.registration.form.error_hints.password_mismatch');
        else if (this.form.password !== this.form.repeatedPassword) {
          this.errorHints.repeatedPassword = this.$t('pages.registration.form.error_hints.passwords_dont_match');
        } else {
          this.loading = true;
          axios.post('/api/register', {
            action: 'register',
            name: this.form.name,
            surname: this.form.surname,
            email: this.form.email,
            password: this.form.password
          }).then((response) => {
            switch (response.data['status']) {
              case "ok":
                this.registerSuccess = true;
                this.$parent.$refs.header.title = this.$t('pages.registration.success_title');
                break;

              case "error":
                switch (response.data['err_msg']) {
                  case "empty_fields":
                  case "data_incorrect":
                  case "data_not_full":
                    this.$parent.$refs.toaster.toast(this.$t('pages.registration.errors.data_incorrect'), { type: 'red' });
                    break;

                  case "email_is_registered":
                    this.errorHints.email = this.$t('pages.registration.errors.email_is_registered');
                    break;

                  case "email_is_registering":
                    this.errorHints.email = this.$t('pages.registration.errors.email_is_registering');
                    break;

                  default:
                    this.errorMsg = this.$t('pages.registration.errors.default_error', [response.data['err_msg']]);
                }
                break;

              case "internal_error":
                this.errorMsg = this.$t('pages.registration.errors.internal_error', [response.data['err_msg']]);
                break;

              default:
                this.errorMsg = this.$t('pages.registration.errors.unexpected_response', [response.data['status']]);
                break;
            }
          }).catch((error) => {
            if (error.response) {
              this.errorMsg = this.$t('common.response_error', [error.response.status]);
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
