<template>
	<view class="index-page">
		<view class="list-page-container" ref="container" 
		:style="{top: statusBarHeight.top - 6 + 'px', height: statusBarHeight.height + 12 + 'px'}">
			<image src="/static/index/logo_index.png"></image>
		</view>
		<swiper class="index-swiper"
			interval="3000" duration="300" circular="true"
			autoplay="true"
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
		<view class="index-name-box">
			<view class="index-name">{{goods[swiperCurrent].goods_name}}</view>
		</view>
		<view class="index-btn" @click="toDetail">查看详情</view>
	</view>
</template>

<script>
	export default {
	    components: {
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
			//#ifdef APP-PLUS
			this.statusBarHeight.top = uni.getSystemInfoSync()['statusBarHeight'];
			this.statusBarHeight.height = 40;
			// #endif
			//#ifdef MP
			this.statusBarHeight = uni.getMenuButtonBoundingClientRect()
			// #endif
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
				this.swiperCurrent = e.detail.current;
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + this.goods[this.swiperCurrent].goods_id,
				});
			}
	    },
	}
</script>

<style lang="scss">
	.index-page {
		height: 100vh;
		.list-page-container {
			font-size: 40rpx;
			color: #fff;
			width: 100%;
			position: fixed;
			padding-left: 20rpx;
			z-index: 10;
			display: flex;
			align-items: center;
			image {
				width: 82rpx;
				height: 86rpx;
			}
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
				background: rgba(255, 255, 255, .16);
			}
		
			.active {
				height: 4;
				background: rgba(255, 255, 255, .6);
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
		.index-name-box {
			max-width: 240px;
			text-align: center;
			position: fixed;
			bottom: 370rpx;
			width: 480rpx;
			left: 50%;
			transform: translateX(-50%);
		}
		.index-name {
			font-size: 60rpx;
			color: #fff;
		}
	}
</style>