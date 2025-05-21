<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="d-flex justify-content-end">
    <button class="btn btn-outline-secondary fs-5 fw-bold"
    type="button" @click="openModal(true)">新增產品項目</button>
  </div>
  <table class="table mt-4 text-center fs-5">
    <thead>
      <tr class="text-nowrap">
        <th width="120">分類</th>
        <th width="120">產品名稱</th>
        <th width="120">產品圖片</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td>
          <img :src="item.imageUrl" :alt="item.title" style="width: 160px; height: 110px;">
        </td>
        <!-- 使用千分號 -->
        <td class="text-right">
          {{ $filters.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filters.currency(item.price) }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td class="text-nowrap">
          <div class="btn-group">
            <button class="btn btn-outline-primary me-2"
            @click="openModal(false, item)">
              編輯
            </button>
            <button class="btn btn-outline-danger ms-2"
            @click="openDeleteProductModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <PaginationComponent :pages="pagination"
  @emit-pages="getProducts"></PaginationComponent>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct">
  </ProductModal>
  <DeleteModal :item="tempProduct" ref="deleteModal" @del-item="deleteProduct"/>
</template>

<script>
// import ProductModal from '../components/ProductModal.vue';
import ProductModal from '@/components/ProductModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
// import { currency } from '../methods/filters';

export default {
  data() {
    return {
      // 加入產品
      products: [],
      // 加入分頁資訊
      pagination: {},
      // 新增產品
      tempProduct: {},
      // 更新編輯資料
      isNew: false,
      // 讀取
      isLoading: false,
    };
  },
  components: {
    ProductModal,
    DeleteModal,
    PaginationComponent,
  },
  inject: ['emitter'],
  methods: {
    // currency,
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      // 這裡要讀取效果
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        // 取得完成，關閉讀取效果
        this.isLoading = false;
        if (res.data.success) {
          console.log(res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      })
        .catch((err) => {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: err.response.data.message,
          });
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        console.log(response);
        productComponent.hideModal(); // 新增完產品會關閉
        // this.getProducts(); // 重新取得列表資訊
        if (response.data.success) {
          this.getProducts();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功',
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: response.data.message.join('、'),
          });
        }
      });
    },
    // 開啟刪除 Modal
    openDeleteProductModal(item) {
      this.tempProduct = { ...item };
      const deleteComponent = this.$refs.deleteModal;
      deleteComponent.showModal();
    },
    deleteProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((response) => {
        console.log(response.data);
        const deleteComponent = this.$refs.deleteModal;
        deleteComponent.hideModal();
        this.getProducts();
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
