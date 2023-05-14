<template>
  <div class="toasts">
      <UiToast
        v-for="(toast, idx) in toasts"
        :key="idx"
        :text-message="toast.textMessage"
        :is-success="toast.isSuccess"
      />
  </div>
</template>

<script lang="ts">
import UiIcon from './UiIcon.vue';
import UiToast from "./UiToast.vue";

export default {
  name: 'TheToaster',
  data() {
    return {
      isSuccess: false,
      toastId: 0,
      toasts: [],
    }
  },
  components: {UiToast, UiIcon },
  methods: {
    error(text: string) {
      this.isSuccess = false;
      this.addInListToasts(text, this.isSuccess);
    },
    success(text: string) {
      this.isSuccess = true;
      this.addInListToasts(text, this.isSuccess);
    },
    addInListToasts(text: string, isSuccess: boolean) {
      this.toastId++;
      this.toasts.push({
        id: this.toastId,
        isSuccess: isSuccess,
        textMessage: text,
      });
      this.deleteToast(5000, this.toastId);
    },
    deleteToast(time: number, toastId: number) {
      setTimeout(() => {
        const index = this.toasts.findIndex((toast) => toast.id === toastId);
        this.toasts.splice(index, 1);
      }, time)
    }
  },
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
