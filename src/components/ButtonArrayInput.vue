<template>
  <div class="ba_input">
    <div class="buttons">
      <button v-for="current in values"
              :state-active="current === $props.value"
              type="button"
              physical-body
              :key="current.id"
              @click="$emit('input', current)">{{ current }}</button>
    </div>
    <transition-expand>
      <div class="custom_value" v-if="isValueCustom && !errorHint" physical-body>
        {{$t( 'components.button_array_input.custom_value' )}}
        {{ value }}
      </div>
    </transition-expand>
    <transition-expand>
      <div class="error_hint" v-if="errorHint">
        {{ errorHint }}
      </div>
    </transition-expand>
  </div>
</template>

<script>
  import TransitionExpand from "#/components/TransitionExpand";
  export default {
    components: {TransitionExpand},
    props: ['values', 'errorHint', 'value'],
    computed: {
      isValueCustom() {
        return this.value != null && this.values.indexOf(this.value) === -1;
      }
    },
    watch: {
      value(v) {
        this.$emit('input', v);
      }
    }
  }
</script>

<style scoped>
  .buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .custom_value {
    opacity: .5;
  }

  button {
    border: 1px solid #dddddd;
    background: white;
    border-radius: 4px;
    font-size: 18px;
    padding: 10px 22px;
    margin: 4px;
    flex: 1;
    cursor: pointer;
    outline: none;
    transition: border 300ms, background 300ms;
    box-shadow: 0 1px 0 rgba(0, 0, 0, .2);
  }

  button:active {
    background: #cccccc;
  }

  button[state-active='true'] {
    border-bottom: 4px solid blue;
    padding-bottom: 7px;
  }

  .error_hint {
    color: darkred;
  }
</style>