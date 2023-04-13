import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',
  props: {
    agendaItem: {
      type: Object,
      required: true,
    }
  },
  methods: {
    getTitle() {
      if (!this.agendaItem.title) {
        return agendaItemDefaultTitles[this.agendaItem.type];
      }
      return this.agendaItem.title
    },
    getIcons() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="getIcons()" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ getTitle() }}</h3>
        <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
