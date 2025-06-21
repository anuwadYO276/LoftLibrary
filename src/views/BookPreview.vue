<template>
  <div class="bg-gray-900 min-h-screen text-gray-300 font-sans p-6">
    <button @click="goBack" class="mb-6 text-cyan-400 hover:underline flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>

    <div class="flex gap-6">
      <img :src="book.cover" alt="book cover" class="w-32 h-48 rounded-md object-cover" />
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-white mb-2">{{ book.title }}</h1>
        <div class="flex gap-2 mb-3 text-xs">
          <span
            v-for="tag in book.tags"
            :key="tag"
            class="bg-gray-700 rounded-full px-2 py-0.5 cursor-pointer hover:bg-cyan-500"
          >
            {{ tag }}
          </span>
        </div>
        <p class="mb-3">{{ book.description }}</p>
        <div class="flex items-center gap-4 mb-3">
          <div class="flex items-center text-yellow-400 text-sm">
            <template v-for="star in 5">
              <svg
                v-if="star <= book.rating"
                :key="'star-filled-' + star"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.385 2.455c-.783.57-1.838-.196-1.538-1.118l1.287-3.974a1 1 0 00-.364-1.118L3.615 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z"
                />
              </svg>
              <svg
                v-else
                :key="'star-empty-' + star"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.538 1.118L12 13.347l-3.385 2.455c-.783.57-1.838-.196-1.538-1.118l1.287-3.974a1 1 0 00-.364-1.118L6.615 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z"
                />
              </svg>
            </template>
          </div>

          <div>
            <button
              @click="unlockAll"
              class="bg-cyan-400 text-gray-900 text-xs font-semibold rounded px-3 py-1 hover:bg-cyan-500"
            >
              Unlock all episodes {{ book.unlockPrice }} C
            </button>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-2">All episodes ({{ book.episodes.length }})</h3>
          <ul>
            <li
              v-for="episode in book.episodes"
              :key="episode.id"
              class="flex items-center justify-between mb-2 bg-gray-800 p-2 rounded cursor-pointer hover:bg-cyan-700"
            >
              <div class="flex items-center gap-3">
                <span class="font-semibold">#{{ episode.number }}</span>
                <span>{{ episode.title }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span
                  v-if="episode.locked"
                  class="bg-cyan-400 text-gray-900 px-2 py-0.5 rounded text-xs flex items-center gap-1"
                >
                  {{ episode.price }} C
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 3-2 3-2-1.9-2-3z"
                    />
                  </svg>
                </span>
                <span v-else class="text-green-400 text-xs">Free</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const allBooks = [
  {
    title: 'All The Devils',
    cover: '/covers/all-the-devils.jpg',
    tags: ['Horror', 'Dark'],
    description: 'A terrifying story of the unknown.',
    rating: 5,
    unlockPrice: 40,
    episodes: [
      { id: 1, number: 1, title: 'Episode 1', locked: false, price: 0 },
      { id: 2, number: 2, title: 'Episode 2', locked: true, price: 5 },
      { id: 3, number: 3, title: 'Episode 3', locked: true, price: 5 },
      { id: 4, number: 4, title: 'Episode 4', locked: true, price: 5 },
      { id: 5, number: 5, title: 'Episode 5', locked: true, price: 5 },
      { id: 6, number: 6, title: 'Episode 6', locked: true, price: 5 },
      { id: 7, number: 7, title: 'Episode 7', locked: true, price: 5 },
      { id: 8, number: 8, title: 'Episode 8', locked: true, price: 5 },
    ],
  },
 
]

const bookTitle = route.query.title || ''
const book = computed(() => allBooks.find((b) => b.title === bookTitle) || allBooks[0])

function goBack() {
  router.back()
}

function unlockAll() {
  alert(`Unlock all episodes for ${book.value.unlockPrice} C`)
}
</script>
