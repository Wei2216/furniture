<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
<div class="mt-5">
  <div class="banner d-flex flex-column justify-content-center align-items-center">
    <div class="text-center">
      <h1 class="text-custom mb-3 fw-bold">我的收藏</h1>
    </div>
  </div>
</div>
<div class="my-5" v-if="!faveList.length">
  <div class="container">
    <div class="border border-2 px-2 py-5 p-lg-5">
      <h2 class="text-center text-custom fw-bold">收藏清單目前是空的</h2>
      <div class="col-5 col-md-2 mx-auto mt-3">
        <router-link to="/productList" class="btn btn-outline-custom btn-sm w-100">
          前往商品專區
        </router-link>
      </div>
    </div>
  </div>
</div>

<div class="my-5" v-else>
  <div class="container">
    <div class="border border-2 px-1 py-5 p-lg-5">
      <div class="table-responsive-md">
        <table class="table text-nowrap">
          <thead>
            <tr>
              <th colspan="2" style="width: 50%;">商品資訊</th>
              <th class="text-end" style="width: 25%;">價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in faveProduct" :key="item.id">
              <td>
                <img style="width: 160px; height: 107px;"
                  :src="item.imageUrl"
                  :alt="item.title" />
              </td>
              <td class="align-middle">
                <p class="fs-5 mb-0">{{ item.title }}</p>
              </td>
              <td class="align-middle text-end ">
                <p v-if="item.origin_price !== item.price"
                  class="fs-6 mb-0 text-decoration-line-through text-muted">
                  NT$ {{$filters.currency(item.origin_price) }}
                </p>
                <p class="fs-5 mb-0">NT$ {{$filters.currency(item.price)  }}</p>
              </td>
              <td class="align-middle text-end">
                <div class="p-0">
                  <button type="button" @click.prevent="addCart(item.id, 1)"
                    class="btn btn-outline-primary btn-sm p-0 me-3" aria-label="加入購物車">
                    <i class="bi bi-cart4 fs-4"></i>
                  </button>
                  <button type="button" @click.prevent="delFave(item)"
                    class="btn btn-outline-danger btn-sm p-0 me-2" aria-label="移除收藏">
                    <i class="bi bi-trash3-fill fs-4"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import saveFave from '@/methods/saveFave';

export default {
  data() {
    return {
      faveList: saveFave.getFavorite() || [],
      faveProduct: [],
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    getFave() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.faveProduct = res.data.products.filter((item) => this.faveList.includes(item.id));
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
    updateFave() {
      this.faveList = saveFave.getFavorite();
    },
    delFave(item) {
      this.isLoading = true;
      this.faveList.splice(this.faveList.indexOf(item.id), 1);
      this.$httpMessageState({
        data: {
          success: true,
        },
      }, `已將 ${item.title} 移除收藏清單`);
      this.isLoading = false;
      saveFave.saveFavorite(this.faveList);
      this.emitter.emit('update-fave', this.faveList);
      this.getFave();
    },
    addCart(id, qty) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('update-cart', id);
            this.isLoading = false;
            this.getFave();
            this.$httpMessageState(res, '加入購物車');
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
  },
  created() {
    this.emitter.on('update-fave', this.updateFave);
    this.getFave();
  },
};
</script>
<style>
.text-custom {
  color: #4f332d !important;
}
.btn-outline-custom {
  color: #4f332d;
  border-color: #4f332d;
}
</style>
