<template>
  <nav class="navbar navbar-expand-lg dash-navbar">
          <div class="container">
            <router-link class="navbar-brand dash-logo" to="/">樂居時光</router-link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link to="/about" class="nav-link dashNav-item"
                  active-class="dashNav-active">關於我們</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/productList" class="nav-link dashNav-item"
                  active-class="dashNav-active">商品總覽</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/faq" class="nav-link dashNav-item"
                  active-class="dashNav-active">常見問題</router-link>
                </li>
              </ul>
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <router-link to="/favorite" class="nav-link position-relative dashNav-item"
                  active-class="dashNav-active">
                    <i class="bi bi-suit-heart-fill fs-3 d-none d-lg-inline me-3"></i>
                    <span class="d-inline d-lg-none">我的最愛</span>
                    <span v-if="faveList.length"
                      class="position-absolute start-50 badge rounded-pill bg-danger p-1"
                      style="font-size: 12px; width: 25px; height: 20px;">
                      {{ faveList.length }}
                    </span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/cart" class="nav-link dashNav-item position-relative"
                  active-class="dashNav-active">
                    <i class="bi bi-cart4 fs-3 d-none d-lg-inline me-3"></i>
                    <span class="d-inline d-lg-none">購物車</span>
                    <span v-if="cartQty"
                      class="position-absolute start-50 badge rounded-pill bg-danger p-1"
                      style="font-size: 12px; width: 25px; height: 20px;">{{ cartQty }}</span>
                    </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/login" class="nav-link dashNav-item">
                  <i class="bi bi-person-fill fs-3 d-none d-lg-inline"></i>
                  <span class="d-inline d-lg-none">管理者登入</span>
                </router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
</template>

<script>
import saveFave from '@/methods/saveFave';

export default {
  data() {
    return {
      faveList: saveFave.getFavorite() || [],
      cartQty: '',
    };
  },
  inject: {
    emitter: ['emitter'],
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.cartQty = res.data.data.carts.length;
          }
        })
        .catch((error) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: error.response.data.message,
          });
        });
    },
    updateFave() {
      this.faveList = saveFave.getFavorite();
    },
    closeNavbar() {
      if (document.body.offsetWidth < 992) {
        this.$refs.navbarBtn.click();
      }
    },
  },
  created() {
    this.getCart();
    this.emitter.on('update-cart', this.getCart);
    this.emitter.on('update-fave', this.updateFave);
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
  background-color: #4EC5B2;
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
