<script setup lang="ts">
import { computed, ref } from 'vue';
import './a_input.scss';
const props = defineProps<{label:string, value: number | string, disabled?:boolean, isError?:boolean}>();
const emit = defineEmits(['update:value']);
const touched = ref(false);
const computedValue = computed({
      get() {
        return props.value;
      },
      set(newValue) {
        emit('update:value', newValue);
      },
    })
</script>

<template>
			<div class="a-input__container">
          <p class="a-input__label">{{label}}</p>
          <input v-if="disabled" class="a-input__input disabled" :value="value" disabled/>
          <input v-else class="a-input__input" :class="{'--error': isError && !touched}" @focus="touched = true" @blur="touched = false" v-model="computedValue"/>
      </div>
</template>
