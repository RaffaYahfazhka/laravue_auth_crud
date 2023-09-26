<template>
    <div>
        <form @submit.prevent="registerUser" class="mb-20 grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="name" class="block uppercase font-bold text-gray-800 text-sm">
                name
              </label>
 
              <input type="text" id="name" name="first_name" v-model="formData.name" v-on:keypress="isLetter($event)"
                class="placeholder-gray-300 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-900 shadow-sm"
                placeholder="Masukkan nama lengkap anda" />
              <p v-if="errors.name" class="text-red-600 text-xs mt-2">{{ errors.name[0] }}</p>
            </div>
 
            <div class="col-span-6 sm:col-span-3">
              <label for="Email" class="block uppercase font-bold text-gray-800 text-sm">
                Email
              </label>
 
              <input type="email" id="email" name="email" v-model="formData.email"
                class="mt-1 placeholder-gray-300 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                placeholder="contoh : actionpay@gmail.com" />
              <p v-if="errors.email" class="text-red-600 text-xs mt-2">{{ errors.email[0] }}</p>
            </div>
 
            <div class="col-span-6">
              <label for="Password" class="block uppercase font-bold text-gray-800 text-sm">
                Password
              </label>

              <input type="password" id="password" name="password" v-model="formData.password" 
                class="mt-1 frmField w-full placeholder-gray-300 rounded-md border-gray-200 bg-white mb-5 text-sm text-gray-700 shadow-sm"
                placeholder="password" />
            </div>

            <div class="col-span-6">
              <label for="password_confirmation" class="block uppercase font-bold text-gray-800 text-sm">
                Password
              </label>

              <input type="password" id="password_confirmation" name="password_confirmation" v-model="formData.password_confirmation" 
                class="mt-1 frmField w-full placeholder-gray-300 rounded-md border-gray-200 bg-white mb-5 text-sm text-gray-700 shadow-sm"
                placeholder="password_confirmation" />
            </div>

              <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                <!-- @click="submitForm" :style="privacyChecked ? normalStyle : errorStyle" -->
                <button type="submit"
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-transparent 
              px-12 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-600 
              hover:text-white focus:outline-none focus:ring active:text-blue-500">
              Register</button>
            </div>

          </form>
    </div>
</template>

<script>
import axios from "axios";
import api from "../api"
import router from "../router";
import { store } from "../store";


export default {
  data() {
    return {
      authenticated: false,
      showAlert: false,
      formData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {},
    };
  },
  methods: {
    registerUser() {
      api.post('api/register', this.formData)
        .then(response => {
          router.push('/login');
          // Tangani respons setelah pendaftaran berhasil
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: true,
            icon: 'success',
            title: 'Berhasil Registrasi',
            text: 'Registrasi success',
            html: `
              <ul>
                <li class="font-normal text-gray-800 text-md">Nama Lengkap : ${this.formData.name}</li>
                <li class="font-normal text-gray-800 text-md">Email : ${this.formData.email}</li>
              </ul>
            `,
          });
          console.log(response.data);
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.errors) {
            this.errors = error.response.data.errors;
          } else {
            this.errors = {};
          }
        });
    },
    setAuthorizationHeader(data) {
      // Set the bearer token in the Authorization header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;
      // Store the token in localStorage or sessionStorage
      localStorage.setItem("token", data.access_token);
      // Alternatively, you can use sessionStorage for a session-based token
      // sessionStorage.setItem('token', token);
    },
    clearAuthorizationHeader() {
      // Clear the bearer token from the Authorization header
      delete axios.defaults.headers.common["Authorization"];
      // Remove the token from localStorage or sessionStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userdata");
      // Alternatively, remove from sessionStorage
      // sessionStorage.removeItem('token');
    },
  }
}
</script>
