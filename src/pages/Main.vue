<template>
  <div class="main_wr">
    <div class="main" v-if="$parent.user.auth">
      <div class="graph_content_wr -bg-light">
        <container>
          <div class="graph_content">
            <div class="graph">
              <graph width="1000" height="1000" v-model="point" :r="r" :prev-results="prevResults"/>
            </div>
            <form class="controls" :class="{ 'loading': formLoading }" @submit.prevent="">
              <div class="input_label">X</div>
              <button-array-input :values="['-5','-4','-3','-2','-1','0','1','2','3']" v-model="point.x"/>

              <div class="delimiter"></div>

              <div class="input_label">Y</div>
              <text-input v-model="point.y"/>

              <div class="delimiter"></div>

              <div class="input_label">R</div>
              <button-array-input :values="['-5','-4','-3','-2','-1','0','1','2','3']" v-model="r"/>

              <div class="delimiter invisible"></div>

              <e-button type="submit" green class="submit">{{$t( 'pages.main.submit' )}}</e-button>
            </form>
          </div>

        </container>
      </div>
      <div class="prev_results_wr">
        <container>
          <div class="prev_results" :class="{ 'loading': prevResultsLoading }">
<!--            TODO-->
          </div>
        </container>
      </div>
    </div>
    <div class="access_denied" v-else>
      <container>
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
      </container>
    </div>
  </div>
</template>

<script>
  import Container from "#/components/Container";
  import Graph from "#/components/Graph";
  import ButtonArrayInput from "#/components/ButtonArrayInput";
  import TextInput from "#/components/TextInput";
  import Button from "#/components/Button";

  export default {
    components: { TextInput, ButtonArrayInput, Graph, Container, 'e-button': Button },
    data() {
      return {
        prevResultsLoading: false,
        formLoading: false,
        point: {
          x: null,
          y: null
        },
        r: null,
        prevResults: []
      }
    },
    mounted() {
      // todo
    }
  }
</script>

<style lang="scss">
  @import "~$src/styles/tablet.scss";

  .main_wr {
    background: rgba(0, 0, 0, 0.15);
    min-height: calc(100vh - 50px);
  }

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

  .graph_content_wr {
    padding: 25px 0;
  }

  .graph_content {
    display: flex;
    flex-direction: row;

    @include tablet {
      flex-direction: column;
    }
  }

  .graph {
    flex: 3;
    order: 1;
    margin: auto;
    padding: 25px;

    @include tablet {
      max-width: 500px;
    }
  }

  .controls {
    flex: 2;
    order: 0;
    padding: 30px;
    text-align: center;
    flex-direction: column;
    display: flex;
    justify-content: space-between;

    @include tablet {
      order: 2;
    }
  }

  .prev_results_wr {
    padding: 25px 0;
  }

  .delimiter {
    width: 100%;
    border-bottom: 1px solid grey;
    margin: 35px auto;

    &.invisible {
      opacity: 0;
    }
  }

  .input_label {
    font-size: 24px;
    text-align: center;
  }

  .submit {
    font-size: 24px;
  }
</style>