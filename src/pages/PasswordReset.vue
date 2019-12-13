<template>
  <container>
    <div class="pwd_reset" :class="{ 'loading': loading }">

      <div v-if="page === 'request'">
        <h1>Password reset</h1>
        <div class="hint">Please, enter your email</div>
        <form @submit.prevent="doReset" class="form">
          <text-input
            class="form__input"
            type="email"
            hint="EMail"
            :error-hint="form.email.error"
            v-model="form.email.value"/>
          <e-button type="submit" class="form__submit">Reset my password!</e-button>
        </form>
        <div class="separator"></div>
        <router-link to="/login">Back to login</router-link>
      </div>

      <div v-else-if="page === 'request_done'">
        <h1>Success!</h1>
        <div class="message">
          If this email is registered, you will get an email &#x1F4E7; with resetting link.
          This page can be closed.
        </div>
      </div>

      <div v-else-if="page === 'confirm'">
        <h1>Password reset</h1>
        <div class="hint">Enter your new password</div>
        <form @submit.prevent="doConfirm" class="form">
          <text-input
            class="form__input"
            type="password"
            hint="Password"
            :error-hint="form.password.error"
            v-model="form.password.value"/>
          <text-input
            class="form__input"
            type="password"
            hint="Password again"
            :error-hint="form.passwordRepeat.error"
            v-model="form.passwordRepeat.value"/>
          <e-button type="submit" class="form__submit">Done</e-button>
        </form>
      </div>

      <div v-else-if="page === 'confirm_done'">
        <h1>Well done</h1>
        <div class="message">
          Now you can <router-link to="/login">log in</router-link> with your new password.
        </div>
      </div>
    </div>
  </container>
</template>

<script>
  import TextInput from "#/components/TextInput";
  import Container from "#/components/Container";
  import Button from "#/components/Button";

  import axios from 'axios';

  export default {
    data() {
      return {
        form: {
          email: {
            value: '',
            error: null
          },
          password: {
            value: '',
            error: null
          },
          passwordRepeat: {
            value: '',
            error: null
          }
        },
        page: 'request',
        loading: false
      }
    },
    components: {
      TextInput, Container, 'e-button': Button
    },
    methods: {
      redToast(text) {
        this.$parent.$refs.toaster.toast(text, { type: 'red' });
      },
      doReset() {
        if (this.loading)
          return;
        this.loading = true;

        if (this.form.email.value.trim() === '') {
          this.form.email.error = "This input is required";
          return;
        }

        axios.post('/api/password-reset', {
          action: 'request',
          email: this.form.email.value
        }).then((response) => {
          let json = response.data;
          switch (json['status']) {
            case "ok":
              this.page = "request_done";
              break;

            case "error":
              this.redToast("Please, check the data you entered");
              break;

            case "internal_error":
              this.redToast(`Internal error (${json['status']})`);
              break;

            default:
              this.redToast(`Unexpected response (${json['status']})`);
          }
        }).catch((error) => {
          if (error.response) {
            this.redToast("Sorry, we've got an error (" + error.response.status + ")");
          } else if (error.request) {
            this.redToast("You're offline");
          } else {
            this.redToast("Unknown error");

            console.error(error);
          }
        }).finally(() => {
          this.loading = false;
        });
      },
      doConfirm() {
        if (this.loading)
          return;
        this.loading = true;

        if (this.form.password.value.trim() === '') {
          this.form.password.error = "This input is required";
          return;
        } else if (!this.form.password.value.match(this.$parent.checkingRegex.user.password)) {
          this.form.password.error = 'Your password should have from 8 to 4096 characters';
          return;
        } else if (this.form.password.value !== this.form.passwordRepeat.value) {
          this.form.password.error = "Passwords don't match";
          this.form.passwordRepeat.error = "";
          return;
        }

        axios.post('/api/password-reset', {
          action: 'confirm',
          email: this.$route.query['target'],
          token: this.$route.query['token'],
          password: this.form.password.value
        }).then((response) => {
          let json = response.data;
          switch (json['status']) {
            case "ok":
              this.page = "confirm_done";
              break;

            case "error":
              switch (json['err_msg']) {
                case "password_incorrect":
                  this.redToast("Sorry, your password is incorrect. Please, enter another");
                  break;
                case "action_failed":
                  this.redToast("Sorry, this link is outdated or incorrect");
                  break;
                default:
                  this.redToast(`Unexpected error (${json['err_msg']})`);
              }
              break;

            case "internal_error":
              this.redToast(`Internal error (${json['status']})`);
              break;

            default:
              this.redToast(`Unexpected response (${json['status']})`);
          }
        }).catch((error) => {
          if (error.response) {
            this.redToast("Sorry, we've got an error (" + error.response.status + ")");
          } else if (error.request) {
            this.redToast("You're offline");
          } else {
            this.redToast("Unknown error");

            console.error(error);
          }
        }).finally(() => {
          this.loading = false;
        });
      }
    },
    mounted() {
      this.$parent.$refs.header.setTitle("Password reset");

      let token = this.$route.query['token'];
      let target = this.$route.query['target'];

      if (token && target)
        this.page = "confirm";
    }
  }
</script>

<style scoped>
  .pwd_reset {
    text-align: center;
  }

  .hint {
    color: grey;
    margin-bottom: 15px;
  }

  .form {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .form__input {
    width: 250px;
  }

  .form__submit {
    width: 250px;
  }

  .separator {
    height: 40px;
  }

  .message {
    padding: 0 20px;
    font-size: 24px;
  }
</style>
