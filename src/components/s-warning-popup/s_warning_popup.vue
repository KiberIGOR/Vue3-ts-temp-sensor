<script setup lang="ts">
import { Warning } from '../../warning';
import APopup from '../a_popup/a_popup.vue';
import './s_warning_popup.scss';

const props = defineProps<{ visible: Boolean; warning: Warning }>();
const emit = defineEmits(['close-popup']);

function UseCallback() {
  //Выполняем переданную замкнутую функцию delete/cansel
  props.warning.callback(); 
  emit('close-popup');
}
</script>
<template>
  <a-popup class="s-warning-popup" :visible="visible" @close="$emit('close-popup')">
    <h3 class="s-warning-popup__title">Вы уверены, что хотите {{ warning.text }}?</h3>
    <div class="s-warning-popup__btns">
      <button class="s-warning-popup__btns-yes button button_3" @click="UseCallback()">Да</button>
      <button class="s-warning-popup__btns-no button button_3" @click="$emit('close-popup')">Нет</button>
    </div>
  </a-popup>
</template>
