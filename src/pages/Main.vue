<template>
  <div class="main_wr">
    <div class="main" :class="{ 'blurred': !$parent.user.auth }">
      <div class="graph_content_wr -bg-light">
        <container>
          <div class="graph_content">
            <div class="graph">
              <graph width="1000" height="1000" v-model="point" :r="r" :prev-results="prevResults" @click="onSubmit"/>
            </div>
            <form class="controls" :class="{ 'loading': formLoading }" @submit.prevent="onSubmit">
              <div class="input_label">R</div>
              <button-array-input :values="['-5','-4','-3','-2','-1','0','1','2','3']"
                                  v-model="r"
                                  :error-hint="errorHints.r"
                                  @input="errorHints.r = null"/>

              <div class="delimiter"></div>

              <div class="input_label">X</div>
              <button-array-input :values="['-5','-4','-3','-2','-1','0','1','2','3']"
                                  v-model="point.x"
                                  :error-hint="errorHints.x"
                                  @input="errorHints.x = null"/>

              <div class="delimiter"></div>

              <div class="input_label">Y</div>
              <text-input v-model="point.y" @input="errorHints.y = null" :error-hint="errorHints.y"/>

              <div class="delimiter invisible"></div>

              <e-button type="submit" green class="submit">{{$t( 'pages.main.submit' )}}</e-button>
            </form>
          </div>

        </container>
      </div>
      <div class="prev_results_wr">
        <container>
          <div class="prev_results__title">{{$t( 'pages.main.results.title' )}}</div>
          <div class="prev_results" :class="{ 'loading': prevResultsLoading }">
            <table>
              <tr>
                <th>ID</th>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>{{$t( 'pages.main.results.hit' )}}</th>
                <th>{{$t( 'pages.main.results.author' )}}</th>
                <th>{{$t( 'pages.main.results.time_created' )}}</th>
              </tr>
                <tr :class="{ 'result_row_anim': result.justLoaded }" v-for="result in prevResults" :key="result.id">
                  <td>{{ result.id }}</td>
                  <td>{{ result.x }}</td>
                  <td>{{ result.y }}</td>
                  <td>{{ result.r }}</td>
                  <td>{{ result.hit ? $t('pages.main.results.hit_yes') : $t('pages.main.results.hit_no') }}</td>
                  <td>
                    <div class="result_owner">
                      <div class="result_owner__name">{{ result.authorName }}</div>
                      <div class="result_owner__email">{{ result.authorEmail }}</div>
                    </div>
                  </td>
                  <td>{{ timeFriendly(new Date(result.created[0], result.created[1]-1,  result.created[2], result.created[3], result.created[4], result.created[5]).getTime()) }}</td>
                </tr>
            </table>
          </div>
        </container>
      </div>
    </div>
    <div class="access_denied" v-if="!$parent.user.auth">
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

  import axios from 'axios';
  import TransitionExpand from "#/components/TransitionExpand";

  export default {
    components: {TransitionExpand, TextInput, ButtonArrayInput, Graph, Container, 'e-button': Button },
    data() {
      return {
        prevResultsLoading: false,
        formLoading: false,
        isMounted: false,
        point: {
          x: null,
          y: null
        },
        errorHints: {
          x: null,
          y: null,
          r: null
        },
        r: null,
        currentMillisReactive: null,
        currentMillisUpdateIntervalId: null,
        prevResults: []
      }
    },
    computed: {
      timeFriendly() {
        return (millis) => {
          if (this.currentMillisReactive == null)
            return '-';

          let diff = this.currentMillisReactive - millis;

          let seconds = Math.floor(diff/1000 % 60);
          let minutes = Math.floor(diff/1000/60 % 60);
          let hours = Math.floor(diff/1000/60/60 % 24);
          let days = Math.floor(diff/1000/60/60/24);

          if (diff < 3000)
            return this.$t('pages.main.time.just_now');
          else if (diff < 60 * 1000)
            return this.$t('pages.main.time.seconds', [seconds]);
          else if (diff < 60 * 60 * 1000)
            return this.$t('pages.main.time.minutes', [minutes]);
          else if (diff < 24 * 60 * 60 * 1000)
            return this.$t('pages.main.time.hours', [hours, minutes]);
          else
            return this.$t('pages.main.time.days', [days, hours, minutes]);
        }
      }
    },
    methods: {
      updateCurrentMillis() {
        this.currentMillisReactive = Date.now();
      },
      onSubmit() {
        if (this.formLoading)
          return;

        if (this.point.x == null) {
          this.errorHints.x = this.$t('pages.main.errors.x_not_selected')
        } else if (this.point.y == null || this.point.y.trim() === '') {
          this.errorHints.y = this.$t('pages.main.errors.y_not_selected')
        } else if (this.r == null) {
          this.errorHints.r = this.$t('pages.main.errors.r_not_selected')
        } else if (isNaN(this.point.y)) {
          this.errorHints.y = this.$t('pages.main.errors.y_incorrect')
        } else if (+this.point.y <= -3 || +this.point.y >= 3) {
          this.errorHints.y = this.$t('pages.main.errors.y_constraint_failed')
        } else if (+this.point.x < -5 || +this.point.x > 3) {
          this.errorHints.x = this.$t('pages.main.errors.x_constraint_failed')
        } else if (+this.r <= 0) {
          this.errorHints.r = this.$t('pages.main.errors.r_constraint_failed')
        } else {

          this.formLoading = true;

          axios.put('/api/points', {
            x: +this.point.x,
            y: +this.point.y,
            r: +this.r,
            login: this.$parent.user.email,
            token: this.$parent.user.token
          }).then((response) => {
            let hit = response.data.hit;
            let id = response.data.id;
            let date = new Date();
            let created = [
              date.getFullYear(),
              date.getMonth()+1,
              date.getDate(),
              date.getHours(),
              date.getMinutes(),
              date.getSeconds()
            ];

            let newResult = {
              x: this.point.x,
              y: this.point.y,
              r: this.r,
              justLoaded: true,
              authorName: this.$parent.user.name,
              authorEmail: this.$parent.user.email,
              created,
              hit,
              id
            };

            this.prevResults.unshift(newResult);
            setTimeout(() => {
              newResult.justLoaded = false;
            }, 2000);
            this.point.x = null;
            this.point.y = null;
          }).catch((error) => {
            if (error.response) {
              let status = +error.response.status;

              if (status === 401) {
                this.$parent.user.auth = false;
                this.$parent.user.email = null;
                this.$parent.user.token = null;
                this.$router.push({ path: '/login' });
              } else if (status === 400) {
                this.$toast(this.$t('pages.main.errors.data_incorrect'));
              } else if (status === 500) {
                this.$toast(this.$t('common.internal_server_error', [status]));
              }
            } else if (error.request) {
              this.$toast(this.$t('common.you_are_offline'));
            }
          }).finally(() => {
            this.formLoading = false;
          });
        }
      },
      loadResults() {
        if (this.prevResultsLoading)
          return;

        this.prevResultsLoading = true;

        axios.get('/api/points', {
          // todo mine
        }).then((response) => {
          this.$set(this, 'prevResults', response.data);
        }).catch((error) => {
          if (error.response) {
            let status = +error.response.status;

            if (status === 400) {
              this.$toast(this.$t('common.response_error', [status]));
            } else if (status === 500) {
              this.$toast(this.$t('common.internal_server_error', [status]));
            }
          } else if (error.request) {
            this.$toast(this.$t('common.you_are_offline'));
          }
        }).finally(() => {
          this.prevResultsLoading = false;
        });
      }
    },
    mounted() {
      this.isMounted = true;
      this.loadResults();
      this.currentMillisUpdateIntervalId = setInterval(
        this.updateCurrentMillis, 1000
      );
      this.updateCurrentMillis();
    },
    beforeDestroy() {
      clearInterval(this.currentMillisUpdateIntervalId);
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
    padding: 100px 35px 35px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, .25);
  }

  .blurred {
    filter: blur(10px);
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
    padding: 10px 0;
  }

  .delimiter {
    width: 100%;
    border-bottom: 1px solid grey;
    margin: 25px auto;

    &.invisible {
      opacity: 0;
    }
  }

  .prev_results {
    table {
      margin: auto;
      display: block;
      padding: 10px 20px;
      max-width: 750px;
      text-align: center;

      tr {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;

        &:nth-child(1) {
          border-bottom: 1px solid grey;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          background: rgba(255, 255, 255, .4);
        }

        &:nth-child(2n) {
          background-color: rgba(255, 255, 255, .2);
        }

        &:not(:first-child):hover {
          background-color: rgba(0, 0, 0, .2);
        }
      }

      th, td {
        padding: 15px 5px;

        &:nth-child(1) {
          flex: 1.4;
        }
        &:nth-child(2) {
          flex: 2;
        }
        &:nth-child(3) {
          flex: 2;
        }
        &:nth-child(4) {
          flex: 2;
        }
        &:nth-child(5) {
          flex: 2;
        }
        &:nth-child(6) {
          flex: 10;
        }
        &:nth-child(7) {
          flex: 6;
        }
      }

      td {
        &:nth-child(1) {
          opacity: .5;
          border-right: 1px solid grey;
        }
      }
    }
  }

  .prev_results__title {
    text-align: center;
    margin: 10px;
    font-size: calc(18px + 1vw);
  }

  .input_label {
    font-size: 24px;
    text-align: center;
  }

  .submit {
    font-size: 24px;
  }

  .result_owner {
    .result_owner__email {
      display: none;
    }

    &:hover {
      .result_owner__email {
        display: block;
      }
      .result_owner__name {
        display: none;
      }
    }
  }
  
  .result_row_anim {
    animation: result_row 1800ms;
    transition: background-color 300ms, color 300ms;
  }

  .result_row_anim:nth-child(2n) {
    animation: result_row_odd 1800ms;
    transition: background-color 300ms, color 300ms;
  }
  
  @keyframes result_row {
    0% {
      background-color: transparent;
      color: black;
    }

    25% {
      background-color: #ab4a7f;
      color: white;
    }

    100% {
      background-color: transparent;
      color: black;
    }
  }

  @keyframes result_row_odd {
    0% {
      background-color: rgba(255, 255, 255, 0.2);
      color: black;
    }

    25% {
      background-color: #ab4a7f;
      color: white;
    }

    100% {
      background-color: rgba(255, 255, 255, 0.2);
      color: black;
    }
  }
</style>