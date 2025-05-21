<template>
  <div>
    <LoadingOverlay :active="isLoading"></LoadingOverlay>
    <div class="text-end mt-4 text-success">
      <button class="btn btn-outline-secondary fs-5 fw-bold"
        @click="openCouponModal(true)">新增折扣碼
      </button>
    </div>
    <table class="table mt-4 text-center fs-5">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未起用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary me-2"
              @click="openCouponModal(false, item)">
                編輯
              </button>
              <button class="btn btn-outline-danger ms-2"
              @click="openDeleteCouponModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <couponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon" />
    <DeleteModal :item="tempCoupon" ref="deleteModal" @delete-item="deleteCoupon" />
  </div>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  components: {
    CouponModal,
    DeleteModal,
  },
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      isLoading: false,
      isNew: false,
    };
  },
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.showModal();
    },
    openDeleteCouponModal(item) {
      this.tempCoupon = { ...item };
      const deleteComponent = this.$refs.deleteModal;
      deleteComponent.showModal();
    },
    getCoupons() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.$http.get(url, this.tempProduct)
        .then((response) => {
          this.coupons = response.data.coupons;
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
    updateCoupon(tempCoupon) {
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(url, { data: tempCoupon }).then((response) => {
          console.log(response, tempCoupon);
          this.$httpMessageState(response, '新增優惠券');
          this.getCoupons();
          this.$refs.couponModal.hideModal();
        })
          .catch((err) => {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: err.response.data.message,
            });
          });
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(url, { data: this.tempCoupon })
          .then((response) => {
            console.log(response);
            this.$httpMessageState(response, '更新優惠券');
            this.getCoupons();
            this.$refs.couponModal.hideModal();
          })
          .catch((err) => {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: err.response.data.message,
            });
          });
      }
    },
    deleteCoupon() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        console.log(response, this.tempCoupon);
        this.$httpMessageState(response, '刪除優惠券');
        const deleteComponent = this.$refs.deleteModal;
        deleteComponent.hideModal();
        this.getCoupons();
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
