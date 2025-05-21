<template>
  <section class="mt-5 d-flex justify-content-center align-items-center">
    <div class="container">
      <h2 class="text-center text-custom mb-4 fw-bold">常見問題 (FAQ)</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header " id="headingOne">
            <button
              class="accordion-button fw-bold text-custom table-bg"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              問題1:樂居時光家具提供哪些配送服務？
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong class="text-ans">
                我們提供標準宅配服務，所有家具將會根據您的地址安排配送，並由專業配送團隊進行安裝。
              </strong>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed fw-bold text-custom table-bg"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              問題2:可以選擇送貨時間嗎？
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong class="text-ans">
                是的，您可以在結帳時選擇適合的送貨時間，並且我們會在指定時間內準時送達。
              </strong>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed fw-bold text-custom table-bg"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              問題3:樂居時光家具的產品保養如何進行？
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong class="text-ans">
                我們的產品都附有保養說明書，請依照材質和種類進行保養，並定期清潔以延長使用壽命。
              </strong>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="headingFour">
            <button
              class="accordion-button collapsed fw-bold text-custom table-bg"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              問題4:是否提供訂製家具服務？
            </button>
          </h2>
          <div
            id="collapseFour"
            class="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong class="text-ans">
                是的，我們提供訂製家具服務。您可以根據需求定制尺寸、材質和顏色，打造專屬於您的家居空間。
              </strong>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="headingFive">
            <button
              class="accordion-button collapsed fw-bold text-custom table-bg"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              問題5:可以更換或退貨嗎？
            </button>
          </h2>
          <div
            id="collapseFive"
            class="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong class="text-ans">
                如果您收到的產品有任何瑕疵或損壞，請在7天內聯繫我們的客服，我們將提供退換貨服務。
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
section {
  min-height: 600px; /* 或你想要的高度 */
}
.text-custom {
  color: #4f332d !important;
}
.text-ans {
  color: #6b4c3b !important;
}
.table-bg {
  background-color: #e6e6d6 !important;
  color: #4f332d !important;
}
</style>
