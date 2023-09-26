<template>
    <div class="container mt-5 mb-5">
      <div class="row">
        <div class="col-md-12">
          <router-link
            :to="{ name: 'posts.create' }"
            class="btn btn-md btn-success rounded shadow border-0 mb-3"
          >
            ADD NEW POST
          </router-link>
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <table class="table table-bordered">
                <thead class="bg-dark text-white">
                  <tr>
                    <th scope="col">nama</th>
                    <th scope="col">Status</th>
                    <th scope="col" style="width: 15%">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="posts.length === 0">
                    <td colspan="4" class="text-center">
                      <div class="alert alert-danger mb-0">
                        Data Belum Tersedia!
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="post in posts" :key="post.id">
                    <td>{{ post.nama }}</td>
                    <td>{{ post.status }}</td>
                    <td class="text-center">
                      <router-link
                        :to="{ name: 'posts.edit', params: { id: post.id } }"
                        class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                      >
                        EDIT
                      </router-link>
                      <button
                        @click.prevent="deletePost(post.id)"
                        class="btn btn-sm btn-danger rounded-sm shadow border-0"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '../../api';
  
  const posts = ref([]);
  
  const fetchDataPosts = async () => {
    try {
      const response = await api.get('/api/posts');
      posts.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  const deletePost = async (id) => {
    try {
      await api.delete(`/api/posts/${id}`);
      fetchDataPosts();
    } catch (error) {
      console.error(error);
    }
  };
  
  onMounted(() => {
    fetchDataPosts();
  });
  </script>
  