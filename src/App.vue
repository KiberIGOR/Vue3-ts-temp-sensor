<script setup lang="ts">
import sDeletePopup from "./components/s-delete-popup/s_delete_popup.vue";
import { useWarning } from './stores/warning';
const warningStore = useWarning();

</script>

<template>
  <section class="section">
    <div class="container">
      <router-view />
    </div>
  </section>
  <sDeletePopup
  :visible="warningStore.isVisible" 
  :warning="warningStore.warningObj" 
  @close-popup="warningStore.toggleIsVisiblePopup(false)"
  />
</template>

<style lang="scss">
@import "./assets/css/fonts.css";
@import "./assets/css/common/_style.scss";
@import "./assets/css/common/responsive.scss";
</style>
