<template>
  <div class="main_wr">
    <container>
      <div class="main" v-if="$parent.user.auth">

      </div>
      <div class="access_denied" v-else>
        <img  class="access_denied__image"
              src="/assets/img/access_denied.jpg"
              alt="Слыш тебе сюда нельзя"
              v-if="this.$i18n.locale.startsWith('ru')">
        <img  class="access_denied__image"
              src="/assets/img/access_denied_en.jpg"
              alt="Слыш тебе сюда нельзя"
              v-else>

        <span class="access_denied__message">
          {{$t( 'pages.main.access_denied.prefix' )}}
          <router-link to="/login">
            {{$t( 'pages.main.access_denied.link' )}}
          </router-link>
          {{$t( 'pages.main.access_denied.postfix' )}}
        </span>
      </div>
    </container>
  </div>
</template>

<script>
  import Container from "#/components/Container";

  export default {
    components: { Container }
  }
</script>

<style>
  .access_denied {
    text-align: center;
    padding: 35px;
  }

  .access_denied__image {
    display: block;
    margin: auto;
    max-width: 100%;
    max-height: 500px;
  }

  .access_denied__message {
    font-size: calc(18px + 1vw);
    display: inline-block;
    padding: 25px 0;
  }
</style>