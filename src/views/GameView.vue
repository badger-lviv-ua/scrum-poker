<script setup lang="ts">
import ButtonItem from '@/components/ButtonItem.vue'
import DeskItem from '@/components/DeskItem.vue'
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { computed, onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCurrentUser, useDocument } from 'vuefire'
const { params } = useRoute()

type Room = {
  name: string
  owner: string
  activeUsers: ActiveUser
  // TODO: Implement reveal cards UI
  isCardsRevealed: boolean
}

// TODO: Implement UI for setting users display name
// TODO: Change activeUsers of type string[] to type ActiveUser[]
type ActiveUser = {
  uid: string
  displayName: string
  selectedValue: string
}

const router = useRouter()
const roomRef = doc(collection(getFirestore(), 'rooms'), params?.id?.toString())
const room = useDocument(roomRef)
const { value } = useCurrentUser() ?? {}
const cards: string[] = ['1', '2', '3', '5', '8', '13', '21', '?', '☕']

const tableLeftPlayers = computed(() => {
  const activeUsers: string[] = [...(room.value?.activeUsers ?? [])]
  return activeUsers.filter((_: string, idx: number) => idx <= 1)
})

const tableTopPlayers = computed(() => {
  const activeUsers: string[] = [...(room.value?.activeUsers ?? [])]
  return activeUsers.filter((_: string, idx: number) => idx >= 2 && idx <= 4)
})

const tableRightPlayers = computed(() => {
  const activeUsers: string[] = [...(room.value?.activeUsers ?? [])]
  return activeUsers.filter((_: string, idx: number) => idx >= 5 && idx <= 6)
})

const tableBottomPlayers = computed(() => {
  const activeUsers: string[] = [...(room.value?.activeUsers ?? [])]
  return activeUsers.filter((_: string, idx: number) => idx >= 7 && idx <= 9)
})

const selectedCardIdx: Ref<number | undefined> = ref()

function selectCard(idx: number): void {
  selectedCardIdx.value = idx
}

onMounted(() => {
  setUserActiveInRoom()
})

onUnmounted(() => {
  setUserInActiveInRoom()
})

async function setUserInActiveInRoom() {
  const updated = {
    ...room.value,
    activeUsers: room.value?.activeUsers?.filter((id: string) => id !== value?.uid)
  }

  await updateDoc(roomRef, updated)
}

function setUserActiveInRoom() {
  const unsubscribe = watch(
    () => room.value,
    async (room) => {
      const isUserAlreadyInRoom: boolean = room?.activeUsers.includes(value?.uid)
      if (isUserAlreadyInRoom) {
        return
      }
      const isRoomFull: boolean = room?.activeUsers?.length === 10

      if (isRoomFull) {
        alert('Cant join the room, since the room is full')
        router.back()
        return
      }

      if (isUserAlreadyInRoom) {
        return
      }

      const updated = {
        ...room,
        activeUsers: [...(room?.activeUsers ?? []), value?.uid]
      }

      await updateDoc(roomRef, updated)

      unsubscribe()
    }
  )
}
</script>

<template>
  <section class="flex flex-col flex-1 justify-between overflow-hidden w-full">
    <div class="flex flex-1 items-center justify-center p-10">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-2 flex flex-col items-end justify-center gap-2">
          <ButtonItem
            v-for="left in tableLeftPlayers"
            :key="left"
            :label="left.toString()"
            class="w-12 h-16 hover:bg-amber-500 cursor-default"
          />
        </div>

        <div class="col-span-8">
          <div class="flex justify-center gap-3 mb-3">
            <ButtonItem
              v-for="top in tableTopPlayers"
              :key="top"
              :label="top.toString()"
              class="w-12 h-16 hover:bg-amber-500 cursor-default"
            />
          </div>
          <DeskItem class="">
            <p class="text-black">Pick your cards!</p>
          </DeskItem>
          <div class="flex justify-center gap-3 mt-3">
            <ButtonItem
              v-for="bottom in tableBottomPlayers"
              :key="bottom"
              :label="bottom.toString()"
              class="w-12 h-16 hover:bg-amber-500 cursor-default"
            />
          </div>
        </div>

        <div class="col-span-2 flex flex-col items-start justify-center gap-2">
          <ButtonItem
            v-for="right in tableRightPlayers"
            :key="right"
            :label="right.toString()"
            class="w-12 h-16 hover:bg-amber-500 cursor-default"
          />
        </div>
      </div>
    </div>

    <footer class="relative h-40 border bg-white flex items-center justify-center">
      <p class="absolute top-1 text-xl">Pick a card</p>
      <ul class="relative mt-4 flex gap-5 overflow-x-auto h-full px-5 items-center">
        <li v-for="(card, i) in cards" :key="card">
          <ButtonItem
            :label="card.toString()"
            @click="selectCard(i)"
            :class="[
              'text-xl h-24 min-w-[3.5rem] w-14 transform duration-200',
              {
                'hover:mb-1 text-amber-500 bg-white border-amber-500 border-2 hover:bg-amber-50':
                  i !== selectedCardIdx
              },
              {
                'mb-3 hover:mb-3 bg-amber-500 hover:bg-amber-500 text-white': i === selectedCardIdx
              }
            ]"
          />
        </li>
      </ul>
    </footer>
  </section>
</template>
