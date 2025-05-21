import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { all } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { currency, date } from './methods/filters';
import $httpMessageState from './methods/pushMessageState';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.config.globalProperties.$filters = {
  date,
  currency,
};
// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
app.config.globalProperties.$httpMessageState = $httpMessageState;

Object.keys(all).forEach((rule) => {
  console.log(rule);
  defineRule(rule, all[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

setLocale('zh_TW');
app.use(VueAxios, axios);
app.use(router);
app.component('LoadingOverlay', Loading);
app.component('VeeForm', Form);
app.component('VeeField', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
