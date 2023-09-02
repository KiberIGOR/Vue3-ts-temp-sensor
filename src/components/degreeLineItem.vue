<script setup lang="ts">
import { Measure } from '../measure';

defineProps<{measure: Measure}>();

defineEmits(['editIconClick', 'deleteIconClick']);
</script>

// Подумать и поменять название класса
<template>
  <div class="panel-item">
    <div class="panel-item__values">
      <p class="panel-item__id text">id: {{measure.id}}</p>
      <p class="panel-item__temp text">Temp: {{measure.temp}}°C</p>
    </div>
    <div class="panel-item__change">
      <img src="../assets/img/edit.png" class="panel-item__edit" @click="$emit('editIconClick', measure)" alt="Temp edit" />
      <img src="../assets/img/delete.png" class="panel-item__delete" @click="$emit('deleteIconClick', measure)" alt="Temp delete" />
    </div>
  </div>
</template>


<style lang="scss">
  .panel-item {
      padding: 1.2rem 1.6rem;
      display:flex;
      justify-content: space-between;  
      align-items: center;
      border-bottom: 0.1rem solid #ededed;
      
      &__id {
        margin: 0;
        color:  rgb(146, 144, 144);
      }
      
      &__temp {
        margin: 0;
      }
      
      &__change {
        display: flex;
        align-items: center;
      }
      
      &__edit {
        max-width: 1.8rem;
        margin-right: 1rem;
        cursor: pointer;
        @media (min-width: 767px) { 
          max-width: 2rem;
          margin-right: 1.2rem;
        }
        @media (min-width: 1200px) { 
          max-width: 2.2rem;
        }
      }
      
      &__delete {
        max-width: 2.2rem;
        cursor: pointer;
        @media (min-width: 767px) { 
          max-width: 2.4rem;
        }
        @media (min-width: 1200px) { 
          max-width: 2.6rem;
        }
      }
    }
</style>