import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  props: {
    agenda: {
      type: Array,
      required: true,
    }
  },
  components: {
    MeetupAgendaItem: MeetupAgendaItem,
  },

  template: `
    <ul v-for="item in agenda" :key="item.id" class="agenda">
      <li class="agenda__item">
        <MeetupAgendaItem :agendaItem="item"/>
      </li>
    </ul>`,
});
