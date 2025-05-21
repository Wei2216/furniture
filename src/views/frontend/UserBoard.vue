<template>
  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/cart">用戶端範例</router-link>
    </div>
  </nav>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view />
  </div> -->
  <div class="wrapper">
    <LoadingOverlay :active="isLoading"></LoadingOverlay>
    <FrontNavbar/>
    <ToastMessages/>
    <div class="router-view">
      <Router-view/>
    </div>
    <FrontFooter/>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';
import FrontNavbar from '@/components/FrontNavbar.vue';
import FrontFooter from '@/components/FrontFooter.vue';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    ToastMessages,
    FrontNavbar,
    FrontFooter,
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {},
};
</script>
