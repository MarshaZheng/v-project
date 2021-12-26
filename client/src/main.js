// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import RelationGraph from 'relation-graph'
// import NProgress from 'nprogress'; // Progress 进度条
// import 'nprogress/nprogress.css'; // Progress 进度条 样式
// import 'normalize.css/normalize.css'; // normalize.css 样式格式化
// import 'assets/css/index.scss'; // 全局自定义的css样式

// import * as filters from './filters'; // 全局vue filter

// import { global } from 'global/global';
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.prototype.$axios = axios
Vue.use(RelationGraph)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})