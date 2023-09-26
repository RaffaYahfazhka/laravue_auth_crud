<template>
  <div>
    <header class="sticky top-0 z-50 owowo">
      <div class="bg-gray-50 shadow-md">
        <div
          class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
        >
          <div class="flex items-center gap-4 md:order-2">
            <!-- ------------------------------------------------------------------------- --><!-- ------------------------------------------------------------------------- -->

            <div v-if="authenticated">
              <div class="flex items-center gap-4">
                <button
                  id="dropdownUserAvatarButton"
                  data-dropdown-toggle="dropdownAvatar"
                  class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0"
                  type="button"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="w-8 h-8 mr-2 rounded-full"
                    src="https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
                    alt="user photo"
                  />
                  <span
                    class="text-gray-700 bg-transparent text-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-800 md:dark:hover:duration-500 md:p-0 dark:text-blue-900 md:dark:hover:text-blue-600 md:dark:hover:bg-transparent dark:border-gray-700"
                    >{{ $store.state.name }}</span
                  >
                  <svg
                    class="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <button
                  data-collapse-toggle="mobile-menu-language-select"
                  type="button"
                  class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-200 dark:focus:ring-gray-600"
                  aria-controls="mobile-menu-language-select"
                  aria-expanded="false"
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <!-- Dropdown menu -->
                <div
                  id="dropdownAvatar"
                  class="z-10 hidden bg-gray-100 divide-y text-gray-800 rounded-lg shadow w-44"
                >
                  <div class="px-4 py-3 text-sm text-gray-800">
                    <div>{{ $store.state.name }}</div>
                    <div class="font-medium truncate">
                      {{ $store.state.email }}
                    </div>
                  </div>
                  <div class="py-2">
                    <a
                      @click="logout"
                      class="block px-4 py-2 text-sm bg-gray-100 text-blue-900 hover:text-blue-600 transition"
                      >Sign Out</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="flex items-center gap-4">
                <RouterLink
                  to="/login"
                  class="text-sm text-gray-700 hover:text-blue-800 no-underline"
                  >Login</RouterLink
                >
                <RouterLink
                  to="/register"
                  class="text-sm text-gray-700 hover:text-blue-800 no-underline"
                  >Sign-Up
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
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
          // Handle successful login
          router.push("/posts");
          const token = response.token;
          console.log(token);
          this.setAuthorizationHeader(response);
          this.authenticated = true;
          let user = response.user;
          store.commit("update", user.name);
          this.name = store.state.name;

          console.log("success");
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
    logout() {
      // Clear token and reset authentication status
      this.clearAuthorizationHeader();
      this.authenticated = true;
      this.email = "";
      this.password = "";
      this.name = "";
      window.location.href = "/posts";
      router.push("/posts");
    },
    setAuthorizationHeader(data) {
      // Set the bearer token in the Authorization header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;
      // Store the token in localStorage or sessionStorage
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
      // Alternatively, you can use sessionStorage for a session-based token
      // sessionStorage.setItem('token', token);
    },
  },
  created() {
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
};
</script>
