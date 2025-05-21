<template>
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
