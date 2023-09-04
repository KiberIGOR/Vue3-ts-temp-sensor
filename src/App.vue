<script setup lang="ts">
import sWarningPopup from './components/s-warning-popup/s_warning_popup.vue';
import { useWarning } from './stores/warning';
const warningStore = useWarning();
</script>

<template>
  <section class="section">
    <div class="container">
      <router-view />
    </div>
  </section>
  <sWarningPopup
    :visible="warningStore.isVisible"
    :warning="warningStore.warningObj"
    @close-popup="warningStore.toggleIsVisiblePopup(false)"
  />
</template>

<style lang="scss">
@import './assets/css/fonts.css';
@import './assets/css/common/_style.scss';
@import './assets/css/common/responsive.scss';
</style>
