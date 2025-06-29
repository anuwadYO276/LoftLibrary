<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center font-sans text-gray-300">
    <div class="flex bg-custombg rounded-md overflow-hidden w-full max-w-4xl shadow-lg">
      
      <!-- Left Section (Welcome message) -->
      <div class="w-1/2 p-8 flex flex-col justify-center items-center border-r border-gray-700">
        <h2 class="text-cyan-custom text-2xl font-semibold mb-4">Come join us!</h2>
        <p class="text-center text-sm text-customwhite mb-6">
          We are so excited to have you here. <br> If you haven't already, create an account to <br>get access to exclusive offers.
        </p>
        <p class="text-sm text-customwhite">
          Already have an account?
          <router-link to="/login" class="text-dark-cyan hover:underline">Login</router-link>
        </p>
      </div>

      <!-- Right Section (Signup form) -->
      <div class="w-1/2 p-8">
        <h1 class="text-cyan-custom text-2xl font-semibold mb-6 text-center">Loft Library Signup</h1>
        <form @submit.prevent="submitSignup" class="space-y-5">
          <div>
            <label for="email" class="block mb-1 text-sm">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Your email"
              required
              class="w-full px-3 py-2 rounded bg-customwhite text-custombg focus:outline-none focus:ring-2 focus:ring-cyan-custom"
            />
          </div>
          <div>
            <label for="username" class="block mb-1 text-sm">Username</label>
            <input
              id="username"
              v-model="username"
              type="username"
              placeholder="Your username"
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
              placeholder="Create password"
              required
              class="w-full px-3 py-2 rounded bg-customwhite text-custombg focus:outline-none focus:ring-2 focus:ring-cyan-custom"
            />
          </div>
          <div>
            <label for="passwordConfirm" class="block mb-1 text-sm">Confirm Password</label>
            <input
              id="passwordConfirm"
              v-model="passwordConfirm"
              type="password"
              placeholder="Confirm password"
              required
              class="w-full px-3 py-2 rounded bg-customwhite text-custombg focus:outline-none focus:ring-2 focus:ring-cyan-custom"
            />
          </div>
          <div class="flex justify-center">
          <button
            type="submit"
            class="w-1/2 bg-cyan-custom text-custombg py-2 rounded font-semibold hover:bg-dark-cyan transition"
          >
            Signup
          </button>
          </div>
        </form>
        <p class="mt-4 text-center text-sm text-gray-500">
          Are you an author?
          <router-link to="/author-signup" class="text-dark-cyan hover:underline">Register here</router-link>
        </p>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const username = ref('')
const password = ref('')
const passwordConfirm = ref('')
const router = useRouter()

async function submitSignup() {
  if (password.value !== passwordConfirm.value) {
    alert("Passwords don't match")
    return
  }
  // alert(`Signing up with ${email.value}`)
  // // router.push('/reader-desktop')

  try{
    // console.log(value, password)
    const Register = await axios.post(`${import.meta.env.VITE_API_URL}/signup/reader`,{ //เรียกใช้ env
      username : username.value,
      email : email.value, 
      password: password.value
    })
  } catch(err){
    if(err instanceof AxiosError){
      alert(err.response?.data.message || "System has problem. Please try again later.")
    }
    console.error(err)
    // alert(``)
  }


   router.push('/reader-desktop')
}
</script>

