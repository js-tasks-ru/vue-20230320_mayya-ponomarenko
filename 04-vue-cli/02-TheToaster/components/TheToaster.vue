<template>
  <div class="toasts">
    <template v-for="(toast, idx) in toasts" :key="idx">
      <UiToast
        :text-message="toast.textMessage"
        :is-success="toast.isSuccess"
      />
    </template>
  </div>
</template>

<script lang="ts">
import UiIcon from './UiIcon.vue';
import UiToast from "./UiToast.vue";

export default {
  name: 'TheToaster',
  data() {
    return {
      textMessage: '',
      isSuccess: false,
      toasts: [],
    }
  },
  components: {UiToast, UiIcon },
  methods: {
    error(text: string) {
      this.isSuccess = false;
      this.textMessage = text;
      this.addInListToasts();
    },
    success(text: string) {
      this.isSuccess = true;
      this.textMessage = text;
      this.addInListToasts();
    },
    addInListToasts() {
      this.toasts.push({
        isSuccess: this.isSuccess,
        textMessage: this.textMessage,
      });
    },
    deleteLastToast(time: number) {
      setTimeout(() => {
        this.toasts.pop();
      }, time)
    }
  },
  watch: {
    toasts: {
      deep: true,
      handler(newToasts: any) {
        if (newToasts.length > 0) {
          this.deleteLastToast(5000);
        }
      },
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
