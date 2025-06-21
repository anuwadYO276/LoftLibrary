<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center font-sans text-gray-300">
    <div class="flex bg-custombg rounded-md overflow-hidden w-full max-w-4xl shadow-lg min-h-[500px]">
      <div class="w-1/2 p-10 flex flex-col justify-center">
        <h1 class="text-cyan-custom text-2xl font-semibold mb-6 text-center">
          Loft Library Login
        </h1>
        <form @submit.prevent="submitLogin" class="space-y-5">
          <div>
            <label for="identifier" class="block mb-1 text-sm">Email or Username</label>
            <input
              id="identifier"
              v-model="identifier"
              type="text"
              placeholder="Your email or username"
              required
              class="w-full px-3 py-2 rounded bg-customwhite text-custombg focus:outline-none focus:ring-2 focus:ring-cyan-custom"
            />
          </div>
          <div>
            <label for="password" class="block mb-1 text-sm">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Your password"
              required
              class="w-full px-3 py-2 rounded bg-customwhite text-custombg focus:outline-none focus:ring-2 focus:ring-cyan-custom"
            />
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              class="w-1/2 bg-cyan-custom text-custombg py-2 rounded font-semibold hover:bg-dark-cyan transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <div class="w-1/2 p-10 flex flex-col justify-center items-center border-l border-gray-700">
        <h2 class="text-cyan-custom text-2xl font-semibold mb-4">Welcome back!</h2>
        <p class="text-center text-sm text-customwhite mb-6">
          Welcome back! We are so happy to have you here.<br />
          It's great to see you again. We hope you had a safe and enjoyable time away.
        </p>
        <p class="text-sm text-customwhite">
          No account yet?
          <router-link to="/signup" class="text-dark-cyan hover:underline ml-1">Signup</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const identifier = ref('')
const password = ref('')
const router = useRouter()

function submitLogin() {
  const value = identifier.value.trim()
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) // simple regex

  if (!value || !password.value) {
    alert('Please enter both identifier and password.')
    return
  }

  alert(`Logging in with ${isEmail ? 'Email' : 'Username'}: ${value}`)
  
  // TODO: call your auth API here...
  router.push('/reader-desktop')
}
</script>
