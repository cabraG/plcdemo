import Vue from 'vue'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import Cookies from 'js-cookie'


Vue.use(ElementUI)
Vue.use(VueI18n);
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$axios = axios;




const i18n = new VueI18n({
    locale: 'zh',
    messages
})

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from)
    const role = Cookies.get('Token');
    if (!role && to.path !== '/') {
        next('/');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
    i18n,
    render: h => h(App),
  template: '<App/>'
}).$mount('#app')
