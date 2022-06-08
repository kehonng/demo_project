// 引入vue
import Vue from 'vue'
// 引入App组件
import App from './App'
// 引入路由文件
import router from './router'
// 引入vuex文件
import store from './store/'
// 'development',use package;'production':use cdn;
// 引入饿了么组件库
import ElementUI from 'element-ui'
// 注册组件库
Vue.use(ElementUI, { size: 'mini'});
// 引入组件库样式
import('element-ui/lib/theme-chalk/index.css')
// 引入iconSvg组件
import './components/iconSvg' // iconSvg

// 权限控制
import '@/permission' // permission control
// 模拟接口数据
import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";

// 分享功能集合
import { shareConfig } from './utils/share';
// 挂在到全局上，这样在组件中就可以直接用this.shareConfig使用这个方法了
Vue.prototype.shareConfig = shareConfig;


Vue.config.productionTip = false;


// 创建一个nvue的实例
new Vue({
  router, // 路由文件
  store, // vuex
  i18n,  // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: h => h(App), // 渲染到App组件
}).$mount('#app') // 挂在到#app
