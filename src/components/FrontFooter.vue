<template>
<footer class="mt-5 footer-navbar">
      <div class="container py-4">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col text-center text-md-start">
            <router-link to="/"
            class="h4 text-decoration-none footer-logo">樂居時光</router-link>
          </div>
          <div class="col text-center text-md-start footer-text">
            <h5 class="fw-bold">聯絡方式</h5>
            <ul class="list-unstyled">
              <li><i class="bi bi-geo-alt-fill me-1"></i> 樂居市時光路100號</li>
              <li>
                <i class="bi bi-clock-fill me-1"></i> 周一至周六 10：00 - 20：00
              </li>
              <li>
                <i class="bi bi-envelope-fill me-1"></i>
                <a
                  href="mailto:service@mail.com"
                  class="text-decoration-none"
                  >service@mail.com</a
                >
              </li>
              <li>
                <i class="bi bi-telephone-fill me-1"></i>
                <a
                  href="tel:+886-0-01234567"
                  class="text-decoration-none"
                  >00-1234567</a
                >
              </li>
            </ul>
          </div>
          <div class="col text-center text-md-start footer-text">
            <h5 class="fw-bold">關於樂居時光</h5>
            <ul class="list-unstyled">
              <li>
                <router-link to="/about">關於我們</router-link>
              </li>
              <li>
                <router-link to="/productList">商品總攬</router-link>
              </li>
              <li>
                <router-link to="/faq">常見問題</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="text-center pt-3 border-top border-secondary mt-4 footer-text">
          <span class="fs-6 fw-bold">© 2025 Wei's All Rights Reserved.</span>
        </div>
      </div>
    </footer>
</template>
<style>
.footer-navbar {
  background-color: #FBF5E1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.footer-logo {
  font-size: 28px;
  font-weight: bold;
  color: #4F332D;
  transition: color 0.3s ease;
}

.footer-logo:hover {
  color: #4EC5B2;
}

.footer-text{
  color: #4F332D;
  font-weight: bold;
}
.footer-text a,
.footer-text a:visited {
  color: #4F332D;
  font-weight: bold;
  text-decoration: none;
}
.footer-text a:hover,
.footer-text a:focus {
  color: #4EC5B2;
}
</style>
