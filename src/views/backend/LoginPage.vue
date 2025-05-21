<template>
  <div class="signin w-100 row align-items-center justify-content-center m-0">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6 signin-card p-5 shadow-lg">
        <button class="btn btn-lg btn-outline-primary" type="button">
          <router-link class="nav-link active" aria-current="page" to="/">
            回到官網
          </router-link>
        </button>
        <div class="text-center">
          <h1 class="h3 mb-3 font-weight-normal">登入</h1>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">帳號</span>
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="example@mail.com"
                required
                aria-label="Email"
                v-model="user.username"
              />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">密碼</span>
              <input
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="Password"
                required
                aria-label="Password"
                v-model="user.password"
              />
          </div>
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-outline-success" type="submit">
            登入
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          console.log(res);
          this.$router.push('/dashBoard/products');
        }
      });
    },
  },
};
</script>

<style>
.signin {
  height: 100vh;
  background-image: url(@/assets/images/login-bg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.signin-card {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #dee2e6;
  border-radius: 12px;

  transition: all 0.3s ease;
}

.signin-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}
</style>
