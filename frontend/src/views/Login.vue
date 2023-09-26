<template>
  <div>
    <form
              @submit.prevent="login"
              class="grid grid-cols-6 gap-6 lg:mb-40 mb-0"
            >
              <div class="col-span-6">
                <label
                  for="Email"
                  class="block uppercase font-bold text-gray-800 text-sm"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  v-model="email"
                  class="mt-1 placeholder-gray-300 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="contoh: actionpay@gmail.com"
                />
                <p v-if="errors.email" class="text-red-600 text-xs mt-2">
                  {{ errors.email[0] }}
                </p>
              </div>

              <div class="col-span-6">
                <label
                  for="Password"
                  class="block uppercase font-bold text-gray-800 text-sm"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  v-model="password"
                  class="mt-1 placeholder-gray-300 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="contoh: Actionpay123."
                />
                <p v-if="errors.password" class="text-red-600 text-xs mt-2">
                  {{ errors.password[0] }}
                </p>
              </div>

              <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  class="inline-block shrink-0 rounded-md border border-blue-600 bg-transparent px-12 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:text-blue-500"
                >
                  Login
                </button>

                <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                  Not have account?
                  <a href="/register" class="text-blue-500 hover:text-blue-700"
                    >Sign-Up</a
                  >.
                </p>

               
              </div>
            </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import { store } from "../store";


export default {
  data() {
    return {
      authenticated: false,
      showAlert: false,
      email: store.state.email,
      password: null,
      name: "",
      errors: {},
    };
  },
  methods: {
    login() {
      // Send login request to the server using Axios
      const token = localStorage.getItem("token");

      axios
        .post("localhost:8000/api/login", {
          email: this.email,
          password: this.password,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          //check if login successfull
          if (response.content.token != undefined) {
            //axios set authorization token for get data of me
            const config = {
              headers: {
                Authorization: `Bearer ${response.content.token}`,
              },
            };
            axios
              .post("localhost:8000/api/user", {}, config)
              .then((res) => {
                let users = res;
                console.log(users);
                localStorage.setItem("user", JSON.stringify(users));
                store.commit("update", users.name);
                this.name = store.state.name;
                this.setAuthorizationHeader(response.content);
                this.authenticated = true;
              })
              .catch((err) => {
                console.log("error");
              });
          }
        })
        .catch((error) => {
          // Handle login error
          if (
            error.response &&
            error.response &&
            error.response.errors
          ) {
            this.errors = error.response.errors;
          } else {
            this.errors = {};
          }
          console.log("error");
        });
    },
    setAuthorizationHeader(data) {
      // Set the bearer token in the Authorization header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;
      // Store the token in localStorage or sessionStorage
      localStorage.setItem("token", data.token);
      // Alternatively, you can use sessionStorage for a session-based token
      // sessionStorage.setItem('token', token);
    },
    clearAuthorizationHeader() {
      // Clear the bearer token from the Authorization header
      delete axios.defaults.headers.common["Authorization"];
      // Remove the token from localStorage or sessionStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Alternatively, remove from sessionStorage
      // sessionStorage.removeItem('token');
    },
  },
  created() {
    // Check if a token is present in localStorage (or sessionStorage)
    const token = localStorage.getItem("token");
    const userdt = localStorage.getItem("user");
    const data = {
      token: token,
      user: JSON.parse(userdt),
    };
    // Alternatively, use sessionStorage for a session-based token
    // const token = sessionStorage.getItem('token');
    if (token) {
      // Set the token in the Authorization header and mark the user as authenticated
      this.setAuthorizationHeader(data);
      this.authenticated = true;
      let user = JSON.parse(userdt);

      this.email = user.email;
      this.name = user.name;
    }
  },
}
</script>
