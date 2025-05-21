<template>
  <router-view />
</template>
<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  mounted() {
    AOS.init({
      duration: 1000,
      anchorPlacement: 'top-bottom',
    });
  },
};
</script>
<style lang="scss">
@import "./assets/all.scss";
#app {
  font-family: 'Noto Sans TC', sans-serif;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
