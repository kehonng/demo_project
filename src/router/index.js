import Vue from 'vue'
import Router from 'vue-router'
import { Layout,Content }  from "../layout"; // 页面整体布局
import { topRouterMap } from "./topRouter";

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

// 一个查询路由的方法
function filterTopRouterMap(name){
	let router = topRouterMap.find((item) => {
		return item.parentName === name;
	});
	return router.data; // arr
}

/**
 * 1、roles:后台返回的权限结构;
 * 
 */
//手动跳转的页面白名单
const whiteList = [
	'/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 * 3、noDropdown  表示是否有子路由
 * 4、hidden  是否隐藏
 * 
 */
//默认不需要权限的页面
export const constantRouterMap = [
	{
    path: '',  
    component: Layout,
		redirect: '/index/index',
		hidden:true
  },
	{ path: '/login',name: 'login',component:() => import('@/page/login'),hidden: true},
	{ path: '/404', component: () => import('@/page/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/page/errorPage/401'), hidden: true },
	{
		path: '/index',
		name: 'index',
		component:Layout,
		meta:{
			title:'首页',
		  icon: 'icondashboard',
		},
		noDropdown:true,
		children:[ 
			{
				path:'index', 
				meta:{
					title:'首页', 
					icon:'icondashboard',
				  routerType:'leftmenu'
				},
        component: () => import('@/page/index/index'),
			}
		]
	}
]

	//注册路由
export default new Router({
	mode:'history', // 默认为'hash'模式
	base: '/permission/', // 添加跟目录,对应服务器部署子目录
	routes: constantRouterMap
})

  //异步路由（需要权限的页面）
export const asyncRouterMap = [
	{
		path:'/userManager',
		name: 'userManage',
		component:Layout,
		meta: {
			title:'用户管理',
			icon: 'iconuser',
		},
		noDropdown:true,
		children:[
			{
				path:'userList', 
				meta:{
					title:'用户管理', 
					icon:'iconuser',
				  routerType:'leftmenu',
				},
				component: () => import('@/page/userList/userList'),
			}
		]
	},
	{
		path:'/share',
		name: 'share',
		component:Layout,
		meta: {
			title:'分享功能',
			icon: 'iconshare',
		},
		noDropdown:true,
		children:[
			{
				path:'share', 
				meta:{
				  title:'分享功能', 
				  icon:'iconshare',
				  routerType:'leftmenu'
				},
				component: () => import('@/page/share'),
			}
		]
	},
	{
	  path:'/infoManage',
	  name: 'infoManage',
	  meta: {
			title:'信息管理',
			icon: 'iconinfo',
	  },
	  component:Layout,
	  children:[
		{
		   path:'infoShow',
		   name:'infoShow',
		   meta: {
					title:'个人信息',
					icon: 'iconinfo',
					routerType:'leftmenu',
					titleList:[
						{"path":"infoShow1","title":"个人信息子菜单1"},
						{"path":"infoShow2","title":"个人信息子菜单2"},
						{"path":"infoShow3","title":"个人信息子菜单3"},
						{"path":"infoShow4","title":"个人信息子菜单4"},
						{"path":"infoShow5","title":"个人信息子菜单5"}
					]	
			 },
	  	 component:Content,
			 children:filterTopRouterMap('infoShow')
		},
		{
			path:'infoModify',
			name:'infoModify',
			meta: {
				title:'修改信息',
				icon: 'iconinfo',
				routerType:'leftmenu',
				titleList:[
					{"path":"infoModify1","title":"修改信息子菜单1"},
					{"path":"infoModify2","title":"修改信息子菜单2"},
					{"path":"infoModify3","title":"修改信息子菜单3"}
				]
			},
			component:Content,
			children:filterTopRouterMap('infoModify')
		 }
	  ]
	},
	{
		path:'/fundManage',
		name: 'fundManage',
		meta: {
		  title:'资金管理',
		  icon: 'iconpay3',
		},
		component:Layout,
		children:[
		  {
			path:'fundList',
			name:'fundList',
			meta: {
					title:'资金流水',
					routerType:'leftmenu'
			},
			component: () => import('@/page/fundList/fundList'),
		  },
		  {
			path:'chinaTabsList',
			name:'chinaTabsList',
			meta: {
				title:'区域投资',
				routerType:'leftmenu'
			},
			component: () => import('@/page/fundList/chinaTabsList'),
			}
		]
	},
	{
		path:'/fundData',
		name: 'fundData',
		meta: {
		  title:'资金数据',
		  icon: 'iconecharts',
		},
		component:Layout,
		redirect: '/fundData/fundPosition',
		children:[
		  {
			 path:'fundPosition',
			 name:'fundPosition',
			 meta: {
				  title:'投资分布'
			 },
			 component: () => import('@/page/fundData/fundPosition')
		  },
		  {
			  path:'typePosition',
			  name:'typePosition',
			  meta: {
				   title:'项目分布'
				},
				component: () => import('@/page/fundData/typePosition')
		   },
		   {
				path:'incomePayPosition',
				name:'incomePayPosition',
				meta: {
					title:'收支统计'
				},
				component: () => import('@/page/fundData/incomePayPosition')
		    }
		]
	},
	{
    path: '/permission',
		name: 'permission',
		meta: {
      title: '权限设置',
      icon: 'iconpermission',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    component: Layout,
    redirect: '/permission/page',
    children: [{
			path: 'page',
			name: 'pagePer',
      meta: {
        title: '页面权限',
        roles: ['admin'] // or you can only set roles in sub nav
      },
      component: () => import('@/page/permission/page'),
    }, {
			path: 'directive',
			name: 'directivePer',
      meta: {
				title: '按钮权限',
				roles:['editor']
      },
      component: () => import('@/page/permission/directive'),
    }]
  },
  {
    path: '/error',
    component: Layout,
    name: 'errorPage',
    meta: {
      title: '错误页面', 
      icon: 'iconError'
    },
    children: [
			{  
				path: '401', 
				name: 'page401', 
				component: () => import('@/page/errorPage/401'), 
				meta: { 
					title: '401', 
					noCache: true 
			  }
			},
			{
				path: '404', 
				name: 'page404', 
				component: () => import('@/page/errorPage/404'), 
				meta: { 
					title: '404', 
					noCache: true
				}
			}
    ]
  },
	{ path: '*', redirect: '/404', hidden: true }
	];
	
	/**
	 *  路由设置要求：
	 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
	 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
	 * 
	 * 按需加载路由组件的2种方法：
	 * 1、component: () => import('@/page/login')
	 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
	 * 
	 * 
	 * 
	 * 什么情况下，路由会定位到404页面?
	 * 路由中redirect:'',不起作用？
	 * 三级子菜单要在顶部展示？
	 * 
	 * 
	 * 
	 * 自己解析当前路由配置的权限管理：
	 *		1.当用户通过登录页面进入系统后，会触发permission.js文件中的router.beforeEach方法，会发送一个请求获取当前登录用户的个人信息，然后
	 *	这里将获取到的个人信息，存储到vuex的state中。
	 *		2.在getUserInfo()请求成功之后，会触发一个store.dispatch('GenerateRoutes', { "roles":userList.roles })，将当前获取的roles角色
	 *	触发到vuex的actions中的GenerateRoutes方法。
	 *		3.在GenerateRoutes方法中，会判断当前的登录人是否是管理账号('admin'),如果是的话那么就开放所有的权限返回出去。如果不是的话，那么就需要
	 * 	调用filterAsyncRouter()方法根据角色进行权限过滤(递归 -- 有children的情况)。 hasPermission()方法是用来比对当前登录人是否可以在路由文件
	 * 	的route.meta.roles中是否有包含。这里也有两种情况，在meta中如果没有roles属性，说明当前这个路由页面没有进行权限管控，那么直接返回true就可以。
	 * 	如果有roles属性的话，那么就需要进行比对，如果有包含就返回true，否者就返回false。
	 * 		4.最后结果就是吧当前过滤得到的权限数组，更新到mutations中的SET_ROUTERS方法中，计算属性更新。
	 * 		5.最后动态添加可访问权限路由表router.addRoutes(store.getters.addRouters)。
	 * 	
	 * 
	 */

