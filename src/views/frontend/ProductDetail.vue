<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="container mt-5">
  <div class="row g-4 align-items-stretch">
    <!-- 左側商品圖片 -->
    <div class="col-12 col-md-6 d-flex justify-content-center
     align-items-center">
      <img
        class="img-fluid rounded-3"
        :src="product.imageUrl"
        :alt="product.title"
        style="max-height: 480px; object-fit: contain;"
      />
    </div>

    <!-- 右側商品資訊與操作 -->
    <div class="col-12 col-md-6 d-flex flex-column gap-4 p-1">
      <!-- 商品標題與描述 -->
        <div class="flex-grow-1 d-flex flex-column gap-4">
      <div>
        <h2 class="fs-3 fw-bold
        border-start-custom
        border-4 border-secondary
        ps-3 text-custom mb-3 mt-auto">
          {{ product.title }}
        </h2>
        <p class="text-custom fs-5 lh-base">
          {{ product.description }}
        </p>
      </div>

      <!-- 價格區塊 -->
      <div>
        <p
          v-if="product.origin_price !== product.price"
          class="text-muted text-decoration-line-through mb-1 fs-5">
          NT$ {{ $filters.currency(product.origin_price) }}
        </p>
        <p class="fs-3 fw-semibold text-custom mb-0">
          NT$ {{ $filters.currency(product.price) }}
          <span
            v-if="product.origin_price !== product.price"
            class="badge bg-danger ms-2 fs-6 align-middle">
            特價
          </span>
        </p>
      </div>

      <!-- 數量選擇 -->
      <div class="d-flex justify-content-between align-items-center">
        <span class="form-label fw-bolder text-custom me-2 mb-0">選擇數量</span>
        <select
          id="qtySelect"
          class="form-select form-select-sm"
          v-model="qty"
          aria-label="選擇數量"
          style="width: 100px;">
          <option :value="n" v-for="n in 10" :key="n">{{ n }}</option>
       </select>
      </div>
    </div>

      <!-- 操作按鈕區塊 -->
      <div class="d-flex justify-content-between align-items-center">
        <button
          type="button"
          @click.prevent="addFave(product)"
          :class="[
            'btn btn-outline-custom',
            faveList.some(i => i === product.id) ? 'active' : '',
            'btn-sm'
          ]"
        >
          <i class="bi bi-suit-heart-fill me-1"></i> 收藏
        </button>
        <button
          type="button"
          @click="addCart(product.id, qty)"
          class="btn btn-custom btn-sm"
        >
          <i class="bi bi-cart4 me-1"></i> 加入購物車
        </button>
      </div>
    </div>
  </div>
</div>

  <div class="container mt-5">
    <div class="row row-cols-1 g-2 text-custom">
      <div class="col">
        <hr />
      </div>
      <div class="col">
        <h2 class="fs-5 fw-bold"><i class="bi bi-house-fill"></i> 購物流程與注意事項</h2>
      </div>
      <div class="col">
        <p class="mb-2 fw-bold">【配送服務】</p>
        <ul>
          <li>配送範圍限於台灣本島，確保家具完好送達您的家中。</li>
          <li>配送時間依地區不同，一般需3~7個工作天，實際到貨時間以物流狀況為準。</li>
          <li>遇節慶或特殊期間，配送時間可能會有所延遲，敬請見諒，我們會盡力通知並協助您安排。</li>
        </ul>
      </div>
      <div class="col">
        <p class="mb-2 fw-bold">【付款方式】</p>
        <ul>
          <li>目前提供貨到付款（現金）及線上刷卡兩種付款方式，讓您購物更安心便利。</li>
          <li>所有家具商品均享免運費優惠，無論訂購金額大小，讓您輕鬆添購理想家具。</li>
        </ul>
      </div>
      <div class="col">
        <p class="mb-2 fw-bold">【商品保證與售後服務】</p>
        <ul>
          <li>樂居時光嚴格品管每件家具，確保送到您手上的每一件商品品質優良。</li>
          <li>
            若您收到商品有任何瑕疵或缺件問題，請於收到商品後七日內聯絡客服，我們將迅速為您處理退換貨事宜。
          </li>
          <li>
            因家具屬於大型物品，部分特殊訂製商品或特價品不適用7天猶豫期，詳情請參閱消費者保護法相關規定。
          </li>
          <li>
            客服專線：00-1234567（週一至週五 10:00-22:00），或來信至
            service@mail.com，我們將竭誠為您服務。
          </li>
        </ul>
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
      product: {},
      filterProduct: [],
      id: '',
      qty: 1,
      isLoading: false,
    };
  },
  inject: {
    emitter: ['emitter'],
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.product = res.data.product;
          }
        });
    },
    addFave(item) {
      this.isLoading = true;
      if (!this.faveList.includes(item.id)) {
        this.faveList.push(item.id);
        this.$httpMessageState({
          data: {
            success: true,
          },
        }, `已將 ${item.title} 加入收藏`);
        this.isLoading = false;
      } else {
        this.faveList.splice(this.faveList.indexOf(item.id), 1);
        this.$httpMessageState({
          data: {
            success: true,
          },
        }, `已將 ${item.title} 移除收藏`);
        this.isLoading = false;
      }
      saveFave.saveFavorite(this.faveList);
      this.emitter.emit('update-fave', this.faveList);
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
            this.$httpMessageState(res, '加入購物車');
          }
        });
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
  },
};
</script>
<style>
.border-start-custom {
  border-left: 4px solid #4f332d !important;
}

.text-custom {
  color: #4f332d !important;
}

.btn-outline-custom {
  color: #4f332d;
  border-color: #4f332d;
}

.btn-outline-custom:hover,
.btn-outline-custom.active {
  background-color: #4f332d;
  color: #fff;
  border-color: #4f332d;
}

.btn-custom {
  background-color: #4f332d;
  border-color: #4f332d;
  color: #fff;
}

.btn-custom:hover {
  background-color: #3d271f;
  border-color: #3d271f;
  color: #fff;
}

.btn-heart {
  width: 38px;
  height: 38px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid gray;
  color: gray;
  transition: 0.5s;
  &:hover {
    transform: scale(1.2);
    color: #c92c2c;
    border: 1px solid #c92c2c;
  }
}
.btn-heart-active {
  color: #c92c2c;
  border: 1px solid #c92c2c;
}
.btn-add-cart {
  transition: 0.5s;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
