<script setup lang="ts">
import { Measure } from '../measure';
import degreeLineItem from './s-degree-item/s-degree-item.vue';
import { useMeasures } from '../stores/measures';
import { useRouter } from 'vue-router';
import { useWarning } from '../stores/warning';
import { Warning } from '../warning';

const router = useRouter();
const measuresStore = useMeasures();
const warningStore = useWarning();

function handleAddClick() {
  measuresStore.setEditedMeasure(null);
  router.push('/edit');
}
function handleEditClick(measure: Measure) {
  measuresStore.setEditedMeasure(measure);
  router.push('/edit');
}
function handleDeleteClick(measure: Measure) {
  const warning: Warning = {
    text: 'удилить объект',
    callback: () => measuresStore.deleteMeasure(measure.id),
  };
  warningStore.initialWarning(warning);
}
</script>

<template>
  <div class="degreeLine">
    <nav class="degreeLine__nav">
      <a @click="handleAddClick()" class="button button_3">+ Add New</a>
    </nav>
    <div class="panel">
      <h1 class="panel__title">Temperature sensor values:</h1>
      <div class="degreeLine__panel-items">
        <template v-if="measuresStore.sortedMeasures.length">
          <degreeLineItem
            v-for="measure of measuresStore.sortedMeasures"
            :key="measure.id"
            :measure="measure"
            @editIconClick="handleEditClick"
            @deleteIconClick="handleDeleteClick"
          />
        </template>
        <div v-else class="degreeLine__panel-text">
          <p class="text">Records missing</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.degreeLine {
  &__nav {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
  &__panel {
    width: 100%;
    &-text {
      text-align: center;
      padding-bottom: 1rem;
    }
  }
}
</style>
