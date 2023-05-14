<template>
  <div class="toast" :class="{ 'toast_success': isSuccess, 'toast_error': !isSuccess }">
    <UiIcon class="toast__icon" :icon="isSuccess ? 'check-circle' : 'alert-circle'" />
    <span>{{ textMessage }}</span>
  </div>
</template>

<script>
import UiIcon from "./UiIcon.vue";

export default {
  name: "UiToast",
  components: {UiIcon},
  props: {
    isSuccess: {
      type: Boolean,
      required: true,
    },
    textMessage: {
      type: String,
      required: true,
    }
  },
}
</script>
