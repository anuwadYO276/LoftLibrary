<template>
  <div class="flex flex-col h-screen bg-custombg text-gray-300 font-sans">
    <!-- Top Navbar -->
    <header
      class="flex items-center justify-between bg-custombg px-6 py-3 shadow relative"
    >
      <div class="flex items-center space-x-4">
        <h1
          class="text-cyan-custom text-2xl font-bold cursor-pointer"
          @click="selectView('home')"
        >
          LoftLibrary
        </h1>
        <button
          @click="selectView('home')"
          aria-label="Home"
          class="hover:text-cyan-custom"
        >
          
        </button>
      </div>

       <div class="flex items-center flex-grow max-w-lg mx-6">
    <!-- home -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-400 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 12l9-9 9 9v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3v-8z"
      />
    </svg>
    <!-- search -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search books or categories..."
      class="w-full rounded-md px-4 py-2 bg-custombg text-gray-200 placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-custom"
      @keyup.enter="performSearch"
    />
  </div>
  <!-- login/signup -->

      <div class="flex items-center space-x-4">
        <button @click="goToLogin" class="hover:text-cyan-custom">
          Login
        </button>
         <span class="text-gray-400">/</span>
        <button @click="goToSignup" class="hover:text-cyan-custom">
          Signup
        </button>
      </div>
    </header>

    <!-- Body layout -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-48 bg-custombg p-4 flex flex-col justify-between">
        <div>
          <nav class="space-y-4">
            <button
              @click="goToLogin"
              class="w-full text-left hover:text-cyan-custom"
            >
              Daily
            </button>
            <button
              @click="goToLogin"
              class="w-full text-left hover:text-cyan-custom"
            >
              History
            </button>
            <button
              @click="goToLogin"
              class="w-full text-left hover:text-cyan-custom"
            >
              Bookmark
            </button>
          </nav>
        </div>
        <div>
          <div
            class="bg-gray-800 aspect-video mb-4 rounded flex items-center justify-center text-gray-500"
          >
            No book is playing
          </div>
          <button
            @click="goToLogin"
            class="w-full bg-cyan-custom text-gray-900 font-semibold py-2 rounded hover:bg-dark-cyan transition"
          >
            ▶ Play
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-6 overflow-auto">
        <!-- Book sections -->
        <section v-for="(section, index) in sections" :key="index" class="mb-8">
          <h2 class="text-cyan-custom font-semibold mb-3">
            Recommend: {{ section.title }}
          </h2>
          <div
            class="flex space-x-4 overflow-x-auto hide-scrollbar horizontal-scroll"
          >
            <div
              v-for="book in filteredBooks(section.books)"
              :key="book.title"
              class="min-w-[110px] cursor-pointer"
              @click="goToBookPreview(book)"
            >
              <img
                :src="book.cover"
                alt="book cover"
                class="rounded-md w-full h-36 object-cover mb-1"
              />
              <div
                class="text-sm font-semibold truncate text-white w-full whitespace-normal leading-tight"
              >
                {{ book.title }}
              </div>

              <div class="flex items-center text-yellow-400 text-xs">
                <template v-for="star in 5">
                  <svg
                    v-if="star <= book.rating"
                    key="star-filled"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.385 2.455c-.783.57-1.838-.196-1.538-1.118l1.287-3.974a1 1 0 00-.364-1.118L3.615 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z"
                    />
                  </svg>
                  <svg
                    v-else
                    key="star-empty"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
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
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

onMounted(() => {
  const scrollers = document.querySelectorAll(".horizontal-scroll");

  scrollers.forEach((el) => {
    el.addEventListener("wheel", (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({
        left: e.deltaY,
      });
    });
  });
});

const router = useRouter();

const search = ref("");

const sections = [
  {
    title: "Horror",
    books: [
      {
        title: "All The Devils",
        cover: "src/covers/hr1.jpg",
        rating: 5,
      },
      {
        title: "Crowders",
        cover: "src/covers/hr2.jpg",
        rating: 4,
      },
      {
        title: "A Treachery of Swans",
        cover: "src/covers/hr3.jpg",
        rating: 5,
      },
      {
        title: "Asylum",
        cover: "src/covers/hr4.jpg",
        rating: 4,
      },
      {
        title: "Diavola",
        cover: "src/covers/hr5.jpg",
        rating: 4,
      },
      {
        title: "Metamorphosis",
        cover: "src/covers/hr6.jpg",
        rating: 5,
      },
      {
        title: "Dracula",
        cover: "src/covers/hr7.jpg",
        rating: 5,
      },
      {
        title: "Sour Candy",
        cover: "src/covers/hr8.jpg",
        rating: 5,
      },
      {
        title: "Mine",
        cover: "src/covers/hr9.jpg",
        rating: 5,
      },
      {
        title: "Sublime",
        cover: "src/covers/hr10.jpg",
        rating: 5,
      },
      {
        title: "Marrow",
        cover: "src/covers/hr11.jpg",
        rating: 5,
      },
      {
        title: "Old Wounds",
        cover: "src/covers/hr12.jpg",
        rating: 5,
      },
    ],
  },
  {
    title: "Fantasy",
    books: [
      {
        title: "Unwritten",
        cover: "src/covers/fs1.jpg",
        rating: 5,
      },
      {
        title: "Recruitment",
        cover: "src/covers/fs2.jpg",
        rating: 5,
      },
      {
        title: "Voice of Ancestors",
        cover: "src/covers/fs3.jpg",
        rating: 5,
      },
      {
        title: "Aothera",
        cover: "src/covers/fs4.jpg",
        rating: 5,
      },
      {
        title: "Never a Hero",
        cover: "src/covers/fs5.jpg",
        rating: 5,
      },
      {
        title: "The Darkening",
        cover: "src/covers/fs6.jpg",
        rating: 5,
      },
      {
        title: "Dames and Demons",
        cover: "src/covers/fs7.jpg",
        rating: 5,
      },
      {
        title: "Dragon’s Whisper",
        cover: "src/covers/fs8.jpg",
        rating: 5,
      },
      {
        title: "Shadow Warrior",
        cover: "src/covers/fs9.jpg",
        rating: 5,
      },
      {
        title: "Witch",
        cover: "src/covers/fs10.jpg",
        rating: 5,
      },
      {
        title: "Long Lost",
        cover: "src/covers/fs11.jpg",
        rating: 5,
      },
      {
        title: "Last Things",
        cover: "src/covers/fs12.jpg",
        rating: 5,
      },
    ],
  },
  {
    title: "Romance",
    books: [
      {
        title: "[K] Sweetie",
        cover: "src/covers/rm1.jpg",
        rating: 5,
      },
      {
        title: "My Beauty",
        cover: "src/covers/rm2.jpg",
        rating: 4,
      },
      {
        title: "Hello Cutie Pie",
        cover: "src/covers/rm3.jpg",
        rating: 5,
      },
      {
        title: "Stupid Cupid",
        cover: "src/covers/rm4.jpg",
        rating: 4,
      },
      {
        title: "Revenge Love",
        cover: "src/covers/rm5.jpg",
        rating: 4,
      },
      {
        title: "Crazy Honey",
        cover: "src/covers/rm6.jpg",
        rating: 5,
      },
      {
        title: "Billionaire Jin",
        cover: "src/covers/rm7.jpg",
        rating: 5,
      },
      {
        title: "Exchange Diary",
        cover: "src/covers/rm8.jpg",
        rating: 5,
      },
      {
        title: "Die For You",
        cover: "src/covers/rm9.jpg",
        rating: 5,
      },
      {
        title: "Hang (Gentle) Man",
        cover: "src/covers/rm10.jpg",
        rating: 5,
      },
      {
        title: "Perfect Match",
        cover: "src/covers/rm11.jpg",
        rating: 5,
      },
      {
        title: "Playful Comm-Arts",
        cover: "src/covers/rm12.jpg",
        rating: 5,
      },
    ],
  },
];

function filteredBooks(books) {
  if (!search.value) return books;
  const q = search.value.toLowerCase();
  return books.filter((b) => b.title.toLowerCase().includes(q));
}

function goToLogin() {
  router.push("/login");
}

function goToSignup() {
  router.push("/signup");
}

function goToBookPreview(book) {
  router.push({ name: "PreviewBook", query: { title: book.title } });
}
</script>

<style>
/* Optional: style for scrollbar on horizontal scroll */
.scrollbar-thin::-webkit-scrollbar {
  height: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #0bc5ea; 
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background-color: #1a202c; 
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; 
}
</style>
