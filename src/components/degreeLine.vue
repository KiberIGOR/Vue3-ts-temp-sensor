<script setup lang="ts">
  import { Measure } from '../measure'
  import degreeLineItem from './degreeLineItem.vue'
  import { useMeasures } from '../stores/measures';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const measuresStore = useMeasures()

  function addMeasure() {
      measuresStore.setEditedMeasure(null);
      // console.log(measuresStore.selectedMeasure);
      router.push('/edit');
  }
  function editMeasure(measure:Measure) {
      measuresStore.setEditedMeasure(measure);
      // console.log(measuresStore.selectedMeasure);
      router.push('/edit');
  }
  function handleDeleteClick(measure:Measure) {
    measuresStore.deleteMeasure(measure.id);
  }


</script>

<template>
      <div class="degreeLine">
        <nav class="degreeLine__nav">
          <a @click="addMeasure()" class="button button_3">+ Add New</a>
        </nav>
        <div class="panel">
          <h1 class="panel__title">Temperature sensor values:</h1>
          <div class="degreeLine__panel-items">
              <degreeLineItem v-for="measure of measuresStore.sortedMeasures" :key="measure.id" 
               :measure="measure"
              @editIconClick="editMeasure"
              @deleteIconClick="handleDeleteClick" />
          </div>
        </div>
      </div>
</template>


<style lang="scss">
.degreeLine {
  &__nav {
    display:flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
  &__panel {
    width: 100%;
  }
}
</style>