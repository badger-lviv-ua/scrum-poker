<script setup lang="ts">
import ButtonItem from '@/components/ButtonItem.vue'
import InputItem from '@/components/InputItem.vue'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'

const { value } = useCurrentUser() ?? { value: {} }

const gameName = ref('')

const router = useRouter()

function navigateToGameView(id: string) {
  router.push(`/game/${id}`)
}

async function createRoom() {
  const { id } = await addDoc(collection(getFirestore(), 'rooms'), {
    name: gameName?.value,
    owner: value?.uid
  })
  navigateToGameView(id)
}
</script>

<template>
  <section class="max-w-md m-auto flex-1">
    <div class="flex flex-col flex-1">
      <InputItem label="Game's name" v-model="gameName" />
      <ButtonItem label="Create game" class="h-11 mt-6 w-full text-lg" @click="createRoom" />
    </div>
  </section>
</template>
