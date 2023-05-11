<script setup lang="ts">
import ButtonItem from '@/components/ButtonItem.vue'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

async function signIn() {
  const provider = new GoogleAuthProvider()

  await signInWithPopup(getAuth(), provider)
  router.push(`/new-game`)
}
</script>

<template>
  <section class="max-w-md m-auto flex-1">
    <div class="flex flex-col flex-1">
      <ButtonItem @click="signIn" label="Sign In" class="h-11 mt-6 w-full text-lg" />
    </div>
  </section>
</template>
