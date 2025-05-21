<template>
  <div class="container-fluid px-3 px-md-5 py-5">
    <div class="row align-items-center">
      <div class="col-md-5 mb-4 mb-md-0">
        <div class=" about-bgImg"></div>
      </div>
      <div class="col-md-7 px-3 px-md-0">
        <h1 class="text-title">2024年質感生活新選擇</h1>
        <h1 class="text-subtitle">樂居時光手工家具</h1>
        <p class="mb-2 text-content">
          我們致力於打造<span class="text-accent">專屬於每位顧客</span>的手工家具，堅持天然材質與純熟工藝，細節之中展現品味。
        </p>
        <p class="mb-2 text-content">
          每一件作品皆由師傅親手打造，結合美學設計與實用功能，為您營造獨一無二的居家氛圍。
        </p>
        <p class="mb-2 text-content">
          在樂居時光，我們不只是製作家具，更傳遞生活的溫度與質感。
        </p>
        <div class="mt-3 d-flex flex-wrap gap-2">
          <span class="bg-muted">天然原木材質</span>
          <span class="bg-muted">台灣原創設計</span>
          <span class="bg-muted">師傅手工打造</span>
          <span class="bg-muted">無毒環保塗料</span>
          <span class="bg-muted">終身保固服務</span>
        </div>
        <div class="row mt-5">
          <div class="col-6 col-md-3 mb-4 mb-md-0 text-center">
            <h4 class="counter-title">年均顧客</h4>
            <h2 class="counter">1000 <span class="h4 counter">/位</span></h2>
          </div>
          <div class="col-6 col-md-3 mb-4 mb-md-0 text-center">
            <h4 class="counter-title">設計獎項</h4>
            <h2 class="counter">12 <span class="h4 counter">/座</span></h2>
          </div>
          <div class="col-6 col-md-3 mb-4 mb-md-0 text-center">
            <h4 class="counter-title">原木品項</h4>
            <h2 class="counter">40 <span class="h4 counter">/種</span></h2>
          </div>
          <div class="col-6 col-md-3 text-center">
            <h4 class="counter-title">累積作品</h4>
            <h2 class="counter">500 <span class="h4 counter">/件</span></h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 品牌故事／理念 -->
  <div class="container my-5 py-5">
    <div class="text-center mb-5">
      <h2 class="text-title">品牌理念</h2>
      <p class="text-subtitle fs-5">環保選材・手工製作・得獎設計</p>
    </div>
    <div class="row">
      <div class="col-md-6">
        <img
          src="@/assets/images/reclaimed wood.jpg"
          alt="reclaimed"
          class="img-fluid rounded-circle shadow-lg"
        />
      </div>
      <div class="col-md-4 m-auto text-center">
        <h4 class="mt-4 text-subtitle fs-3">環保選材</h4>
        <p class="text-content fw-bold">
          精選可再生木材與低揮發性環保塗料，減少對環境的負擔。每項材料皆經過嚴格篩選，不僅堅固耐用，更展現我們對永續地球的承諾，讓您在享受美好生活的同時，也為綠色未來盡一份心力。
        </p>
      </div>
    </div>

    <div class="row flex-row-reverse justify-content-between mt-4">
      <div class="col-md-6">
        <img
          src="@/assets/images/handmade.jpg"
          alt="handmade"
          class="img-fluid rounded-circle shadow-lg"
        />
      </div>
      <div class="col-md-4 m-auto text-center">
        <h4 class="mt-4 text-subtitle fs-3">手工製作</h4>
        <p class="text-content fw-bold">
          每一件作品皆由經驗豐富的工匠親手打造，結合傳統工藝與現代設計思維，從打磨、拼接到上漆，步驟精細、講究品質。每個細節都體現出製作者對藝術的熱情與對品質的堅持。
        </p>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-6">
        <img
          src="@/assets/images/award.jpg"
          alt="award"
          class="img-fluid rounded-circle shadow-lg"
        />
      </div>
      <div class="col-md-4 m-auto text-center">
        <h4 class="mt-4 text-subtitle fs-3">得獎設計</h4>
        <p class="text-content fw-bold">
          我們的設計團隊致力於創造兼具功能與美感的家具作品，並榮獲多項國際設計大獎肯定。每件產品都融合實用性、創新性與藝術感，為現代空間注入細膩而獨到的生活風格。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import counterUp from 'counterup2';

export default {
  name: 'AboutView',
  setup() {
    onMounted(() => {
      const callback = (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting && !el.classList.contains('is-visible')) {
            counterUp(el, {
              duration: 1500,
              delay: 16,
            });
            el.classList.add('is-visible');
          }
        });
      };

      const observer = new IntersectionObserver(callback, { threshold: 0.5 });
      const counters = document.querySelectorAll('.counter');
      counters.forEach((counter) => observer.observe(counter));
    });
  },
};
</script>

<style>
.about-bgImg {
  background-image: url('@/assets/images/sofa/sofa8.jpg'); /* 請自行替換圖片路徑 */
  background-size: cover;
  background-position: center;
  height: 300px;
}

.text-title {
  font-size: 32px; /* 固定像素 */
  font-weight: 700;
  color: #4f332d;
  margin-bottom: 16px;
}

.text-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #7a5a48;
  margin-bottom: 24px;
}

.text-content {
  font-size: 20px;
  line-height: 2;
  color: #4f332d;
}

.text-accent {
  color: #c0402a;
  font-weight: 700;
}

.bg-muted {
  background-color: #f7f1ea;
  color: #5c3a21;
  padding: 6px 14px;
  font-size: 14px;
  border-radius: 6px;
  font-weight: 600;
  user-select: none;
}

.counter-title {
  font-size: 18px;
  font-weight: 600;
  color: #4f332d;
  margin-bottom: 8px;
}

.counter {
  font-size: 36px;
  font-weight: 700;
  color: #c0402a;
}

.counter .h4.counter {
  font-size: 18px;
  font-weight: 600;
  color: #7a5a48;
}

@media (min-width: 768px) {
  .about-bgImg {
    height: 100%;
    min-height: 400px;
  }
}

@media (max-width: 767px) {
  .p-4 {
    padding: 16px !important;
  }
  .p-md-5 {
    padding: 24px !important;
  }
}
</style>
