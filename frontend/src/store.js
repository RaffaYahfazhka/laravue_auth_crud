import Vuex from "vuex";


const udt = JSON.parse(localStorage.getItem("user"));
export const store = new Vuex.Store({
  state() {
    return {
      name: udt != undefined ? udt.name : "",
      email: udt != undefined ? udt.email : "",
    };
  },
  mutations: {
    update(state, payload) {
      state.name = payload;
      state.logout = payload;
    },
  },
  getters: {
    name: function (state) {
      return state.name;
    },
  },
});