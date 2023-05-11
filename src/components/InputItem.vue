<script setup lang="ts">
import { defineProps, type InputHTMLAttributes } from 'vue'

export interface InputItemProps extends InputHTMLAttributes {
  label: string
}

defineProps<InputItemProps>()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  inheritAttrs: false
})
</script>

<template>
  <label
    v-bind="$attrs?.id ? { for: $attrs?.id } : ''"
    class="block text-sm font-medium leading-6 text-gray-900"
    >{{ label }}</label
  >
  <div class="mt-2">
    <input
      v-bind="$attrs"
      :class="[
        $attrs.class,
        'block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 outline-amber-600'
      ]"
    />
  </div>
</template>
