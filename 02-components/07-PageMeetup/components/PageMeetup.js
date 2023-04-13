import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',
  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      meetup: null,
      error: '',
      loading: false,
    };
  },
  beforeMount() {
    this.getCurrentMeetup();
  },
  watch: {
    meetupId: function () {
      this.getCurrentMeetup();
    }
  },
  methods: {
    getCurrentMeetup() {
      this.loading = true;
      this.error = '';

      fetchMeetupById(this.meetupId)
      .then((result) => {
        if(result) {
          this.meetup = result;
        }
      })
      .catch((err) => {
        this.error = err.message;
      })
      .finally(() => {
        this.loading = false;
      });
    }
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="!loading && !error" :meetup="meetup" />

      <UiContainer>
        <UiAlert v-if="loading && !error">Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer>
        <UiAlert v-if="error">{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
