<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
 <div class="my-5">
    <div class="container">
      <div class="border p-3 p-md-5">
        <div class="row justify-content-center">
          <form class="col-12 col-lg-8 py-3 table-responsive">
            <h2 class="fs-3">購物清單</h2>
            <table class="table align-middle mt-3">
              <thead class="table-bg text-custom text-nowrap">
                <tr>
                    <th>品名</th>
                    <th class="text-end">單價</th>
                    <th class="text-end">數量</th>
                    <th class="text-end">小計</th>
                </tr>
              </thead>
              <tbody class="text-nowrap">
                <tr v-for="item in order.products" :key="item.id">
                    <td>{{ item.product.title }}</td>
                    <td class="text-end">{{ $filters.currency(item.product.price) }}</td>
                    <td class="text-end">{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">{{ $filters.currency(item.total) }}</td>
                </tr>
              </tbody>
            </table>
            <table class="w-100">
                <tbody>
                  <!-- <tr>
                    <td class="text-end py-2">運費</td>
                    <td class="text-end w-50">NT$ {{ $filters.currency(deliveryFee) }}</td>
                  </tr> -->
                  <!-- <tr class="text-success">
                    <td class="text-end py-2">優惠折扣</td>
                    <td class="text-end w-50" >
                       - NT$ {{ $filters.currency(cart.total - cart.final_total) }}
                    </td>
                  </tr> -->
                  <tr class="border-top ">
                    <td class="text-end py-2">總計金額</td>
                    <td class="text-end w-50">NT$ {{ $filters.currency(order.total) }}</td>
                  </tr>
                </tbody>
              </table>
          </form>
          <form class="col-12 col-lg-8 mt-3 table-responsive">
            <h2 class="fs-3  text-custom">收件人資料</h2>
            <table class="table border mt-3">
              <tbody class=" text-nowrap">
                <tr>
                  <th width="100" class="table-bg text-custom">Email</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th class="table-bg text-custom">姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th class="table-bg text-custom">收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th class="table-bg text-custom">收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th class="table-bg text-custom">付款狀態</th>
                  <td>
                    <span v-if="!order.is_paid" class="text-secondary">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-end" v-if="order.is_paid === false">
              <button type="button" @click="payOrder" class="btn btn-outline-custom ">確認付款</button>
            </div>
          </form>
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
      cart: {},
      order: {
        user: {},
      },
      deliveryFee: 0,
      orderId: '',
      isLoading: false,
    };
  },
  inject: {
    emitter: ['emitter'],
  },
  methods: {
    getOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            console.log('order:', res.data.order);
            this.isLoading = false;
            this.order = res.data.order;
            this.getCart();
          }
        });
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            console.log('cart:', res.data.data);
            console.log('cart.total:', res.data.data.total);
            console.log('cart.final_total:', res.data.data.final_total);
            this.cart = res.data.data;
          }
        });
    },
    payOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      setTimeout(() => {
        this.$http.post(url)
          .then((res) => {
            if (res.data.success) {
              this.isLoading = false;
              this.emitter.emit('update-cart', this.cart.carts.id);
              let timerInterval;
              Swal.fire({
                icon: 'success',
                title: '付款完成！',
                html: '將於 <b></b> 秒後關閉',
                timer: 3000,
                didOpen: () => {
                  Swal.showLoading();
                  const b = Swal.getHtmlContainer().querySelector('b');
                  timerInterval = setInterval(() => {
                    b.textContent = parseInt(Swal.getTimerLeft() / 1000, 10);
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                  this.$router.push('/productList');
                }
              });
              this.getOrder();
            } else {
              this.isLoading = false;
              Swal.fire({
                icon: 'error',
                title: '付款失敗！',
                showConfirmButton: false,
                timer: 1500,
              });
              this.getOrder();
            }
          });
      }, 2000);
    },
  },
  created() {
    this.isLoading = true;
    setTimeout(() => {
      this.orderId = this.$route.params.orderId;
      this.getOrder();
      this.isLoading = false;
    }, 2000);
  },
};
</script>
<style>
.text-custom {
  color: #4f332d !important;
}
.table-bg {
  background-color: #e6e6d6 !important;
  color: #333 !important;
}
.btn-outline-custom {
  color: #4f332d;
  border-color: #4f332d;
}
.btn-outline-custom:hover {
  background-color: #4f332d;
  color: #4EC5B2;
}
</style>
