<script setup lang="ts">
import ButtonItem from '@/components/ButtonItem.vue'
import InputItem from '@/components/InputItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateToGameView() {
  router.push(`/game/${crypto.randomUUID()}`)
}
</script>

<template>
  <section class="max-w-md m-auto flex-1">
    <div class="flex flex-col flex-1">
      <InputItem label="Game's name" />
      <ButtonItem
        label="Create game"
        class="h-11 mt-6 w-full text-lg"
        @click="navigateToGameView"
      />
    </div>
  </section>
</template>
