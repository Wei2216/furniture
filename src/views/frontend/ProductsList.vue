<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="mt-6">
    <div class="banner-img d-flex flex-column justify-content-center align-items-center">
      <div class="text-center text-white text-shadow">
        <h2 class="fw-bold">質感選物．為你的生活添溫度</h2>
        <p class="lead">嚴選居家好物，陪你共度每個美好時光</p>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row g-3">
      <div class="col-12 col-md-2">
        <div class="text-center d-flex flex-md-column justify-content-center">
          <button
            v-for="item in categoryList"
            :key="item.value"
            class="btn me-1 me-md-0 mb-md-1 py-md-2 text-nowrap category-btn"
            type="button"
            @click="filterProducts(item.value)"
            :class="{ active: item.value === currentCategory }">
            {{ item.value }}
          </button>
        </div>
      </div>

      <div class="col-12 col-md-10">
        <div class="row row-cols-2 row-cols-lg-3 g-3">
          <div class="col" v-for="item in tempProduct" :key="item.id">
            <router-link :to="`/productList/${item.id}`" class="text-decoration-none">
              <div class="card border-0 shadow-sm product-card h-100">
                <div class="overflow-hidden position-relative">
                  <img
                    :src="item.imageUrl"
                    :alt="item.title"
                    class="card-img-top product-img"
                  />
                  <span
                    class="position-absolute top-0 start-0 badge bg-danger text-white fs-5"
                    v-if="item.origin_price !== item.price"
                    >特價中</span
                  >
                </div>
                <div class="card-body d-flex flex-column justify-content-between text-dark">
                  <h2 class="fs-5 fw-bold card-title
                  text-truncate text-custom">{{ item.title }}</h2>
                  <div class="mb-2">
                  </div>

                  <div class="text-end mt-auto">
                    <p
                      v-if="item.origin_price !== item.price"
                      class="text-muted text-decoration-line-through mb-0"
                    >
                      NT$ {{ item.origin_price }}
                    </p>
                    <p class="fs-5 fw-bold text-danger mb-0">NT$ {{ item.price }}</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>

         <div class="my-5">
            <PaginationComponent :pages="pagination"
            @emit-pages="(page) => filterProducts(currentCategory, page)"></PaginationComponent>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      currentCategory: '全部',
      pagination: {},
      isLoading: false,
      categoryList: [
        { value: '全部' },
        { value: '沙發' },
        { value: '椅子' },
        { value: '餐桌' },
        { value: '床' },
      ],
    };
  },
  components: {
    PaginationComponent,
  },
  inject: ['emitter'],
  methods: {
    getProduct(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.products = res.data.products;
            this.tempProduct = this.products;
            this.pagination = res.data.pagination;
            this.setPagination(page);
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.emitter.emit('push-message', {
            style: 'danger',
            title: error.response.data.message,
          });
        });
    },
    filterProducts(value, page = 1) {
      this.isLoading = true;
      setTimeout(() => {
        this.currentCategory = value;
        if (value === '全部') {
          this.tempProduct = this.products;
          this.setPagination(page);
          this.isLoading = false;
        } else {
          this.tempProduct = this.products.filter((item) => item.category === value);
          this.setPagination(page);
          this.isLoading = false;
        }
      }, 1000);
    },
    getProductId(id) {
      this.$router.push(`/user/product/${id}`);
    },
    setPagination(page) {
      const pageSize = 6;
      this.pagination = {
        total_pages: Math.ceil(this.tempProduct.length / pageSize),
        current_page: page,
        has_pre: false,
        has_next: false,
        category: null,
      };
      this.pagination.has_pre = this.pagination.current_page > 1;
      this.pagination.has_next = this.pagination.current_page < this.pagination.total_pages;

      const minPage = (this.pagination.current_page * pageSize) - pageSize;
      const maxPage = (this.pagination.current_page * pageSize);
      this.tempProduct = this.tempProduct.slice(minPage, maxPage);
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
<style>
.banner-img{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 480px;
  background-image: url("@/assets/images/banner1.jpg");
  background-position: center center;
  background-size: cover;
  opacity: 0.7;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.text-custom {
  color: #4f332d !important;
}

.category-btn {
  background-color: #fff;
  color: #4f332d;
  border: 1px solid #4f332d;
  transition: all 0.3s;
}
.category-btn:hover,
.category-btn.active {
  background-color: #4f332d;
  color: #fff;
}

.product-card {
  transition: transform 0.3s ease;
  border-radius: 0.5rem;
}
.product-card:hover {
  transform: scale(1.02);
}
.product-img {
  object-fit: cover;
  height: 280px;
  transition: all 0.5s ease;
}
.product-card:hover .product-img {
  transform: scale(1.1);
}

/* SALE 標籤 */
.badge.bg-danger {
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.4rem 0.7rem;
}
</style>
