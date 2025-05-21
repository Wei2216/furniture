<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="mt-5">
    <div class="container">
      <div class="row g-3 my-5 flex-lg-row-reverse">
        <!-- 購物清單 -->
        <div class="col-12 col-lg-6">
          <div class="border border-2 p-3 p-md-5">
            <div class="row row-cols-1 g-5">
              <div class="col">
                <h2 class="fs-3 cart-title">購物清單</h2>
                <div class="row flex-column g-3 mt-3">
                  <div class="col-10" v-for="item in cart.carts" :key="item.id">
                    <div class="card border-0 cart-card">
                      <div class="row">
                        <div class="col-md-5">
                          <img
                            :src="item.product.imageUrl"
                            class="img-fluid cart-img"
                            :alt="item.product.title"
                          />
                        </div>
                        <div class="col-md-7">
                          <div class="card-body p-0">
                            <h5 class="card-title cart-product-title
                             fw-bold">{{ item.product.title }}</h5>
                            <p class="card-text cart-price">數量：{{ item.qty }}</p>
                            <p class="card-text">NT$ {{ $filters.currency(item.product.price) }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 購物總計 -->
              <div class="col d-flex flex-column justify-content-between">
                <div>
                  <h2 class="fs-3  cart-summary-table">購物總計</h2>
                  <table class="mt-3 w-100">
                    <tbody>
                      <tr>
                        <td class="text-end py-2" colspan="3">共 {{ cartQty }} 筆商品</td>
                      </tr>
                      <tr>
                        <td class="text-end py-2" colspan="2">商品金額</td>
                        <td class="text-end w-50">NT$ {{ $filters.currency(cart.total) }}</td>
                      </tr>
                      <tr>
                        <td class="text-end py-2" colspan="2">運費總計</td>
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 表單 -->
       <div class="col-12 col-lg-6">
          <div class="border border-2 p-3 p-md-5 h-100">
            <div class="row g-5">
              <div class="col-12">
                <h2 class="fs-3">收件人資料</h2>
                <VeeForm
                  class="row flex-column g-3 mt-3"
                  v-slot="{ errors }"
                  @submit="createOrder">
                  <div class="col">
                    <label for="userName" class="form-label">收件人姓名*</label>
                    <VeeField
                      type="text"
                      name="name"
                      class="form-control"
                      id="userName"
                      placeholder="請輸入姓名"
                      :class="{ 'is-invalid': errors['name'] }"
                      rules="required"
                      v-model="form.user.name"
                    ></VeeField>
                    <ErrorMessage
                      name="name"
                      class="invalid-feedback"
                    ></ErrorMessage>
                  </div>
                  <div class="col">
                    <label for="userEmail" class="form-label">Email*</label>
                    <VeeField
                      type="email"
                      name="email"
                      class="form-control"
                      id="userEmail"
                      placeholder="請輸入Email"
                      :class="{ 'is-invalid': errors['email'] }"
                      rules="email|required"
                      v-model="form.user.email"
                    ></VeeField>
                    <ErrorMessage
                      name="email"
                      class="invalid-feedback"
                    ></ErrorMessage>
                  </div>
                  <div class="col">
                    <label for="userTel" class="form-label">收件人電話*</label>
                    <VeeField
                      type="tel"
                      name="tel"
                      class="form-control"
                      id="userTel"
                      placeholder="請輸入電話"
                      :class="{ 'is-invalid': errors['tel'] }"
                      rules="required"
                      v-model="form.user.tel"
                    ></VeeField>
                    <ErrorMessage
                      name="tel"
                      class="invalid-feedback"
                    ></ErrorMessage>
                  </div>
                  <div class="col">
                    <label for="userAddress" class="form-label">收件人地址*</label>
                    <VeeField
                      type="text"
                      name="address"
                      class="form-control"
                      id="userAddress"
                      placeholder="請輸入地址"
                      :class="{ 'is-invalid': errors['address'] }"
                      rules="required"
                      v-model="form.user.address"
                    ></VeeField>
                    <ErrorMessage
                      name="address"
                      class="invalid-feedback"
                    ></ErrorMessage>
                  </div>
                  <div class="col">
                    <label for="userPay" class="form-label">付款方式*</label>
                    <VeeField
                      id="userPay"
                      name="payment_method"
                      class="form-control"
                      :class="{ 'is-invalid': errors['payment_method'] }"
                      rules="required"
                      v-model="form.payment_method"
                      as="select">
                      <option disabled value="">請選擇付款方式</option>
                      <option v-for="item in paymentMethod"
                      :key="item.value"
                      :value="item.value">
                      {{ item.value }}</option>
                    </VeeField>
                    <ErrorMessage
                      name="payment_method"
                      class="invalid-feedback"
                    ></ErrorMessage>
                  </div>
                  <div class="col">
                    <label for="userMessage" class="form-label">留言</label>
                    <textarea style="resize: none;"
                      class="form-control"
                      id="userMessage"
                      rows="3"
                      v-model="form.message"
                    ></textarea>
                  </div>
                  <div class="col d-flex justify-content-end">
                    <button
                      type="submit"
                      class="btn btn-outline-custom mt-4">
                      前往結帳
                    </button>
                  </div>
                </VeeForm>
              </div>
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
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
        payment_method: '',
      },
      paymentMethod: [{ value: '貨到付款' }],
      isLoading: false,
    };
  },

  methods: {
    getCart() {
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
        });
    },
    createOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http
        .post(url, { data: order })
        .then((res) => {
          this.form = {
            user: {
              name: '',
              email: '',
              tel: '',
              address: '',
            },
            message: '',
            payment_method: '',
          };
          this.$router.push(`/checkout/${res.data.orderId}`);
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
<style>
/* 標題字體與配色 */
.cart-title {
  color: #4f332d;
  font-weight: 800;
  padding-left: 1rem;
  margin-bottom: 1rem;
}

/* 購物車項目卡片 */
.cart-card {
  background-color: #f9f6f3;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: transform 0.3s ease;
}

.cart-card:hover {
  transform: translateY(-4px);
}

/* 商品圖片樣式 */
.cart-img {
  object-fit: cover;
  border-radius: 0.375rem;
  width: 100%;
  height: 100%;
  max-height: 160px;
}

/* 商品標題樣式 */
.cart-product-title {
  color: #4f332d;
  font-weight: bold;
  font-size: 1.1rem;
}

/* 價格文字 */
.cart-price {
  color: #C0402A;
  font-weight: bold;
}

/* 購物總計表格樣式 */
.cart-summary-table td {
  color: #4f332d;
  font-weight: 600;
}

/* 優惠折扣綠色字體 */
.cart-summary-table .text-success {
  color: #198754 !important;
}

/* 表格總計邊線加強 */
.cart-summary-table .border-top {
  border-top: 2px solid #4f332d !important;
}

.btn-outline-custom {
  color: #4f332d;
  border-color: #4f332d;
}
.btn-outline-custom:hover {
  background-color: #4f332d;
  color: white;
}
</style>
