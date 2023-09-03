<script setup lang="ts">
  import { Warning } from '../../warning';
  import APopup from '../a_popup/a_popup.vue';
  import './s_delete_popup.scss';

  const props = defineProps<{visible:Boolean, warning:Warning}>();
  const emit = defineEmits(['close-popup','deleteCurrentData']);

  function deleteCurrentData() {
    props.warning.callback();
    emit('deleteCurrentData');
    emit('close-popup');
  };
</script>
 // ### Поменять классы
<template>
  <a-popup class="s-delete-popup" :visible="visible" @close="$emit('close-popup')">
    <h3 class="s-delete-popup__title">
      Вы уверены, что хотите {{ warning.text }}?
    </h3>
    <div class="s-delete-popup__btns">
      <button class="a-font_button s-delete-popup__btns-yes" @click="deleteCurrentData">Да</button>
      <button class="a-font_button s-delete-popup__btns-no" @click="$emit('close-popup')">Нет</button>
    </div>
  </a-popup>
</template>


