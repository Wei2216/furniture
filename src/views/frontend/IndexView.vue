<template>
  <div class="position-relative">
    <!-- 背景圖層（含透明度） -->
    <div class="position-absolute bg-img"></div>
    <!-- 前景內容 -->
    <div
      class="container d-flex flex-column"
      style="min-height: 100vh; position: relative; z-index: 1"
    >
      <!--  導覽列  -->
      <!-- 中央置中標語與按鈕 -->
      <div class="row justify-content-center my-auto">
        <div class="col-md-6 text-center">
          <h1 class="fs-1">樂居時光，品味生活</h1>
          <p class="text-muted mb-0 fs-4">專屬你的居家美學提案，打造溫馨舒適的生活空間</p>
          <router-link to="/productList" class="btn btn-dark rounded-0 mt-4 fs-6"
            >立即選購</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <section class="mt-5">
    <div class="container py-5">
      <div class="d-flex justify-content-center">
        <h2 class="p-2 border-start-custom subject-text mb-0">為什麼選擇樂居時光？</h2>
      </div>
      <div class="row row-cols-1 row-cols-md-2 mt-5 text-black text-content">
        <div data-aos="fade-down" data-aos-delay="200" class="col p-3 d-flex">
          <div class="me-2">
            <i class="bi bi-1-square-fill fs-3"></i>
          </div>
          <div class="d-flex flex-column">
            <h3 class="mt-1 fw-bold">傳統工藝</h3>
            <p>
              我們的家具選用優質木材與精湛工藝，堅持傳統設計與現代舒適的完美結合，為您的家居增添獨特品味。
            </p>
          </div>
        </div>
        <div data-aos="fade-down" data-aos-delay="300" class="col p-3 d-flex">
          <div class="d-flex me-2">
            <i class="bi bi-2-square-fill fs-3"></i>
          </div>
          <div class="d-flex flex-column">
            <h3 class="mt-1 fw-bold">天然材料</h3>
            <p>我們挑選天然環保的材料，如實木與天然布料，確保每一件家具都對家居空間與環境友善。</p>
          </div>
        </div>
        <div data-aos="fade-down" data-aos-delay="400" class="col p-3 d-flex">
          <div class="d-flex me-2">
            <i class="bi bi-3-square-fill fs-3"></i>
          </div>
          <div class="d-flex flex-column">
            <h3 class="mt-1 fw-bold">堅持品質</h3>
            <p>無論是設計、選材或製作過程，我們都保持高度要求，致力於為您打造每一件完美的家具。</p>
          </div>
        </div>
        <div data-aos="fade-down" data-aos-delay="500" class="col p-3 d-flex">
          <div class="d-flex me-2">
            <i class="bi bi-4-square-fill fs-3"></i>
          </div>
          <div class="d-flex flex-column">
            <h3 class="mt-1 fw-bold">完美禮物</h3>
            <p>
              樂居時光的家具是一份珍貴的禮物，無論是搬家還是節慶送禮，都能為您的親朋好友帶來溫馨與驚喜。
            </p>
          </div>
        </div>
        <div data-aos="fade-down" data-aos-delay="600" class="col p-3 d-flex">
          <div class="d-flex me-2">
            <i class="bi bi-5-square-fill fs-3"></i>
          </div>
          <div class="d-flex flex-column">
            <h3 class="mt-1 fw-bold">線上訂購</h3>
            <p>
              我們的網站提供方便快捷的線上選購與配送服務，讓您隨時隨地輕鬆選購，享受便捷的購物體驗。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 熱門商品區塊 -->
  <section id="featured" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-between">
          <h2 class="p-2 mb-0 subject-text border-start-custom">熱門商品</h2>
          <div>
            <router-link to="/productList" class="btn btn-outline-primary text-custom fs-6"
              >前往商品一覽 <i class="bi bi-arrow-right"></i
            ></router-link>
          </div>
        </div>
      </div>
      <div class="row col-lg-9 justify-content-evenly px-0 mx-auto mt-4">
        <div class="col-sm-12 col-md-3 ps-0" v-for="item in newProductList" :key="item.id">
          <router-link
            :to="`/productList/${item.id}`"
            class="text-decoration-none card mt-1 mb-2 newItem-item mx-auto mx-lg-0"
          >
            <div class="overflow-hidden text-light position-relative border-bottom newItem-pic">
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="card-img-top d-block align-middle h-100 w-auto mx-auto"
              />
            </div>
            <div class="card-body text-dark">
              <h5 class="overflow-hidden">
                <div class="card-title overflow-hidden newItem-name card-text" :title="item.title">
                  {{ item.title }}
                </div>
              </h5>
              <div class="mb-2 d-flex flex-column">
                <span class="text-decoration-line-through me-2"
                  >NT${{ $filters.currency(item.origin_price) }}</span
                >
                <span class="fw-bold card-sale">NT${{ $filters.currency(item.price) }}</span>
              </div>
              <button class="btn w-100 btn-outline-primary text-custom" type="button">
                詳細資訊
              </button>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <div class="on-sale w-100 text-center p-5 rounded-3">
    <h2>
      本館限時全面優惠中
      <span class="text-danger fw-bolder">８折</span>
    </h2>
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="input-group">
          <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
          <label for="couponCode" class="visually-hidden">優惠碼</label>
          <input
            id="couponCode"
            ref="couponCode"
            type="text"
            class="form-control text-brown fw-bold"
            value="VIP88"
            disabled
            aria-describedby="button-addon2"
          />
          <button class="btn btn-brown" type="button" id="button-addon2" @click="copyCouponCode">
            <i class="bi bi-files me-1"></i>複製
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default {
  data() {
    return {
      newProductList: [],
    };
  },
  components: {
    // OnSaleModal,
  },
  inject: ['emitter'],
  methods: {
    getNewProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(api)
        .then((res) => {
          const filterIds = [
            '-OQ2fZAPnVcD-zNWbnKY',
            '-OQ2e4XozCYHYPTodu0V',
            '-OQ2eVm4-yW2van3F0jW',
            '-OQ2d1WlOAT0VrBbtoCU',
          ];
          this.newProductList = res.data.products.filter((item) => filterIds.includes(item.id));
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data,
          });
        });
    },
    copyCouponCode() {
      const copyCode = this.$refs.couponCode;
      navigator.clipboard.writeText(copyCode.value).then(() => Swal.fire({
        icon: 'success',
        title: '優惠碼複製成功！',
      }));
    },
  },
  // mixins: [detailMixin],
  created() {
    this.getNewProducts();
  },
  mounted() {
    this.emitter.emit('page-change', {
      data: 'home',
    });
  },
};
</script>
<style>
.bg-img {
  background-image: url("@/assets/images/bg-img1.jpg");
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: cover;
  background-position: center center;
  opacity: 0.7;
  z-index: 0;
}

.border-start-custom {
  border-left: 4px solid #4f332d;
}

.subject-text {
  color: #4f332d;
  font-weight: 800;
}

.text-custom {
  color: #4f332d !important;
  border-color: #4f332d !important;
}
.text-custom:hover {
  background-color: #4f332d;
  color: #fff !important;
}

.text-content {
  color: #4f332d !important;
}

.card-text {
  color: #4f332d;
  font-size: 20px;
  font-weight: bolder;
}

.card-sale {
  color: #c0402a;
  font-size: 18px;
  font-weight: bolder;
}
.newItem-item {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  height: 100%;
}
.newItem-pic {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 0.375rem 0.375rem 0 0;
  position: relative;
}
.newItem-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 1s;
  scale: 1;
}
.newItem-item:hover .newItem-pic img {
  transform: scale(1.1);
}
.newItem-name {
  max-width: 400px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

button {
  margin-top: auto;
}
.on-sale {
  background: url(@/assets/images/banner2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #fdf8f2;
  border: 2px dashed #d6a679;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.on-sale h2 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #5c3a21;
}

.on-sale .text-danger {
  font-size: 2rem;
  color: #c0392b !important;
}

.input-group {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0 1px #d6a679;
  display: flex;
  align-items: stretch;
}

input.form-control.text-brown {
  background-color: #fff8ef;
  border: none;
  color: #5c3a21;
  font-size: 1.2rem;
  padding: 0.75rem 1rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  flex-grow: 1;
  height: auto;
  border-right: none;
}

input.form-control:disabled {
  background-color: #fff8ef;
  opacity: 1;
  cursor: default;
}

.btn-brown {
  background-color: #a9713b;
  color: white;
  border: none;
  padding: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-left: none;
  height: auto;
}

.btn-brown:hover {
  background-color: #8c5e30;
}
</style>
