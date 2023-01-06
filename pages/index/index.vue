<template>
	<view class="list-page">
		<view class="list-page-container" ref="container" :style="{top: statusBarHeight}">廾</view>
		<swiper class="index-swiper"
			interval="3000" duration="300" circular="true"
			@change="changeSwiper"
			>
		   <swiper-item v-for="(item, index) in goods" :key="index">
		     <image style="width: 100%;height: auto;" :src="item.picture" />
		   </swiper-item>
		</swiper>
		<!-- 轮播指示点样式修改 -->
		<view class="index-dots">
		 	<block v-for="(item, index) in goods.length" :key="index">
				<view :style="{width: (goods.length ? Math.floor(100 / goods.length) + '%' : '50%')}" class="dot" :class="index==swiperCurrent ? ' active' : ''"></view>
		 	</block>
		</view>
		<view class="index-btn" @click="toDetail">查看详情</view>
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
				goods: [],
				swiperCurrent: 0,
				getId: '',
	        }
	    },
		mounted() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
			
		},
		onLoad() {
			this.getIndexFun();
		},
	    methods: {
	        getIndexFun() {
				this.$api.getIndexContent({}).then((res) => {
					this.goods = res.goods;
				});
			},
			changeSwiper(e) {
				console.log(e)
				this.swiperCurrent = e.detail.current;
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + this.goods[this.swiperCurrent].id,
				});
			}
	    },
	}
</script>

<style lang="scss">
	.list-page {
		height: 100vh;
		.list-page-container {
			font-size: 40rpx;
			color: #fff;
			height: 88rpx;
			position: fixed;
			left: 36rpx;
			line-height: 70rpx;
			z-index: 10;
		}
		.index-swiper {
			height: 100%;
			image {
				height: 100% !important;
			}
		}
		.index-dots {
			position: absolute;
			bottom: 80rpx;
			z-index: 4;
			display: flex;
			justify-content: center;
			width: 168rpx;
			left: 50%;
			margin-left: -84rpx;
		
			.dot {
				height: 4rpx;
				transition: all .6s;
				background: rgba(0, 0, 0, .16);
			}
		
			.active {
				height: 4;
				background: #000;
			}
		}
		.index-btn {
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			bottom: 220rpx;
			z-index: 10;
			width: 320rpx;
			height: 100rpx;
			line-height: 100rpx;
			border: 1px solid #fff;
			border-radius: 4rpx;
			text-align: center;
			font-size: 28rpx;
			color: #fff;
		}
	}
</style>