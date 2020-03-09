// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vueaxios from 'vue-axios';
import {Alert, Toast, LoadingPlugin } from 'vux'
import axios from 'axios';
import moment from 'moment';// 日期格式化
import App from './App'
import router from './router'// 路由
import VueWechatTitle from 'vue-wechat-title'// title
Vue.use(VueWechatTitle)
Vue.use(Vueaxios, axios);
Vue.use(LoadingPlugin)
Vue.component('toast', Toast)
Vue.component('alert', Alert)
Vue.filter('dateFormat', function (value) {
  var date = value;
  if (date == undefined) {
    return "";
  }
  return moment(date).format("YYYY-MM-DD");
})

import '!style-loader!css-loader!less-loader!./style/global.css'
var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.afterEach(route => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
    document.title = route.meta.title;
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const hackIframe = document.createElement('iframe');
      hackIframe.style.display = 'none';
      hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
      document.body.appendChild(hackIframe);
      setTimeout(_ => {
        document.body.removeChild(hackIframe)
      }, 300)
    }
  }
});

export default router;
