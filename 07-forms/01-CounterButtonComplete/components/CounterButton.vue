<template>
  <button @click="counter++">{{ counter }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      innerCount: this.count,
    }
  },
  emits: ['update:count'],
  computed: {
    counter: {
      get() {
        return this.innerCount;
      },
      set(value) {
        this.innerCount = value;
        this.$emit('update:count', value)
      }
    }
  },
  watch: {
    count() {
        this.innerCount = this.count;
    }
  }
};
</script>
