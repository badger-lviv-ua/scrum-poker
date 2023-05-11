<script setup lang="ts">
import { defineProps, type ButtonHTMLAttributes } from 'vue'

export interface ButtonItem extends ButtonHTMLAttributes {
  label?: string
}

defineProps<ButtonItem>()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  inheritAttrs: false
})
</script>

<template>
  <button
    v-bind="$attrs"
    :class="[
      'rounded-md bg-amber-500 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500',
      $attrs.class
    ]"
  >
    {{ label }}
  </button>
</template>
