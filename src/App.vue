<template>
    <div id="app">
            <!--路由视图，所有跟路由相关的页面都在路由视图里面渲染 -->
		   <router-view></router-view>
    </div>
</template>

<script>
    export default {
    	name:'App'
    }
</script>

<style lang="less">
    @import './style/variables';
	@import './style/element-ui';
	@import './style/common';
	@import './style/scrollBar';
</style>
