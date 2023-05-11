<script setup lang="ts">
import ButtonItem from '@/components/ButtonItem.vue'
import DeskItem from '@/components/DeskItem.vue'
import { ref, type Ref } from 'vue'

const cards = [1, 2, 3, 5, 8, 13, 21, '?', '☕']

const selectionsLeft = [1, 2]
const selectionsTop = [3, 4, 5]
const selectionsRight = [6, 7]
const selectionsBottom = [8, 9, 10]

const selectedCardIdx: Ref<number | undefined> = ref()

function selectCard(idx: number): void {
  selectedCardIdx.value = idx
}
</script>

<template>
  <section class="flex flex-col flex-1 justify-between overflow-hidden w-full">
    <div class="flex flex-1 items-center justify-center p-10">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-2 flex flex-col items-end justify-center gap-2">
          <ButtonItem
            v-for="left in selectionsLeft"
            :key="left"
            :label="left.toString()"
            class="w-12 h-16 hover:bg-amber-500 cursor-default"
          />
        </div>

        <div class="col-span-8">
          <div class="flex justify-center gap-3 mb-3">
            <ButtonItem
              v-for="top in selectionsTop"
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
              v-for="bottom in selectionsBottom"
              :key="bottom"
              :label="bottom.toString()"
              class="w-12 h-16 hover:bg-amber-500 cursor-default"
            />
          </div>
        </div>

        <div class="col-span-2 flex flex-col items-start justify-center gap-2">
          <ButtonItem
            v-for="right in selectionsRight"
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
                'hover:mb-1 text-orange-400 bg-white border-amber-500 border-2 hover:bg-amber-50':
                  i !== selectedCardIdx
              },
              {
                'mb-3 hover:mb-3 bg-orange-400 hover:bg-orange-400 text-white':
                  i === selectedCardIdx
              }
            ]"
          />
        </li>
      </ul>
    </footer>
  </section>
</template>
