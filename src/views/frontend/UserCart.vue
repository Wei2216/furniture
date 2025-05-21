<template>
<LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div v-if="!cartQty" class="my-5">
    <div class="container">
      <div class="border border-2 px-2 py-5 p-lg-5 empty-cart">
        <h2 class="text-center text-custom">購物清單目前尚無選購商品！</h2>
        <div class="col-5 col-md-2 mx-auto mt-5">
          <router-link to="/productList" class="btn btn-outline-custom btn-sm w-100">
            前往商品區！
          </router-link>
        </div>
      </div>
    </div>
  </div>
<!-- 購物車清單 -->
  <div v-else class="my-5">
    <div class="container">
      <div class="border border-2 p-3">
        <div class="row row-cols-1 g-5 mx-0 justify-content-center">
          <div class="col-12 col-lg-8 py-3 px-0 table-responsive">
            <div class="px-2">
              <h2 class="fs-3 text-custom">購物車清單</h2>
            </div>
            <table class="table align-middle mt-3">
              <thead class="table-bg text-custom text-nowrap">
                <tr>
                  <th class="ps-3" style="width: 75px">商品</th>
                  <th style="width: 140px"></th>
                  <th class="text-end" style="width: 120px">單價</th>
                  <th class="text-end" style="width: 120px">數量</th>
                  <th class="text-end" style="width: 120px">小計</th>
                  <th class="text-end" style="width: 50px">編輯</th>
                </tr>
              </thead>
              <tbody class="text-nowrap text-custom" v-for="item in cart.carts" :key="item.id">
                <tr>
                  <td>
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      style="width: 75px; height: 50px;
                      background-size: cover;
                      background-position: center"
                    />
                  </td>
                  <td>{{ item.product.title }}</td>
                  <td class="text-end">NT$ {{ $filters.currency(item.product.price) }}</td>
                  <td>
                    <input type="number"
                        class="form-control form-control-sm ms-auto"
                        v-model.number="item.qty"
                        min="1" max="10"
                        @change="updateCart(item, item.qty)"
                        style="width: 50px;"
                        :aria-label="`商品 ${item.name} 的數量`">
                  </td>
                  <td class="text-end">NT$ {{ $filters.currency(item.total) }}</td>
                  <td class="text-end">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="deleteCart(item.product.title, item.id)"
                    >
                      <i class="bi bi-trash3-fill fs-5"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-12 col-lg-8 p-0 d-flex flex-column">
            <div class="px-2">
              <h2 class="fs-3">購物車總計</h2>
            </div>

            <div class="col-12 col-md-6 ms-auto">
              <label for="coupon-code">優惠碼
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control text-custom table-bg border-1"
                  placeholder="請輸入優惠碼"
                  aria-describedby="coupon-code"
                  v-model="couponCode"
                /><button
                  class="btn btn-outline-custom"
                  type="button"
                  id="coupon-code"
                  @click="addCouponCode()"
                >套用優惠券</button>
              </div>
              </label>
            </div>

            <table class="mt-1">
              <tbody>
                <tr>
                  <td class="text-end py-2" colspan="3">共 {{ cartQty }} 筆商品</td>
                </tr>
                <tr>
                  <td class="text-end py-2" colspan="2">商品金額</td>
                  <td class="text-end w-50">NT$ {{ $filters.currency(cart.total) }}</td>
                </tr>
                <tr>
                  <td class="text-end py-2" colspan="2">運費</td>
                  <td class="text-end w-50">NT$ {{ $filters.currency(deliveryFee) }}</td>
                </tr>
                <tr class="text-success">
                  <td class="text-end py-2" colspan="2">優惠折扣</td>
                  <td class="text-end w-50">
                    - NT$ {{ $filters.currency(cart.total - cart.final_total) }}
                  </td>
                </tr>
                <tr class="border-top">
                  <td class="text-end py-2" colspan="2">總計金額</td>
                  <td class="text-end w-50">NT$ {{ $filters.currency(cart.final_total) }}</td>
                </tr>
              </tbody>
            </table>

            <div class="mt-5 col-12 col-md-2 mx-auto">
              <button type="button" @click="toCheckInfo" class="btn btn-outline-custom w-100">
                填寫資料
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {},
      deliveryFee: 0,
      cartQty: 0,
      couponCode: '',
      isLoading: false,
    };
  },
  inject: {
    emitter: ['emitter'],
  },
  methods: {
    getCard() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            this.isLoading = false;
            this.cartQty = res.data.data.carts.length;
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
    updateCart(item, qty) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading = true;
      const cart = {
        product_id: item.product_id,
        qty,
      };
      this.$http
        .put(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.getCard();
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
    deleteCart(item, id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.emitter.emit('update-cart', id);
            this.$httpMessageState(res, `已將${item}移除購物車`);
            this.getCard();
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
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.couponCode,
      };
      this.isLoading = true;
      this.$http
        .post(url, { data: coupon })
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.$httpMessageState(res, '套用優惠券');
            this.getCard();
          } else {
            this.isLoading = false;
            this.$httpMessageState(res, '套用優惠券');
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
    toCheckInfo() {
      this.$router.push('/checkInfo');
    },
  },
  created() {
    this.getCard();
  },
};
</script>
<style>
/* 與首頁統一的色系與標題 */
.text-custom {
  color: #4f332d !important;
}
h2, .cart-title {
  color: #4f332d;
  font-weight: bold;
}

/* 按鈕統一色系 */
.btn-outline-custom {
  color: #4f332d;
  border-color: #4f332d;
}
.btn-outline-custom:hover {
  background-color: #4f332d;
  color: #4EC5B2;
}

.table-bg {
  background-color: #e6e6d6 !important;
  color: #333 !important;
}

.empty-cart {
  background-color: #fff8f4;
  border-left: 4px solid #4f332d;
  border-radius: 10px;
}

/* 商品小圖一致樣式 */
.cart-img {
  width: 75px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

</style>
