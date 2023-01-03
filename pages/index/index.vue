<template>
	<view class="list-page">
		 <view class="list-page-container" ref="container" :style="{top: statusBarHeight}">廾</view>
	</view>
</template>

<script>
	import statusBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar";
	export default {
	    components: {
	    	statusBar
	    },
	    data() {
	        return {
	            statusBarHeight: '',
	        }
	    },
		mounted() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
			
		},
	    methods: {
	        
	    },
	}
</script>

<style lang="scss">
	.list-page {
		height: 100vh;
		background-color: #ccc;
		.list-page-container {
			font-size: 40rpx;
			color: #fff;
			height: 88rpx;
			position: fixed;
			left: 36rpx;
			line-height: 70rpx;
		}
	}
</style>