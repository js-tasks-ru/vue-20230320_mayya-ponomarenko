import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',
  data() {
    return {
      numberOne: '',
      numberTwo: '',
      sign: '',
    };
  },
  computed: {
    sum() {
      if (this.numberOne && this.numberTwo && this.sign){
        switch(this.sign) {
          case('sum'): return this.numberOne + this.numberTwo;
          case('subtract'): return this.numberOne - this.numberTwo;
          case('multiply'): return this.numberOne * this.numberTwo;
          case('divide'): return this.numberOne / this.numberTwo;
          default: return '';
        }
        ;
      }
      return '';
    }
  }
});

const app = createApp(App);
const vm = app.mount('#app');

