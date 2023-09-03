<script setup lang="ts">
import { ref } from 'vue';
import { Measure } from '../measure'
import { useMeasures } from '../stores/measures';
import { useRouter } from 'vue-router';
import { Warning } from '../warning';
import { useWarning } from '../stores/warning';

  const router = useRouter();
  const measuresStore = useMeasures();
  const warningStore = useWarning();

  const initialID = measuresStore.selectedMeasure ? measuresStore.selectedMeasure.id :  measuresStore.maxId + 1;
  const temp = ref<unknown>(measuresStore.selectedMeasure ? measuresStore.selectedMeasure.temp : '');

  function containsOnlyNumbers(inputString:string):boolean {
    const regex = /^-?[0-9]+$/;
    return regex.test(inputString);
  }
  function saveNewValue() {
      console.log(temp.value);
      if (typeof temp.value == "number") {
        const newMeasure:Measure = {
          id: initialID,
          temp:temp.value
        }
        measuresStore.createOrResetMeasure(newMeasure);
        router.push('/');
      } else if (typeof temp.value == "string") {
        // ### Написать вывод ошибки в инпут
        if(containsOnlyNumbers(temp.value)) {
            const tempValue = parseInt(temp.value, 10)
            const newMeasure:Measure = {
              id: initialID,
              temp:tempValue
            }
            measuresStore.createOrResetMeasure(newMeasure);
            router.push('/');
          }
      }
  }
  function canselEditing() {
    if (measuresStore.selectedMeasure) {
      const warning:Warning = {
        text: 'прервать редактирование',
        callback: () => {
          router.push('/');
        }
      }
      warningStore.initialWarning(warning);
    } else {
      router.push('/');
    }
  }
  function handleDeleteClick() {
    measuresStore.deleteMeasure(initialID);
    const warning:Warning = {
      text: 'удилить объект',
      callback: () => {
        measuresStore.deleteMeasure(initialID);
        router.push('/');
      }
    }
    warningStore.initialWarning(warning);
  }

</script>

<template>
      <div class="degreeEdit">
        <nav class="degreeEdit__nav">
          <a href="#" @click="saveNewValue" class="button button_1">{{ measuresStore.selectedMeasure ? 'Save...' : 'Add....' }}</a>
          <a href="#" @click="canselEditing" class="button button_3">Cansel</a>
        </nav>
        <div class="panel">
          <h1 class="panel__title">{{ measuresStore.selectedMeasure ? 'Change sensor value:' : 'Add new sensor value:' }}</h1>
          <div class="degreeEdit__panel-items">
            // ### Убрать в компонент
            <div class="a-input__container">
              <p class="a-input__label">id</p>
              <input class="a-input__input disabled" :value="initialID" disabled/>
            </div>
            <div class="a-input__container">
              <p class="a-input__label">temp:</p>
              <input class="a-input__input" v-model="temp"/>
            </div>
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
    display:flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  &__panel {
    width: 100%;
    &-items{
      padding: 2rem 0;
    }
  }
  &__delete {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
.a-input {
&__container {
  position: relative;
  margin: 0 1.5rem 0 1.5rem;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  }
&__label {
    position: absolute;
    top: 0.3rem;
    margin: 0;
    left: 1rem;
    color: gray;
    font-size: 1.6rem;
    opacity: 0.6;
}
&__input {
  border: none;
  width: 100%;
  height: 5rem;
  padding: 1.2rem 0 0 1rem;
  background: rgb(239, 238, 238);
  border-radius: 0.6rem;
  font-size: 1.8rem;
  line-height: 1.8rem;
  font-weight: 500;
  &.disabled {
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: none;
    background:rgb(228, 226, 226);
  }
}
}
}
</style>