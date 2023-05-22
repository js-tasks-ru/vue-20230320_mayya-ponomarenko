<template>
  <form v-if="meetupBackup" class="meetup-form" @submit.prevent="submit">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <UiFormGroup label="Название">
          <UiInput name="title" v-model="meetupBackup.title" />
        </UiFormGroup>
        <UiFormGroup label="Дата">
          <UiInputDate type="date" name="date" v-model="meetupBackup.date"/>
        </UiFormGroup>
        <UiFormGroup label="Место" >
          <UiInput name="place" v-model="meetupBackup.place" />
        </UiFormGroup>
        <UiFormGroup label="Описание" >
          <UiInput multiline rows="3" name="description" v-model="meetupBackup.description" />
        </UiFormGroup>
        <UiFormGroup label="Изображение">
          <!--
               Предлагается сохранять файл для будущей загрузки во временное поле imageToUpload
               и передавать в объекте со всеми данными формы
          -->
          <ui-image-uploader
            v-if="meetupBackup"
            name="image"
            :preview="meetupBackup.image"
            @select="meetupBackup.imageToUpload = $event"
            @remove="meetupBackup.imageToUpload = null"
          />
        </UiFormGroup>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>
        <MeetupAgendaItemForm
          v-for="(agendaItem, index) in meetupBackup.agenda"
          :key="agendaItem.id"
          v-model:agenda-item="meetupBackup.agenda[index]"
          class="meetup-form__agenda-item"
          @remove="removeAgendaItem(index)"
        />

      <div class="meetup-form__append">
        <button class="meetup-form__append-button" type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <ui-button variant="secondary" block class="meetup-form__aside-button" data-test="cancel" @click="cancel">Отмена</ui-button>
        <ui-button variant="primary" block class="meetup-form__aside-button" data-test="submit" type="submit" @submit.prevent="submit">
          {{ submitText }}
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import UiButton from './UiButton.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiImageUploader from './UiImageUploader.vue';
import UiInput from './UiInput.vue';
import UiInputDate from './UiInputDate.vue';
import {createAgendaItem} from "../meetupService";
import {klona} from "klona";

export default {
  name: 'MeetupForm',
  emits: ['submit', 'cancel', 'remove'],

  components: {
    MeetupAgendaItemForm,
    UiButton,
    UiFormGroup,
    UiImageUploader,
    UiInput,
    UiInputDate,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      meetupBackup: null,
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    submit() {
      const dataMeetup = klona(this.meetupBackup)
      this.$emit('submit', dataMeetup);
    },
    addAgendaItem() {
      const newAgendaItem = createAgendaItem();
      if (this.meetupBackup.agenda.length > 0){
        newAgendaItem.startsAt = this.meetupBackup.agenda[this.meetupBackup.agenda.length -1].endsAt;
      }
      this.meetupBackup.agenda.push(newAgendaItem);
    },
    removeAgendaItem(index) {
      this.$emit('remove', index);
      this.meetupBackup.agenda.splice(index, 1)
    },
  },
  mounted() {
    this.meetupBackup = klona(this.meetup);
  }
};
</script>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item + .meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
