<script setup>
//import ref
import { ref, onMounted } from "vue";

//import router
import { useRouter, useRoute } from "vue-router";

//import api
import api from "../../api";

//init router
const router = useRouter();

//init route
const route = useRoute();

//define state
const image = ref("");
const nama = ref("");
const status = ref("");
const errors = ref([]);

//onMounted
onMounted(async () => {
  //fetch detail data post by ID
  await api.get(`/api/posts/${route.params.id}`).then((response) => {
    //set response data to state
    nama.value = response.data.data.nama;
    status.value = response.data.data.status;
  });
});

//method for handle file changes
const handleFileChange = (e) => {
  //assign file to state
};

//method "updatePost"
const updatePost = async () => {
  //init formData
  let formData = new FormData();

  //assign state value to formData
  formData.append("nama", nama.value);
  formData.append("status", status.value);
  formData.append("_method", "PATCH");

  //store data with API
  await api
    .post(`/api/posts/${route.params.id}`, formData)
    .then(() => {
      //redirect
      router.push({ path: "/posts" });
    })
    .catch((error) => {
      //assign response error data to state "errors"
      errors.value = error.response.data;
    });
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <form @submit.prevent="updatePost()">
              <div class="mb-3">
                <label class="form-label fw-bold">nama</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="nama"
                  placeholder="nama Post"
                />
                <div v-if="errors.nama" class="alert alert-danger mt-2">
                  <span>{{ errors.nama[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Status</label>
                <select name="status" id="status" v-model="status">
                  <option value="Aktif">Aktif</option>
                  <option value="TidakAktif">Tidak Aktif</option>
                </select>
                <div v-if="errors.status" class="alert alert-danger mt-2">
                  <span>{{ errors.status[0] }}</span>
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-md btn-primary rounded-sm shadow border-0"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
