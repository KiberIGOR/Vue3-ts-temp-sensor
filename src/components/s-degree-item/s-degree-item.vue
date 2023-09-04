<script setup lang="ts">
import { Measure } from '../../measure';
import './s_degree-item.scss';
defineProps<{measure: Measure}>();

defineEmits(['editIconClick', 'deleteIconClick']);
</script>

// Подумать и поменять название класса
<template>
  <div class="degree-item">
    <div class="degree-item__values">
      <p class="degree-item__id text">id: {{measure.id}}</p>
      <p class="degree-item__temp text">Temp: {{measure.temp}}°C</p>
    </div>
    <div class="degree-item__change">
      <img src="../../assets/img/edit.png" class="degree-item__edit" @click="$emit('editIconClick', measure)" alt="Temp edit" />
      <img src="../../assets/img/delete.png" class="degree-item__delete" @click="$emit('deleteIconClick', measure)" alt="Temp delete" />
    </div>
  </div>
</template>