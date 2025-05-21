<template>
  <nav class="navbar navbar-expand-lg dash-navbar">
    <div class="container-fluid">
      <router-link class="navbar-brand dash-logo" to="/">樂居時光</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        ref="navbarBtn"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/dashboard/products"
             @click.prevent="closeNavbar"
             class="nav-link dashNav-item" active-class="dashNav-active">產品
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/orders"
             @click.prevent="closeNavbar"
              class="nav-link dashNav-item" active-class="dashNav-active">訂單
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/coupons"
             @click.prevent="closeNavbar"
             class="nav-link dashNav-item" active-class="dashNav-active">優惠券
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#"
              @click.prevent="logout"
               class="nav-link dashNav-item"
               active-class="dashNav-active">
            登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/'); // 登出成功回首頁
          }
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message,
          });
        });
    },
    closeNavbar() {
      this.$refs.navbarBtn.click();
    },
  },
};

</script>
<style>
.dash-navbar {
  background-color: #FBF5E1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.dash-logo {
  font-size: 28px;
  font-weight: bold;
  color: #4F332D;
  transition: color 0.3s ease;
}

.dash-logo:hover {
  color: #4EC5B2;
}

.dashNav-item {
  font-size: 18px;
  font-weight:700;
  color: #4F332D;
  position: relative;
  transition: color 0.3s ease;
}

.dashNav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: #4EC5B2; /* 薄荷綠 */
  transition: width 0.3s ease;
}

.dashNav-item:hover::after {
  width: 100%;
}

.dashNav-active {
  color: #4EC5B2 !important;
  font-weight: 900;
}

.nav-link:focus {
  color: #4EC5B2;
}
</style>
