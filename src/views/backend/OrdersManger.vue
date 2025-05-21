<template>
   <LoadingOverlay :active="isLoading"></LoadingOverlay>
    <table class="table mt-4 text-center fs-5">
      <thead>
        <tr class="text-nowrap">
          <th width="120">購買時間</th>
          <th width="120">E-mail</th>
          <th width="240">購買款項</th>
          <th width="120">應付金額</th>
          <th width="100">是否付款</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr
            v-if="orders.length"
            class="align-middle text-nowrap"
            :class="{ 'text-secondary': !item.is_paid }"
          >
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in item.products" :key="product.id">
                  {{ product.product.title }} 數量：{{ product.qty }} /
                   {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`paidSwitch${item.id}`"
                    v-model="item.is_paid"
                    @change="updatePaid(item)"
                  />
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm me-2" @click="openModal(false, item)">
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm ms-2"
                  @click="openDeleteOrderModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  <OrderModal :order="tempOrder" ref="orderModal" @update-paid="updatePaid"></OrderModal>
  <DeleteModal :item="tempOrder" ref="deleteModal" @del-item="deleteOrder"></DeleteModal>
  <PaginationComponent :pages="pagination" @emit-pages="getOrders"></PaginationComponent>
</template>

<script>
import DeleteModal from '@/components/DeleteModal.vue';
import OrderModal from '@/components/OrderModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1,
    };
  },
  components: {
    PaginationComponent,
    DeleteModal,
    OrderModal,
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.isLoading = true;
      this.$http
        .get(url, this.tempProduct)
        .then((response) => {
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
          this.isLoading = false;
          console.log(response);
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message,
          });
        });
    },
    openModal(isNew, item) {
      this.tempOrder = { ...item };
      this.isNew = false;
      const orderComponent = this.$refs.orderModal;
      orderComponent.showModal();
    },
    openDeleteOrderModal(item) {
      this.tempOrder = { ...item };
      const deleteComponent = this.$refs.deleteModal;
      deleteComponent.showModal();
    },
    updatePaid(item) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http
        .put(api, { data: paid })
        .then((response) => {
          this.isLoading = false;
          this.getOrders(this.currentPage);
          this.$httpMessageState(response, '更新付款狀態');
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message,
          });
        });
    },
    deleteOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((response) => {
          console.log(response);
          const deleteComponent = this.$refs.deleteModal;
          deleteComponent.hideModal();
          this.getOrders(this.currentPage);
        })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message,
          });
        });
    },
  },
  created() {
    this.getOrders();
    console.log(process.env.VUE_APP_API);
  },
};
</script>
