<script setup lang="ts">
import { computed, ref } from 'vue';
import { Measure } from '../measure';
import { useMeasures } from '../stores/measures';
import { useRouter } from 'vue-router';
import { Warning } from '../warning';
import { useWarning } from '../stores/warning';
import aInput from './a_input/a_input.vue';

const router = useRouter();
const measuresStore = useMeasures();
const warningStore = useWarning();

const initialID = measuresStore.selectedMeasure ? measuresStore.selectedMeasure.id : measuresStore.maxId + 1;
const temp = ref<string | number>(measuresStore.selectedMeasure ? measuresStore.selectedMeasure.temp : '');
const inputError = computed(() => {
  const regex = /^-?[0-9]+$/;
  return !regex.test(temp.value as string);
});

function handleSaveClick() {
  let tempValue;
  if (typeof temp.value == 'string') {
    tempValue = parseInt(temp.value, 10);
  } else {
    tempValue = temp.value;
  }
  const newMeasure: Measure = {
    id: initialID,
    temp: tempValue,
  };
  if (!inputError.value) {
    measuresStore.createOrResetMeasure(newMeasure);
    measuresStore.setEditedMeasure(null);
    router.push('/');
  }
}
function handleCanselClick() {
  if (measuresStore.selectedMeasure) {
    const warning: Warning = {
      text: 'прервать редактирование',
      callback: () => {
        measuresStore.setEditedMeasure(null);
        router.push('/');
      },
    };
    warningStore.initialWarning(warning);
  } else {
    router.push('/');
  }
}
function handleDeleteClick() {
  measuresStore.deleteMeasure(initialID);
  const warning: Warning = {
    text: 'удилить объект',
    callback: () => {
      measuresStore.deleteMeasure(initialID);
      measuresStore.setEditedMeasure(null);
      router.push('/');
    },
  };
  warningStore.initialWarning(warning);
}
</script>

<template>
  <div class="degreeEdit">
    <nav class="degreeEdit__nav">
      <a href="#" @click="handleSaveClick" class="button button_1">{{
        measuresStore.selectedMeasure ? 'Save...' : 'Add....'
      }}</a>
      <a href="#" @click="handleCanselClick" class="button button_3">Cansel</a>
    </nav>
    <div class="panel">
      <h1 class="panel__title">
        {{ measuresStore.selectedMeasure ? 'Change sensor value:' : 'Add new sensor value:' }}
      </h1>
      <div class="degreeEdit__panel-items">
        <a-input label="id:" :value="initialID" :disabled="true" />
        <a-input label="temp:" :value="temp" @update:value="temp = $event" :is-error="inputError" />
      </div>
    </div>
    <div v-if="measuresStore.selectedMeasure" class="degreeEdit__delete">
      <a @click="handleDeleteClick" class="button button_2">Delete value</a>
    </div>
  </div>
</template>

<style lang="scss">
.degreeEdit {
  &__nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  &__panel {
    width: 100%;
    &-items {
      padding: 2rem 0;
    }
  }
  &__delete {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
}
</style>
